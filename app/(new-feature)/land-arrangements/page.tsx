import { HeroService } from "@/components/hero-service";
import { Client } from "./_components/client";
import { Suspense } from "react";

const TravelPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Land Arrangements" imageUrl="" />
      <Suspense>
        <Client />
      </Suspense>
    </section>
  );
};

export default TravelPage;
