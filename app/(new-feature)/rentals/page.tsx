import { HeroService } from "@/components/hero-service";
import { RentalsClient } from "./_components/rentals-client";

const RentalsPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Rentals" />
      <RentalsClient />
    </section>
  );
};

export default RentalsPage;
