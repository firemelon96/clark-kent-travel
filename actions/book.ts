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
    await createXenditPayment({
      external_id: `booking_${tourId}`,
      currency: "PHP",
      amount: totalPrice,
      customer: {
        email: contactEmail,
        given_names: contactName,
        mobile_number: contactNumber,
      },
      success_redirect_url:
        "https://clark-kent-travel-git-update-firemelon96s-projects.vercel.app/booking/payment-success",
      failure_redirect_url:
        "https://clark-kent-travel-git-update-firemelon96s-projects.vercel.app/booking/payment-failure",
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
  } catch (error) {
    console.log(error);
  }
};
