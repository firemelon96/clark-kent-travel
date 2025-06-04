import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { SignInSchema } from "./types/auth-schema";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { UserRoles } from "./types";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  callbacks: {
    jwt: async ({ token }) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub as string))
        .limit(1);

      if (!user) throw new Error("Invalid user");

      token.role = user.role;

      return token;
    },
    session: async ({ token, session }) => {
      // if (token?.role === "ADMIN" || token?.role === "USER") {
      //   session.user.role = token.role;
      // }
      session.user.role = token.role as UserRoles;
      session.user.id = token.sub as string;
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
