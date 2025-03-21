import { ServiceLabel } from "@/components/service-label";
import { getDayTours } from "../lib/helpers";
import Card from "./tour-card";
import { Button } from "@/components/ui/button";
import { getFirstAvailablePrice } from "@/lib/utils";

const Tours = () => {
  const tours = getDayTours();

  return (
    <section className="scroll-mt-6 space-y-4 md:text-start" id="tours">
      <ServiceLabel
        label="Adventure Escapes"
        subHeading="Experience More in a Day!"
      />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tours.slice(0, 8).map((tour) => {
          const joinerPrice = getFirstAvailablePrice(tour.pricing, "joiner");
          const privatePrice = getFirstAvailablePrice(tour.pricing, "private");
          return (
            <Card
              id={tour.tourId}
              key={tour.tourId}
              image={tour.images[0]}
              address={tour.address[0]}
              title={tour.tourName}
              price={joinerPrice || privatePrice}
            />
          );
        })}
      </div>
      <div className="flex w-full items-center justify-center">
        <Button variant="ckBtn" className="">
          See more...
        </Button>
      </div>
    </section>
  );
};

export default Tours;
