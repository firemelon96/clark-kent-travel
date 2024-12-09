"use server";

import { Resend } from "resend";
import { FieldValues } from "react-hook-form";
import { FastCraftFormSchema } from "@/types/other-services";
import LogisticEmailTemplate from "@/emails/logistics-template";
import FastCraftEmailTemplate from "@/emails/fast-craft-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const FastCraftBooking = async (values: FieldValues) => {
  const validatedFields = FastCraftFormSchema.safeParse(values);

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
    totalPrice,
    participantCount,
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
      react: FastCraftEmailTemplate({
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
        totalPrice,
        participantCount,
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
