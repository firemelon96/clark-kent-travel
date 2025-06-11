import { auth } from "@/auth";
import { db } from "@/db";

import { itinerary, tourPricing, tours } from "@/db/schema";
import { fullTourUpdateSchema } from "@/types/drizzle-schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

// export const

export const getFullTourById = async (tourId: string) => {
  const session = await auth();

  if (!session?.user?.id) return;

  // const pri = db
  //   .$with("tour_itineraries")
  //   .as(db.select().from(itinerary).where(eq(itinerary.tourId, tourId)));

  // const [data] = await db
  //   .select({
  //     ...getTableColumns(tours),
  //     itineraries: { ...getTableColumns(itinerary) },
  //     tourPricing: { ...getTableColumns(tourPricing) },
  //   })
  //   .from(tours)
  //   .innerJoin(tourPricing, eq(tourPricing.tourId, tours.id))
  //   .innerJoin(itinerary, eq(itinerary.tourId, tours.id))
  //   .where(and(eq(tours.userId, session.user.id), eq(tours.id, tourId)))
  //   .orderBy(tours.id);

  const [tour] = await db.query.tours.findMany({
    where: (tours, { eq, and }) =>
      and(eq(tours.userId, session.user.id || ""), eq(tours.id, tourId)),
    with: {
      itineraries: true,
      tourPricings: true,
    },
  });

  if (!tour) return;

  const parsed = fullTourUpdateSchema.safeParse(tour);

  if (!parsed.success) return;

  return parsed.data;
};

export const getTours = async () => {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  try {
    const toursData = await db.query.tours.findMany({
      where: (tours, { eq }) => eq(tours.userId, session.user.id || ""),
      with: {
        tourPricings: true,
      },
      orderBy: desc(tours.updatedAt),
    });

    return toursData;
  } catch (error) {
    throw error;
  }
};
