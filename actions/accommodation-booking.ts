"use server";

import { Resend } from "resend";
import { FieldValues } from "react-hook-form";
import { AccomodationFormSchema } from "@/types/other-services";
import AccomodationEmailTemplate from "@/emails/accomodation-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const BookAccomodation = async (values: FieldValues) => {
  const validatedFields = AccomodationFormSchema.safeParse(values);

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
    title,
    totalPrice,
  } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: ["sales@clarkkenttravelandtours.com", "info.clarkkenttravelandtours@yahoo.com"],
      replyTo: email,
      subject: `${nights} nights, ${title}`,
      react: AccomodationEmailTemplate({
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
      }),
    });

    if (error) {
      return { success: false, message: "Internal server error" };
    }

    return {
      success: true,
      message: "Booked service successfully, Please check your email!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
