import { DefaultSession, DefaultUser } from "next-auth";
import { Roles } from "./db/schema"; // Ensure this is a TypeScript `enum` or a union type
import { z } from "zod";

type UserRoles = z.infer<typeof Roles>;

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRoles;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRoles;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
