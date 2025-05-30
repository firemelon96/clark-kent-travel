import { transfers } from "@/app/data/transfer";
import { ImageBanner } from "@/components/image-banner";
import { ReusableAccordion } from "@/components/reusable-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dot } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiSolidLeftArrow } from "react-icons/bi";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const SinglePage = async ({ params }: Props) => {
  const { id } = await params;

  const transfer = transfers.find((transfer) => transfer.id === id);

  if (!transfer) notFound();

  return (
    <section className="space-y-4">
      <ImageBanner images={transfer?.image} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{transfer.title}</h1>
              <Badge>{transfer.price_per_trip}</Badge>
            </div>
            <div>{transfer.description}</div>
            <div className="space-y-4">
              <p className="text-justify text-slate-700">
                from {transfer.from} - to {transfer.to}
              </p>
              <ul className="flex gap-4 rounded-md border p-2 text-sm text-slate-500">
                <li className="flex items-center">
                  <Dot /> {transfer.capacity} Seater
                </li>
                <li className="flex items-center">
                  <Dot /> {transfer.vehicle_type}
                </li>
                <li className="flex items-center">
                  <Dot /> {transfer.type}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{transfer.title}</p>{" "}
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
              {/* <RentalBookingOptions
                pricePerDay={rental.pricePerDay || 0}
                rentId={rental.id}
                extras={rental.extras}
              /> */}
            </CardContent>
          </Card>
        </div>
        {/* <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-50 px-4">
            <BiSolidLeftArrow className="absolute -left-4 top-0 hidden size-6 text-rose-50 md:block" />
            <div>
              <ReusableAccordion items={transfer.included} label="Inclusion" />
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SinglePage;
