import { formatPeso, getTourById } from "@/app/lib/helpers";
import { BookingOptions } from "@/components/booking-options";
import { ImageBanner } from "@/components/image-banner";
import { ReusableAccordion } from "@/components/reusable-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFirstAvailablePrice } from "@/lib/utils";
import Link from "next/link";
import { BiSolidLeftArrow } from "react-icons/bi";
import { Description } from "../_components/description";

interface SingleProps {
  params: Promise<{
    id: string;
  }>;
}

const SinglePage = async (props: SingleProps) => {
  const params = await props.params;
  const tour = getTourById(params.id);

  const isExpand = false;

  const joinerPrice = getFirstAvailablePrice(tour.pricing, "joiner");

  const privatePrice = getFirstAvailablePrice(tour.pricing, "private");

  return (
    <section className="space-y-5">
      <ImageBanner images={tour.images} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{tour.tourName}</h1>
              <Badge>
                {joinerPrice
                  ? formatPeso(joinerPrice || 0)
                  : formatPeso(privatePrice || 0)}
              </Badge>
            </div>
            <Description description={tour.description} />
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{tour.tourName}</p>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="w-full" asChild>
              <Link href={"#booking-option"}>Check Availability</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col-reverse gap-4 md:flex-row">
        <div className="flex flex-1 flex-col space-y-2">
          <span className="border-l-2 border-rose-500 pl-4 font-medium uppercase">
            Options
          </span>
          <Card className="">
            <CardHeader>Select Options</CardHeader>
            <CardContent>
              <BookingOptions
                duration={tour.numOfDays}
                tourId={tour.tourId}
                pricing={tour.pricing}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-50 px-4">
            <BiSolidLeftArrow className="absolute top-0 -left-4 hidden size-6 text-rose-50 md:block" />
            <div>
              <ReusableAccordion
                itineraries={tour.itineraries}
                label="Itinerary"
              />
              <ReusableAccordion items={tour.inclusions} label="Inclusion" />
              <ReusableAccordion items={tour.exclusions} label="Exclusions" />
              <ReusableAccordion items={tour.notes} label="Additionat Info" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePage;
