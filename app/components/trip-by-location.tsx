import Image from "next/image";
import { getAllTourLocation } from "../lib/helpers";
import { ServiceLabel } from "@/components/service-label";
import { Card } from "@/components/ui/card";

const TripByLocation = () => {
  const tourByLocation = getAllTourLocation();
  return (
    <section className="space-y-4 pb-10">
      <ServiceLabel label="Trips" />
      <div className="flex">
        {tourByLocation.map((tour, i) => (
          <Card
            key={i}
            className="relative h-96 w-full rounded-none shadow-none"
          >
            <div className="relative h-full w-full">
              <Image
                src={tour.image}
                fill
                alt={tour.image}
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/30"></div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TripByLocation;
