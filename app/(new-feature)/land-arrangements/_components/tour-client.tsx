"use client";

import { tours } from "@/app/data/tours";
import { FilterTour } from "./filter-tour";
import { getFirstAvailablePrice } from "@/lib/utils";
import TourCard from "@/app/components/tour-card";
import { useSearchParams } from "next/navigation";
import { getTravelTours } from "@/app/lib/helpers";

export const TourClient = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "all types";
  const location = searchParams.get("location") || "all";

  const filteredTours = getTravelTours({ location, type });

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <FilterTour />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredTours.map((tour) => {
          const joinerPrice = getFirstAvailablePrice(tour.pricing, "joiner");
          const privatePrice = getFirstAvailablePrice(tour.pricing, "private");
          return (
            <TourCard
              id={tour.tourId}
              key={tour.tourId}
              image={tour.images[0]}
              address={tour.address[0]}
              price={joinerPrice || privatePrice}
              title={tour.tourName}
            />
          );
        })}
      </div>
    </div>
  );
};
