import {
  FastCraftWihtoutMeta,
  TransferWihtoutMeta,
} from "@/types/other-services";
import OtherServicesCard from "./other-services-card";
import FastCraftCard from "./fast-craft-card";

type Props = {
  title: string;
  services: FastCraftWihtoutMeta[];
};
export const FastCraftLists = ({ title, services }: Props) => {
  return (
    <div className="my-10 flex flex-col items-center gap-4 md:items-start">
      <h3 className="text-primary pb-10 text-4xl font-semibold">
        Other Services: <span className="text-rose-500">{title}</span>
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {services.map((transfer) => (
          <FastCraftCard
            id={transfer.id}
            key={transfer.id}
            image={transfer.images[0]}
            service_name={transfer.service_name}
            price_per_trip={transfer.price_per_trip}
            vehicle_type={transfer.vehicle_type}
          />
        ))}
      </div>
    </div>
  );
};
