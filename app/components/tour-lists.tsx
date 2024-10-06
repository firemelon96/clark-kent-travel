import { TourPackage } from "@/types/tour";
import Card from "./card";

type Props = {
  title: string;
  tours: TourPackage[];
};
export const TourLists = ({ title, tours }: Props) => {
  return (
    <div className="my-10 flex flex-col items-center gap-4 md:items-start">
      <h3 className="text-primary pb-10 text-4xl font-semibold">
        Destinations in <span className="text-rose-500">{title}</span>
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
    </div>
  );
};
