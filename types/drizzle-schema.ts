import {
  bookings,
  itinerary,
  servicesType,
  statusType,
  tourPricing,
  tours,
  tourTypes,
  travellerType,
  unitTypes,
} from "@/db/schema";
import { date } from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

export const tourInsertSchema = createInsertSchema(tours, {
  title: z.string().min(1, { message: "Required title" }),
  description: z.string().min(1, { message: "Description is required" }),
  duration: z.coerce.number().positive(),
  images: z.array(z.string()).min(1, { message: "Image is required" }),
  durationUnit: z.enum(unitTypes.enumValues),
  inclusions: z
    .array(z.string())
    .min(1, { message: "Add at least one inclusion" }),
  userId: z.string().optional(),
  slug: z.string().optional(),
});

export const tourSelectSchema = createSelectSchema(tours);

export const tourUpdateSchema = createUpdateSchema(tours, {
  title: z.string().min(1, { message: "Required title" }),
  description: z.string().min(1, { message: "Description is required" }),
  duration: z.coerce.number().positive(),
  images: z.array(z.string()).min(1, { message: "Image is required" }),
  durationUnit: z.enum(unitTypes.enumValues),
  inclusions: z
    .array(z.string())
    .min(1, { message: "Add at least one inclusion" }),
  exclusions: z.array(z.string()),
  id: z.string(),
  type: z.enum(tourTypes.enumValues),
  publicIds: z.array(z.string()),
  isFeatured: z.boolean(),
  updatedAt: z.date(),
  userId: z.string(),
}).omit({
  createdAt: true,
});

export const itineraryInsertSchema = createInsertSchema(itinerary, {
  title: z.string().min(1, { message: "Name is required" }),
  destinations: z
    .array(z.string())
    .min(1, { message: "Add at least one item" }),
  tourId: z.string().optional(),
});

export const itinerarySelectSchema = createSelectSchema(itinerary);

export const itineraryUpdateSchema = createUpdateSchema(itinerary, {
  title: z.string().min(1, { message: "Name is required" }),
  destinations: z
    .array(z.string())
    .min(1, { message: "Add at least one item" }),
  id: z.string().optional(),
  activities: z.array(z.string()).optional(),
  tourId: z.string(),
  images: z.array(z.string()).optional(),
  updatedAt: z.date().optional(),
}).omit({
  updatedAt: true,
  createdAt: true,
  tourId: true,
});

export const tourPricingInsertSchema = createInsertSchema(tourPricing, {
  price: z.coerce.number().positive(),
  type: z.enum(travellerType.enumValues),
  minGroupSize: z.coerce.number().positive(),
  maxGroupSize: z.coerce.number().positive(),
  tourId: z.string().optional(),
});

export const tourPricingSelectSchema = createSelectSchema(tourPricing, {
  minGroupSize: z.number().positive(),
  maxGroupSize: z.number().positive(),
  type: z.enum(travellerType.enumValues),
}).omit({
  createdAt: true,
  updatedAt: true,
  tourId: true,
  id: true,
});

export const tourPricingUpdateSchema = createUpdateSchema(tourPricing, {
  id: z.string().optional(),
  price: z.coerce.number().positive(),
  type: z.enum(travellerType.enumValues),
  minGroupSize: z.coerce.number().positive(),
  maxGroupSize: z.coerce.number().positive(),
  tourId: z.string().optional(),
  updatedAt: z.date(),
}).omit({
  tourId: true,
  createdAt: true,
  updatedAt: true,
});

export const fullTourInsertSchema = tourInsertSchema.extend({
  itineraries: z
    .array(itineraryInsertSchema)
    .min(1, { message: "Required at least 1 Itinerary" }),
  tourPricings: z
    .array(tourPricingInsertSchema)
    .min(1, { message: "Required at least 1 Pricing" }),
});

export const fullTourSelectSchema = tourInsertSchema.extend({
  itineraries: z
    .array(itineraryInsertSchema)
    .min(1, { message: "Required at least 1 Itinerary" }),
  tourPricings: z
    .array(tourPricingInsertSchema)
    .min(1, { message: "Required at least 1 Pricing" }),
});

export const fullTourUpdateSchema = tourUpdateSchema.extend({
  itineraries: z
    .array(itineraryUpdateSchema)
    .min(1, { message: "Required at least 1 Itinerary" }),
  tourPricings: z
    .array(tourPricingUpdateSchema)
    .min(1, { message: "Required at least 1 Pricing" }),
});

export const bookingInsertSchema = createInsertSchema(bookings, {
  userId: z.string().optional(),
  serviceId: z.string().optional(),
  servicesType: z.enum(servicesType.enumValues).optional(),
  from: z.date(),
  to: z.date(),
  totalPrice: z.number(),
  invoiceUrl: z.string().optional(),
  participants: z.number(),
  contactEmail: z.string().email(),
  contactName: z.string().min(1, { message: "Name is required" }),
  traveller: z.enum(travellerType.enumValues),
}).omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});
