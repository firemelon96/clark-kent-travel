"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { itinerary, tourPricing, tours, users } from "@/db/schema";
import { fullTourInsertSchema } from "@/types/drizzle-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import slugify from "slugify";

export const createTour = async (
  data: z.infer<typeof fullTourInsertSchema>,
) => {
  const validatedFields = fullTourInsertSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid fields",
    };
  }

  const session = await auth();

  if (!session?.user.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const {
    title,
    description,
    duration,
    durationUnit,
    images,
    publicIds,
    inclusions,
    exclusions,
    isFeatured,
    type,
    tourPricings,
    itineraries,
  } = validatedFields.data;

  const slug = slugify(title).toLowerCase();

  if (tourPricings.length === 0) {
    return {
      success: false,
      message: "At least 1 price is required",
    };
  }

  if (itineraries.length === 0) {
    return {
      success: false,
      message: "At least 1 itinerary is required",
    };
  }

  const [tour] = await db.select().from(tours).where(eq(tours.title, title));

  if (tour) {
    return {
      success: false,
      message: "Tour already exist",
    };
  }

  try {
    const tourCreate = await db.transaction(async (tx) => {
      //inserting tour
      const [tour] = await tx
        .insert(tours)
        .values({
          userId: user.id,
          title,
          description,
          duration,
          durationUnit,
          images,
          publicIds,
          inclusions,
          exclusions,
          isFeatured,
          type,
          slug,
        })
        .returning();

      const tourId = tour.id;

      await tx.insert(itinerary).values(
        itineraries.map((data) => ({
          ...data,
          tourId,
        })),
      );

      await tx
        .insert(tourPricing)
        .values(tourPricings.map((price) => ({ ...price, tourId })));
    });

    revalidatePath("/dashboard/tours");
    // redirect("/profile/tours");
    return { success: true, message: "Created tour successfully!" };

    // return tourCreate;
  } catch (error) {
    console.log(error);
    return { success: false, message: `error: ${error}` };
  }
};
