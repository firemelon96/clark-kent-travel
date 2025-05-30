import { HeroService } from "@/components/hero-service";
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
