"use client";

import { landArrangements } from "@/app/data/land-arrangements";
import Card from "./card";

export const Client = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {landArrangements.map((land) => (
          <Card
            id={land.id}
            key={land.id}
            image={land.images[0]}
            address={land.address[0]}
            price={land.options[0].price}
            title={land.title}
          />
        ))}
      </div>
    </div>
  );
};
