"use server";

import { contactFormSchema } from "@/app/(new-feature)/booking/_components/contact-form";
import { auth } from "@/auth";
import { db } from "@/db";
import { bookings, tours } from "@/db/schema";
import { createXenditPayment } from "@/lib/xendit";
import { bookingInsertSchema } from "@/types/drizzle-schema";
import { and, eq, gt, gte, lt, lte } from "drizzle-orm";
import { z } from "zod";

export const Book = async (values: z.infer<typeof bookingInsertSchema>) => {
  const session = await auth();

  const validatedFields = bookingInsertSchema.safeParse(values);

  if (!validatedFields.success) {
    return;
  }

  if (!session?.user.id) return;

  const userId = session?.user.id;

  const {
    contactEmail,
    from,
    serviceId,
    contactName,
    contactNumber,
    totalPrice,
    participants,
    to,
    traveller,
  } = validatedFields.data;

  if (!serviceId) return;

  try {
    const [tour] = await db.select().from(tours).where(eq(tours.id, serviceId));

    const overlapping = await db.query.bookings.findFirst({
      where: and(
        eq(bookings.serviceId, serviceId),
        lte(bookings.from, to),
        gte(bookings.to, from),
      ),
    });

    if (overlapping) {
      console.log("overlap");
      return;
    }

    const { data } = await createXenditPayment({
      external_id: `booking_${serviceId}`,
      currency: "PHP",
      amount: totalPrice || 0,
      customer: {
        email: contactEmail,
        given_names: contactName,
        mobile_number: contactNumber,
      },
      success_redirect_url:
        "https://gnat-poetic-uniquely.ngrok-free.app/booking/payment-success",
      failure_redirect_url:
        "https://gnat-poetic-uniquely.ngrok-free.app/booking/payment-failure",
      customer_notification_preference: {
        invoice_paid: ["email"],
      },
      items: [
        {
          name: tour.title,
          price: totalPrice || 0,
          category: "Tour Package",
          quantity: participants || 0,
        },
      ],
    });

    // overlapping booking

    const [createBooking] = await db
      .insert(bookings)
      .values({
        ...validatedFields.data,
        invoiceUrl: data.invoice_url,
        servicesType: "Tours",
        status: "Pending",
        userId,
        serviceId,
        participants,
        traveller,
      })
      .returning();

    // if (!data) return;
    console.log(createBooking);

    return data;
  } catch (error) {
    console.log(error);
  }
};
