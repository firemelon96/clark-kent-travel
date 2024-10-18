"use server";

import { Resend } from "resend";
import { FieldValues } from "react-hook-form";
import { MariafeFormSchema } from "@/types/partners";
import MariafeEmailTemplate from "@/emails/mariafe-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const BookMariafe = async (values: FieldValues) => {
  const validatedFields = MariafeFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const {
    name,
    email,
    age,
    contact,
    dates,
    gender,
    nationality,
    notes,
    nights,
    roomPrice,
    title,
    totalPrice,
    roomType,
  } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: [
        "sales@clarkkenttravelandtours.com",
        "info.clarkkenttravelandtours@yahoo.com",
      ],
      replyTo: email,
      subject: `${nights} nights, ${title}`,
      react: MariafeEmailTemplate({
        name,
        email,
        age,
        contact,
        dates,
        gender,
        nationality,
        notes,
        title,
        nights,
        totalPrice,
        roomPrice,
        roomType,
      }),
    });

    if (error) {
      return { success: false, message: "Internal server error" };
    }

    return {
      success: true,
      message: "Booked mariafe inn successfully, Please check your email!",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
