import { getAccomById } from "@/app/lib/helpers";
import {
  BookingPreview,
  BookingPreviewSkeleton,
} from "@/components/booking-preview";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";
import { Stepper } from "@/components/stepper";
import { AccomContactDetail } from "../_components/accom-contact-detail";
import { AccomDetailCard } from "../_components/accom-detail-card";

interface Props {
  searchParams: Promise<{
    id: string;
    title: string;
  }>;
}

const AccomReservation = async ({ searchParams }: Props) => {
  const { id, title } = await searchParams;

  const accom = getAccomById(id);

  if (!accom) return;

  return (
    <section className="mx-auto max-w-5xl space-y-5 py-10">
      <Stepper />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <Card className="flex-1 shadow-none">
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Accommodation details
              </span>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<BookingPreviewSkeleton />}>
                <BookingPreview url={accom.images[0]} title={title} />
              </Suspense>
            </CardContent>
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Contact details
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <AccomContactDetail />
            </CardContent>
          </Card>
          <AccomDetailCard />
        </div>
      </div>
    </section>
  );
};

export default AccomReservation;
