import { TourPackage } from "@/types/tour";
import Card from "./tour-card";

type Props = {
  title: string;
  tours: TourPackage[];
};
export const PackageLists = ({ title, tours }: Props) => {
  return (
    <div className="my-10 flex flex-col items-center gap-4 md:items-start">
      <h3 className="pb-10 text-4xl font-semibold text-primary">
        <span className="text-rose-500">{title}</span> Packages
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {tours.map((tour) => (
          //temp fix of price for preview
          <Card
            id={tour.tourId}
            key={tour.tourId}
            image={tour.images[0]}
            address={tour.address[0]}
            price={
              tour.pricing.map((price) =>
                price.prices.map((price) => price.price),
              )[0]
            }
            title={tour.tourName}
            privatePrice={tour.privatePrice!}
          />
        ))}
      </div>
    </div>
  );
};
