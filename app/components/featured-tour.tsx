import { getFeaturedTours } from "../lib/helpers";
import Card from "./card";

const FeaturedTour = () => {
  const featuredTours = getFeaturedTours();
  console.log();
  return (
    <div className="absolute -mt-20 w-full gap-4 overflow-x-scroll pb-8">
      <div className="ml-5 flex w-max gap-4 md:ml-36">
        {featuredTours.map((tour) => (
          <Card
            privatePrice={tour.privatePrice}
            key={tour.tourId}
            image={tour.images[0]}
            address={tour.address[0]}
            price={tour.price}
            title={tour.tourName}
            id={tour.tourId}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedTour;
