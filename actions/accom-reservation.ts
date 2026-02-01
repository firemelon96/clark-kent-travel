"use server";

import { z } from "zod";
import { Resend } from "resend";
import { AccomFormSchema } from "@/types/tour";
import { AccomEmailTemplate } from "@/emails/accommodation-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const AccomReservation = async (
  values: z.infer<typeof AccomFormSchema>,
) => {
  const validatedFields = AccomFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const { name, number, type, email, count, date, total, title, numOfNights } =
    validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: [process.env.USER_EMAIL || ""],
      replyTo: email,
      subject: title || "",
      react: AccomEmailTemplate({
        count,
        date,
        type,
        name,
        email,
        number,
        total,
        title,
        numOfNights,
      }),
    });

    if (error) {
      return { success: false, message: "Internal server error" };
    }

    return {
      success: true,
      message: "Reservation was successful, Check your email",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Internal server error" + error,
    };
  }
};
