"use server";

import { contactFormSchema } from "@/app/(new-feature)/booking/_components/contact-form";
import { createXenditPayment } from "@/lib/xendit";
import { z } from "zod";

interface BookingProps extends z.infer<typeof contactFormSchema> {
  tourId: string;
  tourName: string;
  participants: number;
  totalPrice: number;
}

export const Book = async (values: BookingProps) => {
  const {
    totalPrice,
    participants,
    contactEmail,
    contactName,
    contactNumber,
    tourId,
    tourName,
  } = values;
  try {
    const xenditData = await createXenditPayment({
      external_id: `booking_${tourId}`,
      currency: "PHP",
      amount: totalPrice,
      customer: {
        email: contactEmail,
        given_names: contactName,
        mobile_number: contactNumber,
      },
      success_redirect_url: "",
      failure_redirect_url: "",
      customer_notification_preference: {
        invoice_paid: ["email"],
      },
      items: [
        {
          name: tourName,
          price: totalPrice / participants,
          category: "Tour Package",
          quantity: participants,
        },
      ],
    });

    return xenditData;
  } catch (error) {
    console.log(error);
  }
};
