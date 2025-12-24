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
import { getFeaturedTour } from "@/lib/data";
import { notFound } from "next/navigation";

const FeaturedCard = async () => {
  const packageTours = getPackageTours();
  // const featuredTours = (await getFeaturedTour()) || [];

  return (
    <div className="mt-10 w-full">
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
