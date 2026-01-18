import { transfers } from "@/app/data/transfer";
import { formatPeso } from "@/app/lib/helpers";
import { BookOptionTour } from "@/components/book-option-tour";
import { BookingOptions } from "@/components/booking-options";
import { ImageBanner } from "@/components/image-banner";
import { OptionCard } from "@/components/option-card";
import { ReusableAccordion } from "@/components/reusable-accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Car, Dot } from "lucide-react";
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
    <section className="mx-auto mt-5 mb-10 max-w-5xl space-y-4 p-4">
      <ImageBanner images={transfer.images[0]} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{transfer.title}</h1>
              <Badge>
                From {formatPeso(transfer.options[0].pricing[0].price)}
              </Badge>
            </div>
            <div className="text-justify">{transfer.description}</div>
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{transfer.title}</p>{" "}
            <span className="md:hidden">
              Starts at {formatPeso(transfer.options[0].pricing[0].price)}
            </span>
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
          {transfer.options.map((option) => (
            <OptionCard
              key={option.name}
              name={option.name}
              id={option.id}
              pricing={option.pricing}
            />
          ))}
        </div>
        <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-50 px-4">
            <BiSolidLeftArrow className="absolute top-0 -left-4 hidden size-6 text-rose-50 md:block" />
            <div>
              {/* <ReusableAccordion items={transfer.included} label="Inclusion" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePage;
