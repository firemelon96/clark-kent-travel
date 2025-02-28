import { rentals } from "@/app/data/rentals";
import { BookingOptions } from "@/components/booking-options";
import { ImageBanner } from "@/components/image-banner";
import { ReusableAccordion } from "@/components/reusable-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiSolidLeftArrow } from "react-icons/bi";
import { RentalBookingOptions } from "../_components/rental-booking-options";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const RentalSinglePage = async ({ params }: Props) => {
  const { id } = await params;
  const rental = rentals.find((rental) => rental.id === id);

  if (!rental) notFound();

  return (
    <section className="space-y-4">
      <ImageBanner images={rental?.images} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{rental.name}</h1>
              <Badge>{rental.pricePerDay}</Badge>
            </div>
            <p className="text-justify text-slate-700">{rental.brand}</p>
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{rental.name}</p>
          </CardHeader>
          <CardContent>
            <Button variant="ckBtn" className="w-full" asChild>
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
              <RentalBookingOptions
                pricePerDay={rental.pricePerDay || 0}
                rentId={rental.id}
                extras={rental.extras}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-50 px-4">
            <BiSolidLeftArrow className="absolute -left-4 top-0 hidden size-6 text-rose-50 md:block" />
            <div>
              <ReusableAccordion items={rental.included} label="Inclusion" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalSinglePage;
