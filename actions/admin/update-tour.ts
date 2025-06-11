"use server";

import { deleteCloudinaryImages } from "@/app/lib/cloudinary";
import { auth } from "@/auth";
import { db } from "@/db";
import { itinerary, tourPricing, tours, users } from "@/db/schema";
import { fullTourUpdateSchema } from "@/types/drizzle-schema";
import { and, eq, notInArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const updateTour = async (
  data: z.infer<typeof fullTourUpdateSchema>,
) => {
  const validatedFields = fullTourUpdateSchema.safeParse(data);

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
    id,
  } = validatedFields.data;

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

  const [tour] = await db.select().from(tours).where(eq(tours.id, id));

  const tourId = tour.id;
  const oldPublicIds = tour.publicIds;
  const newPublicIds = publicIds;

  const toDelete = oldPublicIds.filter((id) => !newPublicIds.includes(id));

  if (toDelete.length > 0) {
    await deleteCloudinaryImages(toDelete);
  }

  const existIntineraries = await db
    .select({ id: itinerary.id })
    .from(itinerary)
    .where(eq(itinerary.tourId, tourId));

  const existingIds = existIntineraries.map((i) => i.id);

  const incomingIds = itineraries
    .map((i) => i.id)
    .filter((id): id is string => typeof id === "string");

  const deletedIds = existingIds.filter((id) => !incomingIds.includes(id));
  console.log("Deleting itinerary items with IDs:", deletedIds);

  await db
    .delete(itinerary)
    .where(
      and(eq(itinerary.tourId, id), notInArray(itinerary.id, incomingIds)),
    );

  const existingPricing = await db
    .select({ id: tourPricing.id })
    .from(tourPricing)
    .where(eq(tourPricing.tourId, tourId));

  const existingPricingIds = existingPricing.map((i) => i.id);

  const incomingPricingIds = tourPricings
    .map((i) => i.id)
    .filter((id): id is string => typeof id === "string");

  const deletedPricingId = existingPricingIds.filter(
    (id) => !incomingPricingIds.includes(id),
  );
  console.log("Deleting pricing items with IDs:", deletedPricingId);

  await db
    .delete(tourPricing)
    .where(
      and(
        eq(tourPricing.tourId, id),
        notInArray(tourPricing.id, incomingPricingIds),
      ),
    );

  try {
    const updateTour = await db.transaction(async (tx) => {
      //update tour
      await tx
        .update(tours)
        .set({
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
          updatedAt: new Date(),
        })
        .where(and(eq(tours.userId, user.id), eq(tours.id, id)))
        .returning();

      for (const item of itineraries) {
        if (item.id) {
          await tx
            .update(itinerary)
            .set({
              title: item.title,
              destinations: item.destinations,
              activities: item.activities,
              updatedAt: new Date(),
            })
            .where(eq(itinerary.id, item.id));
        } else {
          await tx.insert(itinerary).values({
            tourId: id,
            title: item.title,
            destinations: item.destinations,
          });
        }
      }

      for (const item of tourPricings) {
        if (item.id) {
          await tx
            .update(tourPricing)
            .set({
              type: item.type,
              minGroupSize: item.minGroupSize,
              maxGroupSize: item.maxGroupSize,
              price: item.price,
              updatedAt: new Date(),
            })
            .where(eq(tourPricing.id, item.id));
        } else {
          await tx.insert(tourPricing).values({
            type: item.type,
            minGroupSize: item.minGroupSize,
            maxGroupSize: item.maxGroupSize,
            price: item.price,
            tourId: id,
          });
        }
      }
    });

    revalidatePath("/profile/tours");
    console.log(updateTour);
    // redirect("/profile/tours");
    return { success: true, message: "Created updated successfully!" };

    // return tourCreate;
  } catch (error) {
    console.log(error);
    return { success: false, message: `error: ${error}` };
  }
};
