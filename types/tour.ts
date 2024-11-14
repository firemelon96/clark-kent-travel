import { z } from "zod";

export const TourFormSchema = z.object({
  date: z.date(),
  travellerType: z.enum(["Private", "Joiners"]),
  notes: z.string().min(1, "Notes are required"),
  count: z.number().min(1, "Participants required"),
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

export type TourPackage = {
  tourId: string;
  tourName: string;
  isFeatured?: boolean | undefined;
  type: string;
  price?: number | number[] | undefined;
  isPax?: boolean | undefined;
  privatePrice?: number[] | undefined;
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
