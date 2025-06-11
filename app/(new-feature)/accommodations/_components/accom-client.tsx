import { AccomCard } from "./accom-card";
import { hotels } from "@/app/data/hotels";

const AccomClient = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {hotels.map((accom) => (
            <AccomCard
              id={accom.id}
              key={accom.id}
              imageUrl={accom.images[0]}
              title={accom.name}
              rooms={accom.rooms}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccomClient;
