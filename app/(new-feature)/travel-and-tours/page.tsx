import { HeroService } from "@/components/hero-service";
import { TourClient } from "./_components/tour-client";
import { Suspense } from "react";

const TravelPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Travel and Tour Services" imageUrl="" />
      <Suspense>
        <TourClient />
      </Suspense>
    </section>
  );
};

export default TravelPage;
