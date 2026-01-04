import { rentals } from "@/app/data/rentals";
import { z } from "zod";
import { transfers } from "@/app/data/transfer";
import { Pricing, pricingSchema } from "@/types/tour";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstAvailablePrice = (
  tour: z.infer<typeof pricingSchema>[],
  type: string,
) => {
  const pricing = tour.find((p) => p.type === type);
  return pricing && pricing;
};

export const getTransfer = ({ type }: { type: string }) => {
  let transferData = [];
  if (type === "all") {
    transferData = transfers;
  } else {
    transferData = transfers.filter((data) => data.type.toLowerCase() === type);
  }

  return transferData;
};

export const getRentalByType = ({ type }: { type: string }) => {
  let rentalData = [];
  if (type === "all") {
    rentalData = rentals;
  } else {
    rentalData = rentals.filter(
      (data) => data.serviceType.toLowerCase() === type,
    );
  }

  return rentalData;
};

export const generateTimeSlots = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const period = i < 12 ? "AM" : "PM";
    const hour = i % 12 === 0 ? 12 : i % 12;
    return `${hour}:00 ${period}`;
  });
};

export const stringToUppercase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
