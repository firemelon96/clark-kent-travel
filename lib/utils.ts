import { travelTours } from "@/app/data/travel-tours-data";
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
