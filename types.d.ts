import { DefaultSession, DefaultUser } from "next-auth";
import { UserRole } from "./db/schema"; // Ensure this is a TypeScript `enum` or a union type

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
