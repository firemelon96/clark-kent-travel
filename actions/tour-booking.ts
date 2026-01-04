"use server";

import { z } from "zod";
import { Resend } from "resend";
import { TourFormSchema } from "@/types/tour";
import { FieldValues } from "react-hook-form";
import TourEmailTemplate from "@/emails/tour-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const BookTour = async (values: z.infer<typeof TourFormSchema>) => {
  const validatedFields = TourFormSchema.safeParse(values);

  console.log({ ApiCall: validatedFields.data });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const { name, number, type, email, count, date, total, title } =
    validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: ["estong.jamion@gmail.com"],
      replyTo: email,
      subject: title || "",
      react: TourEmailTemplate({
        count,
        date,
        type,
        name,
        email,
        number,
        total,
        title,
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
