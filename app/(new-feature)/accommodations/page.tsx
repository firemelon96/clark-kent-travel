import { HeroService } from "@/components/hero-service";
import AccomClient from "./_components/accom-client";

const AccomodationPage = () => {
  return (
    <section className="space-y-4">
      <HeroService title="Accomodations" />
      <AccomClient />
    </section>
  );
};

export default AccomodationPage;
