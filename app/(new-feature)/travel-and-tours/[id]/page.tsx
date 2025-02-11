import { getTourById } from "@/app/lib/helpers";
import { BookingOptions } from "@/components/booking-options";
import { ImageBanner } from "@/components/image-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BiSolidLeftArrow } from "react-icons/bi";

interface SingleProps {
  params: {
    id: string;
  };
}

const SinglePage = ({ params }: SingleProps) => {
  const tour = getTourById(params.id);
  return (
    <section className="space-y-5">
      <ImageBanner images={tour.images} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{tour.tourName}</h1>
              <Badge>{tour.privatePrice[0]}</Badge>
            </div>
            <p className="text-justify text-slate-700">{tour.description}</p>
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[450px]">
          <CardHeader>
            <p className="text-2xl font-medium">{tour.tourName}</p>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Check Availability</Button>
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
              <BookingOptions tourId={tour.tourId} prices={tour.privatePrice} />
            </CardContent>
          </Card>
        </div>
        <div className="w-full space-y-2 md:w-[450px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-300 p-4">
            <BiSolidLeftArrow className="absolute -left-4 top-0 hidden size-6 text-rose-300 md:block" />
            <div>
              <h3 className="text-2xl font-medium">Itinerary</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePage;
