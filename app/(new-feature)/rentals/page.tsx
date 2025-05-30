import { HeroService } from "@/components/hero-service";
import { RentalsClient } from "./_components/rentals-client";
import { Suspense } from "react";

const RentalsPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Rentals Services" />
      <Suspense>
        <RentalsClient />
      </Suspense>
    </section>
  );
};

export default RentalsPage;
