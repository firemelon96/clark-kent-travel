import { ServiceLabel } from "@/components/service-label";
import {
  getDayTours,
  getPackageToursByLocation,
  getServicesByType,
  getToursByLocation,
} from "../lib/helpers";
import { OtherServicesList } from "./other-services-list";
import { PackageLists } from "./package-lists";
import { TourLists } from "./tour-lists";
import Card from "./card";
import { Button } from "@/components/ui/button";

const Tours = () => {
  const tours = getDayTours();

  return (
    <section className="scroll-mt-6 space-y-4 md:text-start" id="tours">
      <ServiceLabel label="Day Tours" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tours.slice(0, 8).map((tour) => (
          <Card
            id={tour.tourId}
            key={tour.tourId}
            image={tour.images[0]}
            address={tour.address[0]}
            price={tour.price}
            title={tour.tourName}
            privatePrice={tour.privatePrice!}
          />
        ))}
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
