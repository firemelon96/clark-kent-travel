import Image from "next/image";
import { getAllTourLocation } from "../lib/helpers";

const TripByLocation = () => {
  const tourByLocation = getAllTourLocation();
  const array = [0, 1, 2, 3, 4];
  return (
    <section className="container mx-auto mt-10 px-4 md:my-10 md:px-20">
      {/* Tailwind get 2 last element and change style */}
      <div className="py-20">
        <p className="text-slate-800 pb-10 text-center text-4xl font-semibold md:text-start">
          Plan your <span className="text-rose-500">Next Trip</span> with us
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {tourByLocation.map((tour, i) => (
            <div
              key={i}
              className={`relative h-40 md:col-span-2 ${i === array.length - 2 && "md:col-span-3"} md:last:col-span-3`}
            >
              <Image
                src={tour.image}
                fill
                alt="balabac"
                className="object-cover"
              />
              <div className="bg-rose-500/20 absolute inset-y-0 w-full backdrop-blur-sm">
                <div className="p-4">
                  <span className="text-sky-50 text-3xl font-semibold uppercase">
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
