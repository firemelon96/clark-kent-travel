import { AccomodationType, TransferWihtoutMeta } from "@/types/other-services";
import OtherServicesCard from "./other-services-card";
import AccomodationsCard from "./accomodations-card";

type Props = {
  name: string;
  data: AccomodationType[];
};
export const AccomodationsList = ({ name, data }: Props) => {
  return (
    <div className="my-10 flex flex-col items-center gap-4 md:items-start">
      <h3 className="text-primary pb-10 text-4xl font-semibold">
        Other Services: <span className="text-rose-500">{name}</span>
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {data.map((transfer) => (
          <AccomodationsCard key={transfer.id} data={transfer} />
        ))}
      </div>
    </div>
  );
};