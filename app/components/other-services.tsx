import { FeatureCard } from "@/components/feature-card";
import { ServiceLabel } from "@/components/service-label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { services } from "../data/services";

const otherServicesCard = [
  {
    imageUrl: "",
    href: "/transfers",
    name: "Transfers",
    description: "Enjoy our transfers offer",
  },
  {
    imageUrl: "",
    href: "/accommodations",
    name: "Accommodations",
    description: "Enjoy our accomodations here",
  },
  {
    imageUrl: "",
    href: "/rentals",
    name: "Rentals",
    description: "Rent the most cheapest price",
  },
];

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
        <Carousel className="w-full">
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
        </Carousel>
      </div>
    </section>
  );
};

export default OtherServices;
