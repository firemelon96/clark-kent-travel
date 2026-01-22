import { formatPeso, getTourById, getTransferById } from "@/app/lib/helpers";
import {
  BookingPreview,
  BookingPreviewSkeleton,
} from "@/app/(new-feature)/travel-and-tours/_components/booking-preview";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";
import { ContactForm } from "./_components/contact-form";
import { Stepper } from "@/components/stepper";
import { DetailsCard } from "@/app/(new-feature)/travel-and-tours/_components/details-card";

interface Props {
  searchParams: Promise<{
    id: string;
  }>;
}

const BookingPage = async ({ searchParams }: Props) => {
  const { id } = await searchParams;

  const tour = getTourById(id);

  if (!tour) return;

  return (
    <section className="mx-auto max-w-5xl space-y-5 py-10">
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
                <BookingPreview url={tour.images[0]} title={tour.tourName} />
              </Suspense>
            </CardContent>
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Contact details
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <ContactForm tourName={tour.tourName} />
            </CardContent>
          </Card>
          <DetailsCard name={tour.tourName} />
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
