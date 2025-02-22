import Card from "@/app/components/card";
import Hero from "@/app/components/hero";
import { tours } from "@/app/data/tours";
import { HeroService } from "@/components/hero-service";
import { ServiceLabel } from "@/components/service-label";

const TravelPage = () => {
  return (
    <>
      <HeroService title="Travel and Tour Services" imageUrl="" />
      <section>
        <ServiceLabel label="Travel and Tour Services" subHeading="Tours" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {tours.map((tour) => (
            <Card
              id={tour.tourId}
              key={tour.tourId}
              image={tour.images[0]}
              address={tour.address[0]}
              price={tour.price}
              title={tour.tourName}
              privatePrice={tour.privatePrice!}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default TravelPage;
