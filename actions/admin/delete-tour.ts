"use server";

import { deleteCloudinaryImages } from "@/app/lib/cloudinary";
import { auth } from "@/auth";
import { db } from "@/db";
import { tours } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const deleteTour = async (tourId: string) => {
  if (!tourId) {
    throw new Error("Id not found");
  }

  const session = await auth();

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const [tour] = await db
    .select({ publicIds: tours.publicIds })
    .from(tours)
    .where(eq(tours.id, tourId));

  await deleteCloudinaryImages(tour.publicIds);

  const [deletedTour] = await db
    .delete(tours)
    .where(eq(tours.id, tourId))
    .returning();

  if (!deletedTour) {
    throw new Error("Failed to delete tour");
  }

  revalidatePath("/dashboard/tours");

  return deletedTour;
};
