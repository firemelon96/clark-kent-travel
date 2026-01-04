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
    <div className="mx-auto max-w-5xl space-y-4 p-4">
      <h1 className="pt-5 text-xl font-light text-slate-500">
        Search result for {searchUrl.location} {searchUrl.type}
      </h1>
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tours.map((tour) => (
          <TourCard
            id={tour.tourId}
            key={tour.tourId}
            image={tour.images[0]}
            address={tour.address[0]}
            price={tour.pricing[0].price}
            title={tour.tourName}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
