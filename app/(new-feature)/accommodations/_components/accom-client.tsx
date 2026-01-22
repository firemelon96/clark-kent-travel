import { accommodtions } from "@/app/data/accommodations";
import { AccomCard } from "./accom-card";

const AccomClient = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-col gap-4">
        <div className="mb-10 grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {accommodtions.map((accom) => (
            <AccomCard
              id={accom.id}
              key={accom.id}
              imageUrl={accom.images[0]}
              title={accom.name}
              pricing={accom.pricing}
              location={accom.location}
              maxPax={accom.maxPax}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccomClient;
