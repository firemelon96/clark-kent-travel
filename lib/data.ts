import { auth } from "@/auth";
import { db } from "@/db";

import { bookings, itinerary, tourPricing, tours } from "@/db/schema";
import { fullTourUpdateSchema } from "@/types/drizzle-schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";

// export const
//privat server
export const getFullTourById = async (tourId: string) => {
  const [tour] = await db.query.tours.findMany({
    where: (tours, { eq }) => eq(tours.id, tourId),
    with: {
      itineraries: true,
      tourPricings: {
        orderBy: (tourPricing) => [tourPricing.type, tourPricing.minGroupSize],
      },
    },
  });

  if (!tour) return;

  const parsed = fullTourUpdateSchema.safeParse(tour);

  if (!parsed.success) return;

  return parsed.data;
};

//public
export const getFullTourBySlug = async (slug: string) => {
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
    where: (tours, { eq }) => eq(tours.slug, slug),
    with: {
      itineraries: true,
      tourPricings: {
        orderBy: (tourPricing) => [tourPricing.type, tourPricing.minGroupSize],
      },
    },
  });

  if (!tour) return;

  const parsed = fullTourUpdateSchema.safeParse(tour);

  if (!parsed.success) return;

  return parsed.data;
};

export const getFeaturedTour = async () => {
  const featuredTours = await db.query.tours.findMany({
    where: (tour, { eq }) => eq(tour.isFeatured, true),
  });

  if (!featuredTours) return;

  return featuredTours;
};

//public
export const getTourById = async (tourId: string) => {
  const [data] = await db
    .select({
      id: tours.id,
      title: tours.title,
      images: tours.images,
      description: tours.description,
      slug: tours.slug,
    })
    .from(tours)
    .where(eq(tours.id, tourId));

  return data;
};

//private for authenticated user
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

//private user auth user oonly
export const getUserBoookings = async (page: number, limit: number) => {
  const session = await auth();
  const offset = (page - 1) * limit;

  if (!session?.user.id) throw new Error("Unauthorized");

  const data = await db
    .select({
      ...getTableColumns(bookings),
      tour: {
        title: tours.title,
        images: tours.images,
      },
    })
    .from(bookings)
    .innerJoin(tours, eq(tours.id, bookings.serviceId))
    .where(eq(bookings.userId, session.user.id))
    .limit(limit)
    .offset(offset);

  const [dataCount] = await db
    .select({ count: db.$count(bookings) })
    .from(bookings);

  return { data, count: dataCount.count };
};
