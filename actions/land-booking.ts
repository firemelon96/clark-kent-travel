"use server";

import { z } from "zod";
import { Resend } from "resend";
import { LandFormSchema } from "@/types/tour";
import TourEmailTemplate from "@/emails/tour-email-template";
import { LandArrangementTemplate } from "@/emails/land-arrangement-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const LandBook = async (values: z.infer<typeof LandFormSchema>) => {
  const validatedFields = LandFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const { name, number, email, notes, count, date, total, title } =
    validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: [process.env.USER_EMAIL || ""],
      replyTo: email,
      subject: title || "",
      react: LandArrangementTemplate({
        count,
        date,
        name,
        email,
        number,
        total,
        title,
        notes,
      }),
    });

    if (error) {
      return { success: false, message: "Internal server error" };
    }

    console.log(data);

    return {
      success: true,
      message: "Booked successfully, Check your email",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error" + error,
    };
  }
};
