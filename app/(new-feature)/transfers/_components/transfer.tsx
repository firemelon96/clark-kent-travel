"use client";
import { transfers } from "@/app/data/transfer";
import { Filter } from "@/components/filter";
import { ServiceCard } from "@/components/service-card";
import { ServiceLabel } from "@/components/service-label";
import { getTransfer } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { TransferCard } from "./transfer-card";

export const Transfer = () => {
  // console.log(await searchParams);
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "all";

  const filteredTransferData = getTransfer({ type });

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-col flex-wrap gap-4">
        {/* <Filter /> */}
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {filteredTransferData.map((transfer) => (
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
