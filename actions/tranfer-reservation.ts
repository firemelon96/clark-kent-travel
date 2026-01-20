"use server";

import { z } from "zod";
import { Resend } from "resend";
import { TranferFormSchema } from "@/types/tour";
import { TransferEmailTemplate } from "@/emails/transfer-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const TransferReserve = async (
  values: z.infer<typeof TranferFormSchema>,
) => {
  const validatedFields = TranferFormSchema.safeParse(values);

  console.log({ ApiCall: validatedFields.data });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const {
    name,
    number,
    type,
    email,
    count,
    date,
    total,
    title,
    location,
    time,
  } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: "Clark Kent Travel and Tours <sales@clarkkenttravelandtours.com>",
      to: [email],
      cc: ["estong.jamion@gmail.com"],
      replyTo: email,
      subject: title || "",
      react: TransferEmailTemplate({
        count,
        date,
        type,
        name,
        email,
        number,
        total,
        title,
        location,
        time,
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
