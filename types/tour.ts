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

export const TranferFormSchema = z.object({
  date: z.string(),
  type: z.string(),
  count: z.number().min(1, "Count is required"),
  name: z.string().min(1, "Name is required!"),
  email: z.string().email(),
  number: z.string(),
  total: z.number().optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  time: z.string(),
});

export const AccomFormSchema = z.object({
  date: z.string(),
  type: z.string(),
  count: z.number().min(1, "Count is required"),
  name: z.string().min(1, "Name is required!"),
  email: z.string().email(),
  number: z.string(),
  total: z.number().optional(),
  title: z.string().optional(),
  numOfNights: z.number(),
});

export const RentalFormSchema = z.object({
  startDate: z.string(),
  returnDate: z.string(),
  participantCount: z.number().min(1, "Count is required"),
  name: z.string().min(1, "Name is required!"),
  email: z.string().email(),
  number: z.string(),
  totalPrice: z.number().optional(),
  duration: z.string().optional(),
  title: z.string().optional(),
  additionalHour: z.string().optional(),
  price: z.string(),
  extras: z.array(z.string()),
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

export const bookingOptionSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date({ required_error: "Select date to" }),
  }),
  participants: z.number().min(1),
  totalPrice: z.number().min(0),
  type: z.string(),
});

export const accomOptionSchema = z.object({
  dateRange: z.object({
    from: z.date(),
    to: z.date({ required_error: "Select date to" }),
  }),
  participants: z.number().min(1),
  totalPrice: z.number().min(0),
  type: z.string(),
});

export const transferOptionSchema = z.object({
  date: z.date(),
  participants: z.number().min(1),
  totalPrice: z.number().min(0),
  type: z.string(),
  time: z.string().optional(),
  location: z.string(),
});

export const rentalOptionSchema = z.object({
  pickup: z.object({
    date: z.date(),
    time: z.string(),
  }),
  return: z.object({
    date: z.date(),
    time: z.string(),
  }),
  extra: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
    }),
  ),
  participants: z.number(),
  totalPrice: z.number(),
});
