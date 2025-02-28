"use client";
import { transfers } from "@/app/data/transfer";
import { Filter } from "@/components/filter";
import { ServiceCard } from "@/components/service-card";
import { ServiceLabel } from "@/components/service-label";
import { getTransfer } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const Transfer = () => {
  // console.log(await searchParams);
  const searchParams = useSearchParams();

  const type = searchParams.get("type") || "all";

  const filteredTransferData = getTransfer({ type });

  return (
    <div className="space-y-4">
      <div className="flex flex-col flex-wrap gap-4">
        <Filter />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {filteredTransferData.map((transfer) => (
            <ServiceCard
              key={transfer.id}
              price={transfer.price_per_trip}
              imageUrl={transfer.image}
              title={transfer.service_name}
              from={transfer.from || "unknown"}
              to={transfer.to || "unknown"}
              description={transfer.description}
              availability={transfer.availability}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
