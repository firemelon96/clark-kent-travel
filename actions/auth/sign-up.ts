"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { SignUpSchema } from "@/types/auth-schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Error from "next/error";
import { eq } from "drizzle-orm";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const validateFields = SignUpSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const { name, email, password, confirmPassword } = validateFields.data;

  if (confirmPassword !== password) {
    return {
      success: false,
      message: "Wrong password",
    };
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    return {
      success: false,
      message: "User already exist",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db
      .insert(users)
      .values({ email, name, password: hashedPassword })
      .returning();

    return {
      success: true,
      message: "Created user",
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong ${error}`,
    };
  }
};
