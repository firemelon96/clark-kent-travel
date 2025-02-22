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
  const from = searchParams?.get("from") || undefined;
  const to = searchParams?.get("to") || undefined;
  // console.log({
  //   type,
  //   from,
  //   to,
  // });
  const filteredTransferData = getTransfer({ type, from, to });

  return (
    <section className="space-y-4">
      <ServiceLabel label="Transfers" subHeading="Adventure" />
      <div className="flex flex-col gap-4 md:flex-row">
        <Filter />
        <div className="flex flex-1 flex-col gap-2">
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
    </section>
  );
};
