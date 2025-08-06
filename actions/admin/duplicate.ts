"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { itinerary, tourPricing, tours, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getFullTourById } from "@/lib/data";
import { z } from "zod";

export const createCopy = async (tourId: string) => {
  const session = await auth();

  if (!tourId) {
    return {
      success: false,
      message: "Id is missing!",
    };
  }

  if (!session?.user.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const [tour] = await db
    .select({
      userId: tours.userId,
      title: tours.title,
      isFeatured: tours.isFeatured,
      images: tours.images,
      publicIds: tours.publicIds,
      inclusions: tours.inclusions,
      exclusions: tours.exclusions,
      slug: tours.slug,
      description: tours.description,
      duration: tours.duration,
      durationUnit: tours.durationUnit,
    })
    .from(tours)
    .where(eq(tours.id, tourId));

  if (!tour) {
    return {
      success: false,
      message: "Tour does not exist!",
    };
  }

  const itineraryData = await db
    .select({
      tourId: itinerary.tourId,
      destinations: itinerary.destinations,
      activities: itinerary.activities,
      title: itinerary.title,
    })
    .from(itinerary)
    .where(eq(itinerary.tourId, tourId));

  const pricingData = await db
    .select({
      tourId: tourPricing.tourId,
      type: tourPricing.type,
      minGroupSize: tourPricing.minGroupSize,
      maxGroupSize: tourPricing.maxGroupSize,
      price: tourPricing.price,
    })
    .from(tourPricing)
    .where(eq(tourPricing.tourId, tourId));

  // await db.insert(tours).values({
  //   ...tour,
  //   title: `${tour.title}-copy`,
  // });

  if (!itineraryData || !pricingData) {
    return {
      success: false,
      message: "Missing data",
    };
  }

  try {
    await db.transaction(async (tx) => {
      //inserting tour
      const [tourCopy] = await tx
        .insert(tours)
        .values({
          ...tour,
          title: `${tour.title} copy`,
          slug: `${tour.slug}-copy`,
        })
        .returning();

      const tourIdCopy = tourCopy.id;

      await tx.insert(itinerary).values(
        itineraryData.map((itinerary) => ({
          ...itinerary,
          tourId: tourIdCopy,
        })),
      );

      await tx.insert(tourPricing).values(
        pricingData.map((pricing) => ({
          ...pricing,
          tourId: tourIdCopy,
        })),
      );
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
