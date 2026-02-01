import { getLandById, getLandBySlug, getTourById } from "@/app/lib/helpers";
import {
  BookingPreview,
  BookingPreviewSkeleton,
} from "@/app/(new-feature)/travel-and-tours/_components/booking-preview";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";
// import { TourContactForm } from "../_components/tour-contact-form";
import { Stepper } from "@/components/stepper";
import { Preview } from "../_components/preview";
import { DetailsCard } from "../_components/details-card";
import { ContactForm } from "../_components/contact-form";

interface Props {
  searchParams: Promise<{
    id: string;
  }>;
}

const BookingPage = async ({ searchParams }: Props) => {
  const { id } = await searchParams;

  const land = getLandById(id);

  if (!land) return;

  return (
    <section className="mx-auto max-w-5xl space-y-5 p-4">
      <Stepper />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <Card className="flex-1 shadow-none">
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Tour details
              </span>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<BookingPreviewSkeleton />}>
                <Preview url={land.images[0]} title={land.title} />
              </Suspense>
            </CardContent>
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Contact details
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <ContactForm title={land.title} />
            </CardContent>
          </Card>
          <DetailsCard name={land.title} />
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
