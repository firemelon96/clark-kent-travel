import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPackageTours } from "../lib/helpers";
import { FeatureCard } from "../../components/feature-card";
import { ServiceLabel } from "@/components/service-label";

const FeaturedCard = async () => {
  const packageTours = getPackageTours();

  return (
    <div className="w-full">
      <div className="space-y-4">
        <ServiceLabel
          label="Epic Getaways"
          subHeading="Unforgettable Adventures, Hassle-Free Travel!"
        />
        <Carousel className="w-full">
          <CarouselContent>
            {packageTours.map((tour, i) => (
              <CarouselItem
                className="flex items-center justify-center sm:basis-1/2 md:basis-1/3"
                key={i}
              >
                <FeatureCard imageUrl={tour.images[0]} slug={tour.slug} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedCard;
