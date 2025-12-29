import Description from "../components/description";
import { BookingForm } from "../components/booking-form";
import { formatPeso, getOtherServicesById } from "@/app/lib/helpers";
import RecommendedTours from "@/app/components/recommended-tours";
import { Metadata } from "next";
import { SocialShare } from "@/app/components/social-share";
import Image from "next/image";
import { transfer_services } from "@/app/data/logistics";
import Details from "../components/details";

interface SingleServiceProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return transfer_services.map((other) => ({ id: other.id }));
}

export async function generateMetadata({
  params,
}: SingleServiceProps): Promise<Metadata> {
  const { id } = await params;
  const otherServices = getOtherServicesById(id);
  return {
    title: otherServices.service_name,
    description: otherServices.description,
    openGraph: {
      images: [{ url: otherServices.image }],
    },
  };
}

const SingleService = async ({ params }: SingleServiceProps) => {
  const { id } = await params;
  const otherServices = getOtherServicesById(id);

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL}/other-services/${id}`;

  return (
    <>
      <div className="container mx-auto mt-20 xl:px-20">
        <div className="flex flex-col gap-0 md:flex-row">
          <div className="flex w-full flex-col gap-4 p-4 md:w-2/3">
            <div className="relative h-[500px] bg-sky-50">
              {/* <ImageSliderSlick images={otherServices.image} /> */}
              <Image
                src={otherServices.image}
                fill
                alt={otherServices.service_name}
                className="object-cover"
              />
            </div>
            <SocialShare url={shareLink} />
            <Description
              tourName={otherServices.service_name}
              price={otherServices.price_per_trip}
              description={otherServices.description}
              type={otherServices.type}
              vehicleType={otherServices.vehicle_type}
            />
          </div>
          <div className="flex w-full flex-col gap-4 px-4 py-0 md:sticky md:top-20 md:w-1/3 md:px-0 md:py-4">
            <div className="border-third text-third border bg-sky-50 p-4 shadow-md">
              <h4 className="text-sm font-normal text-slate-400">
                {otherServices.price_per_trip &&
                  `Price starts at ${formatPeso(otherServices.price_per_trip)}`}
              </h4>
              <hr className="my-2" />
              <h5 className="text-2xl font-bold text-sky-500">
                {otherServices.service_name}
              </h5>

              <BookingForm
                price={otherServices.price_per_trip}
                title={otherServices.service_name}
                vehicleType={otherServices.vehicle_type}
                type={otherServices.type}
                availability={otherServices.availability}
              />
            </div>

            <Details
              type={otherServices.type}
              vehicleType={otherServices.vehicle_type}
              availability={otherServices.availability}
              capacity={otherServices.capacity}
            />
          </div>
        </div>
      </div>
      <RecommendedTours id={id} />
    </>
  );
};

export default SingleService;
