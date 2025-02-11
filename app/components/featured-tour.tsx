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

const FeaturedCard = () => {
  const packageTours = getPackageTours();
  return (
    <div className="mt-10 w-full">
      <div className="space-y-4">
        <ServiceLabel label="Tour Packages" />
        <Carousel className="w-full">
          <CarouselContent>
            {packageTours.map((tour, i) => (
              <CarouselItem
                className="flex items-center justify-center md:basis-1/3"
                key={i}
              >
                <FeatureCard imageUrl={tour.images[0]} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedCard;
