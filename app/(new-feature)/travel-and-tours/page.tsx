import Card from "@/app/components/tour-card";
import Hero from "@/app/components/hero";
import { tours } from "@/app/data/tours";
import { HeroService } from "@/components/hero-service";
import { ServiceLabel } from "@/components/service-label";
import { getFirstAvailablePrice } from "@/lib/utils";
import { FilterTour } from "./_components/filter-tour";
import { TourClient } from "./_components/tour-client";

const TravelPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Travel and Tour Services" imageUrl="" />
      <TourClient />
    </section>
  );
};

export default TravelPage;
