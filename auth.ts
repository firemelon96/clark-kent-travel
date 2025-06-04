import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { SignInSchema } from "./types/auth-schema";
import { UserRole, users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.role && (user.role === "ADMIN" || user.role === "USER")) {
        token.role = user.role;
      }
      return token;
    },
    session: async ({ token, session }) => {
      if (token?.role === "ADMIN" || token?.role === "USER") {
        session.user.role = token.role;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        try {
          const validateFields = SignInSchema.safeParse(credentials);

          if (!validateFields.success) {
            return null;
          }

          const { email, password } = validateFields.data;

          const [userExist] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (!userExist || !userExist.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            userExist.password,
          );

          if (!passwordMatch) return null;

          return {
            ...userExist,
            password: "_",
          };
        } catch (err) {
          console.error("Authorize error:", err);
          // Optional: throw a custom error
          const error = new Error("Authentication failed");
          error.name = "CredentialsSignin"; // triggers error=CredentialsSignin
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
