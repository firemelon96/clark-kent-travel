import { z } from "zod";

export const TourFormSchema = z.object({
  date: z.date(),
  travellerType: z.enum(["Private", "Joiners"]),
  notes: z.string().min(1, "Notes are required"),
  count: z.number().min(1, "Count is required"),
  name: z.string().min(1, "Name is required!"),
  age: z.number(),
  gender: z.enum(["male", "female", "others"]),
  nationality: z.string(),
  email: z.string().email(),
  contact: z.string(),
  total: z.number().optional(),
  title: z.string().optional(),
  pickupLocation: z.string(),
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
    isGroupPrice?: boolean;
  }[];
};

export type TourPackage = {
  tourId: string;
  tourName: string;
  isFeatured?: boolean | undefined;
  type: string;
  min?: number;
  pricing: Pricing[];
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
