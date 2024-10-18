import { z } from "zod";

export const LogisticFormSchema = z.object({
  date: z.date(),
  notes: z.string().min(1, "Notes are required"),
  name: z.string().min(1, "Name is required!"),
  age: z.number(),
  gender: z.enum(["male", "female", "others"]),
  nationality: z.string(),
  email: z.string().email(),
  contact: z.string(),
  title: z.string().optional(),
  vehicleType: z.string().optional(),
  type: z.string().optional(),
  availability: z.string().optional(),
  price: z.number().optional(),
});

export type TransferServicesType = {
  id: string;
  service_name: string;
  type: "transfer" | "rentals";
  vehicle_type: string;
  capacity: number;
  price_per_trip: number;
  description: string;
  availability: string;
  image: string;
};

export type TransferWihtoutMeta = Pick<
  TransferServicesType,
  "id" | "image" | "price_per_trip" | "vehicle_type" | "service_name"
>;

export type AccomodationType = {
  id: string;
  name: string;
  address: string;
  price_per_night: number;
  description: string;
  inclusions: string[];
  images: string[];
};
