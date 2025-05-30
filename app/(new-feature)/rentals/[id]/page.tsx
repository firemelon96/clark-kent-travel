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
import { Dot } from "lucide-react";
import { formatPeso } from "@/app/lib/helpers";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const RentalSinglePage = async ({ params }: Props) => {
  const { id } = await params;
  const rental = rentals.find((rental) => rental.id === id);

  if (!rental) notFound();

  const isHourMinDuration =
    rental.rentalTerms.minimumRentalPeriod > 0 &&
    rental.rentalTerms.minimumRentalPeriod <= 24; //hour
  const isDayMaxDuration =
    rental.rentalTerms.maximumRentalPeriod >= 24 &&
    rental.rentalTerms.maximumRentalPeriod <= 30; //consider as day

  return (
    <section className="space-y-4">
      <ImageBanner images={rental?.images} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{rental.name}</h1>
              <Badge>{formatPeso(rental.pricePerDay)}</Badge>
            </div>
            <div className="space-y-4">
              <p className="text-justify text-slate-700">
                {rental.brand} {rental.type} {rental.modelYear}
              </p>
              <ul className="flex gap-4 rounded-md border p-2 text-sm text-slate-500">
                <li className="flex items-center">
                  <Dot /> {rental.transmission}
                </li>
                <li className="flex items-center">
                  <Dot /> {rental.fuelType}
                </li>
                <li className="flex items-center">
                  <Dot /> {rental.seatingCapacity} Seater
                </li>
                <li className="flex items-center">
                  <Dot /> {rental.luggageCapacity}
                </li>
              </ul>
              <div>
                <p>Rental Terms</p>
                <ul className="pl-2 text-sm text-slate-500">
                  <li>
                    <p>
                      Minimum Rental Period:{" "}
                      <span>
                        {rental.rentalTerms.minimumRentalPeriod}{" "}
                        {isHourMinDuration ? "Hours" : "Days"}
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Maximum Rental Period:{" "}
                      <span>
                        {rental.rentalTerms.maximumRentalPeriod}{" "}
                        {isDayMaxDuration ? "Days" : "Hours"}
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Age Requirement :
                      <span>{rental.rentalTerms.ageRequirement} years old</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Fuel Policy :<span>{rental.rentalTerms.fuelPolicy}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Required Documents :
                      {rental.rentalTerms.requiredDocuments.map((doc, i) => (
                        <span key={i}>{doc}</span>
                      ))}
                    </p>
                  </li>
                  <li>
                    <p>
                      Late Return Penalty :
                      <span>{rental.rentalTerms.lateReturnPenalty}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{rental.name}</p>{" "}
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
              <RentalBookingOptions
                pricePerDay={rental.pricePerDay || 0}
                rentId={rental.id}
                extras={rental.extras}
                pricePerHour={rental.pricePerHour}
                isHourMinDuration={isHourMinDuration}
                isDayMaxDuration={isDayMaxDuration}
                minDuration={rental.rentalTerms.minimumRentalPeriod}
                maxDuration={rental.rentalTerms.maximumRentalPeriod}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-50 px-4">
            <BiSolidLeftArrow className="absolute top-0 -left-4 hidden size-6 text-rose-50 md:block" />
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
