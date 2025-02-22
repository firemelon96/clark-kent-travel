import Image from "next/image";
import { getAllTourLocation } from "../lib/helpers";
import { ServiceLabel } from "@/components/service-label";
import { Card } from "@/components/ui/card";

const trips = [
  {
    name: "Balabac",
    imageUrl: "/resources/trips/balabac.webp",
  },
  {
    name: "Coron",
    imageUrl: "/resources/trips/coron.jpg",
  },
  {
    name: "El Nido",
    imageUrl: "/resources/trips/elnido.jpg",
  },
  {
    name: "Puerto Princesa",
    imageUrl: "/resources/trips/ppc.webp",
  },
  {
    name: "Port Barton",
    imageUrl: "/resources/trips/portbarton.jpeg",
  },
  {
    name: "Bohol",
    imageUrl: "/resources/trips/bohol.jpg",
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
      <div className="flex">
        {trips.map((trip, i) => (
          <Card
            key={i}
            className="relative h-96 w-full rounded-none shadow-none"
          >
            <div className="relative h-full w-full">
              <Image
                src={trip.imageUrl}
                fill
                alt={trip.imageUrl + trip.name}
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
