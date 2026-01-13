import { z } from "zod";

export const TourFormSchema = z.object({
  date: z.string(),
  type: z.string(),
  // notes: z.string().min(1, "Notes are required"),
  count: z.number().min(1, "Count is required"),
  name: z.string().min(1, "Name is required!"),
  // age: z.number(),
  // gender: z.enum(["male", "female", "others"]),
  // nationality: z.string(),
  email: z.string().email(),
  number: z.string(),
  total: z.number().optional(),
  title: z.string().optional(),
  mapLink: z.string().optional(),

  // pickupLocation: z.string(),
});

type Itinerary = {
  name: string;
  activities: string[];
};

export type Pricing = {
  pricingType: string;
  prices: {
    minGroupSize: number;
    maxGroupSize: number;
    price: number;
    isGroupSize?: boolean;
  }[];
};

export const pricingSchema = z.object({
  type: z.string(),
  minGroupSize: z.number().min(1),
  maxGroupSize: z.number().min(1),
  price: z.number().min(0),
  isGroupSize: z.boolean().optional(),
  label: z.string().optional(),
});

export type TourPackage = {
  tourId: string;
  tourName: string;
  isFeatured?: boolean | undefined;
  type: string;
  min?: number;
  pricing: z.infer<typeof pricingSchema>[];
  isPax?: boolean | undefined;
  address: string[];
  description: string;
  itineraries: Itinerary[];
  duration: string[];
  inclusions: string[];
  exclusions: string[];
  note?: string[] | undefined;
  reminders?: string[] | undefined;
  images: string[];
  minParticipants: number;
  maxParticipants: number;
};

export const bookingOptionSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  participants: z.number().min(1),
  totalPrice: z.number().min(0),
  type: z.string(),
});
