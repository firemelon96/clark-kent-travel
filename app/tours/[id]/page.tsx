import Description from "../components/description";
import Itenerary from "../components/itenerary";
import ListBox from "../components/list-box";
import { FormWithZOD } from "../components/form-with-zod";
import ImageSliderSlick from "@/app/components/image-slider-slick";
import { formatPeso, getTourById } from "@/app/lib/helpers";
import RecommendedTours from "@/app/components/recommended-tours";
import { Metadata } from "next";
import { tours } from "@/app/data/tours";
import { SocialShare } from "@/app/components/social-share";

interface SingleTourProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return tours.map(({ tourId }) => tourId);
}

export async function generateMetadata({
  params,
}: SingleTourProps): Promise<Metadata> {
  const tour = getTourById(params.id);
  return {
    title: tour.tourName,
    description: tour.description,
    openGraph: {
      images: [{ url: tour.images[0] }],
    },
  };
}

const SingleTour = ({ params }: SingleTourProps) => {
  const tour = getTourById(params.id);

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/tours/${params.id}`;

  return (
    <>
      <div className="container mx-auto mt-20 xl:px-20">
        <div className="flex flex-col gap-0 md:flex-row">
          <div className="flex w-full flex-col gap-4 p-4 md:w-2/3">
            <div className="mb-20 h-[500px] bg-sky-50">
              <ImageSliderSlick images={tour.images} />
            </div>
            <SocialShare url={shareLink} />
            <Description
              duration={tour.duration}
              tourName={tour.tourName}
              price={tour.price}
              description={tour.description}
              privatePrice={tour.privatePrice}
            />
            <Itenerary itineraries={tour.itineraries} />
          </div>
          <div className="flex w-full flex-col gap-4 px-4 py-0 md:sticky md:top-20 md:w-1/3 md:px-0 md:py-4">
            <div className="border-third text-third border bg-sky-50 p-4 shadow-md">
              <h4 className="text-sm font-normal text-slate-400">
                {tour.price &&
                  !Array.isArray(tour.price) &&
                  `Price starts at ${formatPeso(tour.price)}`}
                {tour.price &&
                  Array.isArray(tour.price) &&
                  `Price starts at ${formatPeso(tour.price[0])}`}
                {!tour.price &&
                  tour.privatePrice &&
                  `Price starts at ${formatPeso(tour.privatePrice[0])}`}
              </h4>
              <hr className="my-2" />
              <h5 className="text-2xl font-bold text-sky-500">
                {tour.tourName}
              </h5>
              <p className="text-base text-slate-500">{tour.address[0]}</p>

              <FormWithZOD
                price={tour.price}
                duration={tour.duration}
                privatePrice={tour.privatePrice!}
                title={tour.tourName}
              />
            </div>
            <ListBox items={tour.reminders!} type="Reminder" />
            <ListBox items={tour.inclusions} type="Inclusion" />
            <ListBox items={tour.exclusions} type="Exclusion" />
            <ListBox items={tour.notes!} type="Notes" />
          </div>
        </div>
      </div>
      <RecommendedTours id={params.id} />
    </>
  );
};

export default SingleTour;
