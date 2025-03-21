import TourCard from "@/app/components/tour-card";
import Card from "@/app/components/tour-card";
import { getTravelTours } from "@/app/lib/helpers";
import { getFirstAvailablePrice } from "@/lib/utils";

type Props = {
  searchParams: Promise<{ location: string; type: string }>;
};

const SearchPage = async ({ searchParams }: Props) => {
  const searchUrl = await searchParams;

  const tours = getTravelTours(searchUrl);

  return (
    <div>
      <h1>Search result for {searchUrl.location}</h1>
      {tours.map((tour) => {
        const joinerPrice = getFirstAvailablePrice(tour.pricing, "joiner");
        const privatePrice = getFirstAvailablePrice(tour.pricing, "private");
        return (
          <TourCard
            id={tour.tourId}
            key={tour.tourId}
            image={tour.images[0]}
            address={tour.address[0]}
            price={joinerPrice || privatePrice}
            title={tour.tourName}
          />
        );
      })}
    </div>
  );
};

export default SearchPage;
