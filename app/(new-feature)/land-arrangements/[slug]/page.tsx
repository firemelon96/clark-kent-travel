import { Description } from "@/app/(new-feature)/travel-and-tours/_components/description";
import { formatPeso, getLandBySlug, getTourBySlug } from "@/app/lib/helpers";
import { BookOptionTour } from "@/app/(new-feature)/travel-and-tours/_components/book-option-tour";
import { ImageBanner } from "@/components/image-banner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiSolidLeftArrow } from "react-icons/bi";
import { Options } from "../_components/options";
import { Information } from "../_components/Information";

interface SingleProps {
  params: Promise<{
    slug: string;
  }>;
}

const SinglePage = async ({ params }: SingleProps) => {
  const { slug } = await params;
  const land = getLandBySlug(slug);

  const price = land.options[0].price;

  if (!land) {
    return notFound();
  }

  return (
    <section className="mx-auto mt-5 mb-10 max-w-5xl space-y-5">
      <ImageBanner images={land.images[0]} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{land.title}</h1>
              <Badge>{formatPeso(price)}</Badge>
            </div>
            <Description description={land.description} />
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{land.title}</p>
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
          {land.options.map((option) => (
            <Options
              name={option.name}
              key={option.iti}
              iti={option.iti}
              price={option.price}
            />
          ))}
        </div>
        <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <Information options={land.options} />
        </div>
      </div>
    </section>
  );
};

export default SinglePage;
