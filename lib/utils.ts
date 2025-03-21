import { rentals } from "@/app/data/rentals";
import { transfers } from "@/app/data/transfer";
import { Pricing } from "@/types/tour";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstAvailablePrice = (
  tour: Pricing[],
  type: "joiner" | "private",
) => {
  const pricing = tour.find((p) => p.pricingType === type);
  return pricing && pricing.prices.length > 0 ? pricing.prices[0].price : null;
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
