import Card from "@/app/components/card";
import { getTravelTours } from "@/app/lib/helpers";

type Props = {
  searchParams: Promise<{ location: string; type: string }>;
};

const SearchPage = async ({ searchParams }: Props) => {
  const searchUrl = await searchParams;

  const tours = getTravelTours(searchUrl);

  return (
    <div>
      <h1>Search result for {searchUrl.location}</h1>
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
  );
};

export default SearchPage;
