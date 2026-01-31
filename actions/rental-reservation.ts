"use server";

import { z } from "zod";
import { Resend } from "resend";
import { RentalFormSchema } from "@/types/tour";
import { TransferEmailTemplate } from "@/emails/transfer-template";
import { AccomEmailTemplate } from "@/emails/accommodation-template";
import RentalEmailTemplate from "@/emails/rental-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const RentalReservation = async (
  values: z.infer<typeof RentalFormSchema>,
) => {
  const validatedFields = RentalFormSchema.safeParse(values);

  console.log(validatedFields.error);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const {
    name,
    number,
    additionalHour,
    email,
    participantCount,
    startDate,
    totalPrice,
    returnDate,
    title,
    duration,
    extras,
    price,
  } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: [process.env.USER_EMAIL || ""],
      replyTo: email,
      subject: title || "",
      react: RentalEmailTemplate({
        name,
        number,
        additionalHour,
        email,
        participantCount,
        startDate,
        totalPrice,
        returnDate,
        title,
        duration,
        extras,
        price,
      }),
    });

    if (error) {
      return { success: false, message: "Internal server error" };
    }

    console.log(data);

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
