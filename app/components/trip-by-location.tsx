import Image from "next/image";
import { getAllTourLocation } from "../lib/helpers";

const TripByLocation = () => {
  const tourByLocation = getAllTourLocation();
  const array = [0, 1, 2, 3, 4];
  return (
    <section className="container mx-auto mt-10 px-4 md:my-10 md:px-20">
      {/* Tailwind get 2 last element and change style */}
      <div className="py-20">
        <p className="pb-10 text-center text-4xl font-semibold text-slate-800 md:text-start">
          Plan your <span className="text-rose-500">Next Trip</span> with us
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {tourByLocation.map((tour, i) => (
            <div key={i} className={`relative h-40 md:col-span-2`}>
              <Image
                unoptimized
                src={tour.image}
                fill
                alt="balabac"
                className="object-cover"
              />
              <div className="absolute inset-y-0 w-full bg-rose-500/20 backdrop-blur-xs">
                <div className="p-4">
                  <span className="text-3xl font-semibold text-sky-50 uppercase">
                    {tour.address}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripByLocation;
