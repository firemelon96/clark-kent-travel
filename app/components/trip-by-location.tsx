import Image from "next/image";
import { getAllTourLocation } from "../lib/helpers";
import { ServiceLabel } from "@/components/service-label";
import { Card } from "@/components/ui/card";

const trips = [
  {
    name: "Balabac",
    imageUrl:
      "https://cdn.palawanwebsolutions.com/clarkkent/trips/Balabac.avif",
  },
  {
    name: "Coron",
    imageUrl: "https://cdn.palawanwebsolutions.com/clarkkent/trips/Coron.avif",
  },
  {
    name: "El Nido",
    imageUrl: "https://cdn.palawanwebsolutions.com/clarkkent/trips/Elnido.avif",
  },
  {
    name: "Puerto Princesa",
    imageUrl: "https://cdn.palawanwebsolutions.com/clarkkent/trips/Puerto.avif",
  },
  {
    name: "Port Barton",
    imageUrl: "https://cdn.palawanwebsolutions.com/clarkkent/trips/Barton.avif",
  },
  {
    name: "Bohol",
    imageUrl: "https://cdn.palawanwebsolutions.com/clarkkent/trips/Bohol.avif",
  },
];

const TripByLocation = () => {
  const tourByLocation = getAllTourLocation();
  return (
    <section className="space-y-4 pb-10">
      <ServiceLabel
        label="Unforgettable Journeys"
        subHeading="Explore, Experience, and Enjoy Every Moment!"
      />
      <div className="flex flex-col md:flex-row">
        {trips.map((trip, i) => (
          <Card
            key={i}
            className="relative h-28 w-full rounded-none p-0 shadow-none md:h-90"
          >
            <div className="relative h-full w-full">
              <Image
                src={trip.imageUrl}
                fill
                alt={trip.imageUrl + trip.name}
                className="h-full object-cover"
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
