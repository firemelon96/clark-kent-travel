import Description from "../components/description";
import { BookingForm } from "../components/booking-form";
import { formatPeso, getOtherServicesById } from "@/app/lib/helpers";
import RecommendedTours from "@/app/components/recommended-tours";
import { Metadata } from "next";
import { SocialShare } from "@/app/components/social-share";
import Image from "next/image";
import { transfer_services } from "@/app/data/logistics";
import Details from "../components/details";
import { accomodations } from "@/app/data/accomodations";
import ImageSliderSlick from "@/app/components/image-slider-slick";
import { notFound } from "next/navigation";
import Inclusions from "../components/inclusions";

interface SingleServiceProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return accomodations.map((accom) => ({ id: accom.id }));
}

export async function generateMetadata({
  params,
}: SingleServiceProps): Promise<Metadata> {
  const { id } = await params;
  const accomodationsData = accomodations.find((acc) => acc.id === id);

  return {
    title: accomodationsData?.name,
    description: accomodationsData?.description,
    openGraph: {
      images: [{ url: accomodationsData?.images[0] || "" }],
    },
  };
}

const SingleService = async ({ params }: SingleServiceProps) => {
  const { id } = await params;
  const accomodationsData = accomodations.find(
    (accomodation) => accomodation.id === id,
  );

  if (!accomodationsData) return notFound();

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/accomodations/${id}`;

  return (
    <>
      <div className="container mx-auto mt-20 xl:px-20">
        <div className="flex flex-col gap-0 md:flex-row">
          <div className="flex w-full flex-col gap-4 p-4 md:w-2/3">
            <div className="relative mb-20 h-[500px] bg-sky-50">
              <ImageSliderSlick images={accomodationsData.images} />
              {/* <Image
                src={otherServices.image}
                fill
                alt={otherServices.service_name}
                className="object-cover"
              /> */}
            </div>
            <SocialShare url={shareLink} />
            <Description
              name={accomodationsData.name}
              price={accomodationsData.price_per_night}
              description={accomodationsData.description}
            />
          </div>
          <div className="flex w-full flex-col gap-4 px-4 py-0 md:sticky md:top-20 md:w-1/3 md:px-0 md:py-4">
            <div className="border-third text-third border bg-sky-50 p-4 shadow-md">
              <h4 className="text-sm font-normal text-slate-400">
                Price starts at {formatPeso(accomodationsData.price_per_night)}
              </h4>
              <hr className="my-2" />
              <h5 className="text-2xl font-bold text-sky-500">
                {accomodationsData.name}
              </h5>

              <BookingForm
                price={accomodationsData.price_per_night}
                title={accomodationsData.name}
              />
            </div>

            {/* inclusions */}
            <Inclusions inclusions={accomodationsData.inclusions} />
          </div>
        </div>
      </div>
      <RecommendedTours id={id} />
    </>
  );
};

export default SingleService;
