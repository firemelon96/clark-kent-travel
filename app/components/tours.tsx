import { ServiceLabel } from "@/components/service-label";
import { getDayTours } from "../lib/helpers";
import Card from "./tour-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { getFirstAvailablePrice } from "@/lib/utils";
import Link from "next/link";

const Tours = () => {
  const tours = getDayTours();

  return (
    <section className="scroll-mt-6 space-y-4 md:text-start" id="tours">
      <ServiceLabel
        label="Adventure Escapes"
        subHeading="Experience More in a Day!"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:place-items-center lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tours.slice(0, 8).map((tour) => (
          <Card
            id={tour.tourId}
            key={tour.tourId}
            image={tour.images[0]}
            address={tour.address[0]}
            title={tour.tourName}
            price={tour.pricing[0].price}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center">
        <Link href={"/travel-and-tours"} className={buttonVariants()}>
          See more...
        </Link>
      </div>
    </section>
  );
};

export default Tours;
