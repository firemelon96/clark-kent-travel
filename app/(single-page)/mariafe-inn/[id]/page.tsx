import Description from "../components/description";
import { BookingForm } from "../components/booking-form";
import { formatPeso, getOtherServicesById } from "@/app/lib/helpers";
import RecommendedTours from "@/app/components/recommended-tours";
import { Metadata } from "next";
import { SocialShare } from "@/app/components/social-share";

import { accomodations } from "@/app/data/accomodations";
import ImageSliderSlick from "@/app/components/image-slider-slick";
import { notFound } from "next/navigation";
import { partners } from "@/app/data/partners";
import ListContent from "../components/list-content";
import { Policies } from "../components/policies";

interface SingleServiceProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return accomodations.map(({ id }) => id);
}

export async function generateMetadata({
  params,
}: SingleServiceProps): Promise<Metadata> {
  const mariafe = partners.find((partner) => partner.id === params.id);

  return {
    title: mariafe?.name,
    description: mariafe?.description,
    openGraph: {
      images: [{ url: mariafe?.images[0] || "" }],
    },
  };
}

const SingleService = ({ params }: SingleServiceProps) => {
  const mariafeData = partners.find((partner) => partner.id === params.id);

  if (!mariafeData) return notFound();

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/mariafe-inn/${params.id}`;

  return (
    <>
      <div className="container mx-auto mt-20 xl:px-20">
        <div className="flex flex-col gap-0 md:flex-row">
          <div className="flex w-full flex-col gap-4 p-4 md:w-2/3">
            <div className="relative mb-20 h-[500px] bg-sky-50">
              <ImageSliderSlick images={mariafeData.images} />
              {/* <Image
                src={otherServices.image}
                fill
                alt={otherServices.service_name}
                className="object-cover"
              /> */}
            </div>
            <SocialShare url={shareLink} />
            <Description
              name={mariafeData.name}
              price={mariafeData.roomType[0].pricePerNight}
              description={mariafeData.description}
            />
          </div>
          <div className="flex w-full flex-col gap-4 px-4 py-0 md:sticky md:top-20 md:w-1/3 md:px-0 md:py-4">
            <div className="border-third text-third border bg-sky-50 p-4 shadow-md">
              <h4 className="text-sm font-normal text-slate-400">
                Price starts at{" "}
                {formatPeso(mariafeData.roomType[0].pricePerNight)}
              </h4>
              <hr className="my-2" />
              <h5 className="text-2xl font-bold text-sky-500">
                {mariafeData.name}
              </h5>

              <BookingForm
                title={mariafeData.name}
                roomType={mariafeData.roomType}
              />
            </div>

            {/* inclusions */}
            <ListContent title="Inclusions" datas={mariafeData.inclusions} />
            <ListContent title="Notes" datas={mariafeData.notes} />
          </div>
        </div>
      </div>
      <RecommendedTours id={params.id} />
    </>
  );
};

export default SingleService;
