import { Description } from "@/app/(new-feature)/travel-and-tours/_components/description";
import { formatPeso, getTourBySlug } from "@/app/lib/helpers";
import { BookOptionTour } from "@/components/book-option-tour";
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

interface SingleProps {
  params: Promise<{
    slug: string;
  }>;
}

const SinglePage = async ({ params }: SingleProps) => {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  const price = tour.pricing[0].price;

  if (!tour) {
    return notFound();
  }

  return (
    <section className="mx-auto mt-5 mb-10 max-w-5xl space-y-5">
      <ImageBanner images={tour.images} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{tour.tourName}</h1>
              <Badge>{formatPeso(price)}</Badge>
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
              <BookOptionTour
                duration={tour.duration}
                tourId={tour.tourId}
                tourPricing={tour.pricing}
                service="tour"
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-full space-y-2 md:w-[370px]">
          <span className="font-medium uppercase">Package Information</span>
          <div className="relative rounded-md bg-rose-50 px-4">
            <BiSolidLeftArrow className="absolute top-0 -left-4 hidden size-6 text-rose-50 md:block" />
            <div>
              <Accordion
                type="single"
                collapsible
                className="mt-2 w-full"
                defaultValue={tour.itineraries[0].name}
              >
                {tour.itineraries.map((itinerary) => (
                  <AccordionItem key={itinerary.name} value={itinerary.name}>
                    <AccordionTrigger className="hover:no-underline">
                      <Badge>{itinerary.name}</Badge>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 px-4 text-balance">
                      <ul>
                        {itinerary.activities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:no-underline">
                    <Badge>Inclusions</Badge>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 px-4 text-balance">
                    <ul>
                      {tour.inclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="hover:no-underline">
                    <Badge>Exclusions</Badge>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 px-4 text-balance">
                    <ul>
                      {tour.exclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SinglePage;
