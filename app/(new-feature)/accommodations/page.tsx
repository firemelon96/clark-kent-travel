import { HeroService } from "@/components/hero-service";
import AccomClient from "./_components/accom-client";
import { Suspense } from "react";

const AccomodationPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Accomodations" />
      <Suspense>
        <AccomClient />
      </Suspense>
    </section>
  );
};

export default AccomodationPage;
