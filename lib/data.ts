import { auth } from "@/auth";
import { db } from "@/db";
import { itinerary, tourPricing, tours } from "@/db/schema";
import { eq } from "drizzle-orm";

// export const

export const getFullTours = async () => {
  const session = await auth();

  if (!session?.user.id) return;

  const [data] = await db
    .select()
    .from(tours)
    .innerJoin(tourPricing, eq(tourPricing.tourId, tours.id))
    .innerJoin(itinerary, eq(itinerary.tourId, tours.id))
    .where(eq(tours.userId, session.user.id));

  return data;
};
