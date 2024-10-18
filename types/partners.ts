import { z } from "zod";

export const MariafeFormSchema = z.object({
  dates: z
    .object({
      start: z.date().nullable(),
      end: z.date().nullable(),
    })
    .refine((data) => data.start && data.end, {
      message: "Both start date and end date are required",
      path: ["dates"],
    }),
  notes: z.string().min(1, "Notes are required"),
  name: z.string().min(1, "Name is required!"),
  age: z.number().min(18, "Must be 18 above"),
  gender: z.enum(["male", "female", "others"]),
  roomType: z.enum([
    "Semi deluxe",
    "Superior twin",
    "Superior triple",
    "Superior quad",
    "Family room",
    "Barkada room",
  ]),
  nationality: z.string(),
  email: z.string().email(),
  contact: z.string().min(1, "Contact number is required"),
  nights: z.number().optional(),
  title: z.string().optional(),
  roomPrice: z.number().optional(),
  totalPrice: z.number().optional(),
});

export type RoomType = {
  name: string;
  roomConfig: string;
  pricePerNight: number;
};

export type Policy = {
  title: string;
  list: string[];
};

export type PartnersType = {
  id: string;
  name: string;
  roomType: RoomType[];
  address: string;
  description: string;
  inclusions: string[];
  notes: string[];
  policies: Policy[];
  termsConditions: string[];
  images: string[];
};
