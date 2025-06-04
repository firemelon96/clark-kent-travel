"use client";

import { RentalCard } from "./rental-card";
import { FilterRental } from "./filter-rental";
import { useSearchParams } from "next/navigation";
import { getRentalByType } from "@/lib/utils";

export const RentalsClient = () => {
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "all";

  const filteredRentalsData = getRentalByType({ type });

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-col gap-4">
        <FilterRental />
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
          {filteredRentalsData.map((rental) => (
            <RentalCard
              key={rental.id}
              imageUrl={rental.images[0]}
              title={rental.name}
              brand={rental.brand}
              modelYear={rental.modelYear}
              fuelType={rental.fuelType}
              seatingCapacity={rental.seatingCapacity}
              luggageCapacity={rental.luggageCapacity}
              transmission={rental.transmission}
              pricePerDay={rental.pricePerDay}
              type={rental.type}
              serviceType={rental.serviceType}
              id={rental.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
