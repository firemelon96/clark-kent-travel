import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { z, ZodError } from "zod";
import { SignInSchema } from "./types/auth-schema";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validateFields = SignInSchema.safeParse(credentials);

        if (!validateFields.success) throw new Error("Invalid fields");

        const { email, password } = validateFields.data;

        const [userExist] = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (!userExist || !userExist.password)
          throw new Error("User does not exist");

        const passwordMatch = await bcrypt.compare(
          password,
          userExist.password,
        );

        if (passwordMatch) return userExist;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
});
