import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().optional(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be 8 characters" }),
    email: z.string().email(),
    confirmPassword: z.optional(z.string()),
  })
  .refine(
    (data) => {
      if (data.confirmPassword !== data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password does not match",
      path: ["confirmPassword"],
    },
  );

export const SignInSchema = z.object({
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be 8 characters" }),
  email: z.string().email(),
});
