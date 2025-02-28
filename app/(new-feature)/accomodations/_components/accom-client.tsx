import { accomodations } from "@/app/data/accomodations";
import { Filter } from "@/components/filter";
import { ServiceLabel } from "@/components/service-label";
import { AccomCard } from "./accom-card";

const AccomClient = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <Filter />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {accomodations.map((accom) => (
            <AccomCard
              id={accom.id}
              key={accom.id}
              imageUrl={accom.images[0]}
              title={accom.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccomClient;
