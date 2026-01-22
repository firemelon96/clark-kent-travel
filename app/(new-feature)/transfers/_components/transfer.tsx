"use client";
import { transfers } from "@/app/data/transfer";
import { TransferCard } from "./transfer-card";

export const Transfer = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-col flex-wrap gap-4">
        {/* <Filter /> */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {transfers.map((transfer) => (
            <TransferCard
              key={transfer.id}
              location={transfer.location}
              imageUrl={transfer.images[0]}
              title={transfer.title}
              id={transfer.id}
              price={transfer.options[0].pricing[0].price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
