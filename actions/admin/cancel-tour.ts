"use server";

import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const cancelTour = async (bookingId: string) => {
  await db
    .update(bookings)
    .set({
      status: "Canceled",
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId));

  revalidatePath("/dashboard/bookings");

  return { success: true, message: "Tour Canceled" };
};
