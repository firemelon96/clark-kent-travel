import { transfer_services } from "@/app/data/logistics";
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

export const getTransfer = ({
  type,
  from,
  to,
}: {
  type: string;
  from?: string;
  to?: string;
}) => {
  let transferData = [];
  if (type === "all") {
    transferData = transfers;
  } else if (from && to) {
    transferData = transfers.filter(
      (data) =>
        data.type.toLowerCase() === type &&
        data.from.toLowerCase() === from &&
        data.to.toLowerCase() === to,
    );
  } else {
    transferData = transfers.filter((data) => data.type.toLowerCase() === type);
  }

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(transferData);
  //   }, 2000);
  // });

  return transferData;
};
