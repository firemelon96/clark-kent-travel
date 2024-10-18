"use server";

import { Resend } from "resend";
import { FieldValues } from "react-hook-form";
import { LogisticFormSchema } from "@/types/other-services";
import LogisticEmailTemplate from "@/emails/logistics-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const BookLogistic = async (values: FieldValues) => {
  const validatedFields = LogisticFormSchema.safeParse(values);

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
    date,
    gender,
    nationality,
    notes,
    title,
    availability,
    price,
    type,
    vehicleType,
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
      subject: title!,
      react: LogisticEmailTemplate({
        name,
        email,
        age,
        contact,
        date,
        gender,
        nationality,
        notes,
        title,
        availability,
        price,
        type,
        vehicleType,
      }),
    });

    if (error) {
      return { success: false, message: "Internal server error" };
    }

    return {
      success: true,
      message: "Booked service successfully, Please check your email!",
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};
