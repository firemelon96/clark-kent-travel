import { getTransferById } from "@/app/lib/helpers";
import {
  BookingPreview,
  BookingPreviewSkeleton,
} from "@/components/booking-preview";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";
import { Stepper } from "@/components/stepper";
import { ContactDetailForm } from "../_components/contact-detail-form";
import { DetailsCard } from "../_components/details-card";

interface Props {
  searchParams: Promise<{
    id: string;
    title: string;
  }>;
}

const ReservePage = async ({ searchParams }: Props) => {
  const { id, title } = await searchParams;

  const transfer = getTransferById(id);

  if (!transfer) return;

  return (
    <section className="mx-auto max-w-5xl space-y-5 py-10">
      <Stepper />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <Card className="flex-1 shadow-none">
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                transfer details
              </span>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<BookingPreviewSkeleton />}>
                <BookingPreview url={transfer.images[0]} title={title} />
              </Suspense>
            </CardContent>
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Contact details
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <ContactDetailForm />
            </CardContent>
          </Card>
          <DetailsCard />
        </div>
      </div>
    </section>
  );
};

export default ReservePage;
