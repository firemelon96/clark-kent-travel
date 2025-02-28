import { FeatureCard } from "@/components/feature-card";
import { ServiceLabel } from "@/components/service-label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { services } from "../data/services";

const OtherServices = () => {
  return (
    <section
      className="scroll-mt-6 space-y-4 md:text-start"
      id="other-services"
    >
      <ServiceLabel
        label="Seamless Travel Solutions"
        subHeading="Transfers, Stays, and Rentals for a Worry-Free Journey!"
      />
      <div className="flex flex-col justify-evenly gap-2 md:flex-row">
        <Carousel
          opts={{
            align: "start", // Ensures the first item is fully visible
            containScroll: "trimSnaps", // Ensures full items are shown
          }}
          className="w-full"
        >
          <CarouselContent>
            {services.map((service, i) => (
              <CarouselItem
                className="flex items-center justify-center md:basis-1/2"
                key={i}
              >
                <FeatureCard
                  hasText
                  className="h-72 w-full"
                  imageUrl={service.image}
                  name={service.name}
                  href={service.href}
                  description={service.description}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
      </div>
    </section>
  );
};

export default OtherServices;
