import { getRentalById } from "@/app/lib/helpers";
import { BookingPreview } from "@/app/(new-feature)/travel-and-tours/_components/booking-preview";
import { Stepper } from "@/components/stepper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getRentalByType } from "@/lib/utils";
import { Suspense } from "react";
import { RentalDetailCard } from "../_components/rental-detail-card";
import { RentalPreview } from "../_components/rental-preview";
import { RentalContactForm } from "../_components/rental-contact-form";

interface Props {
  searchParams: Promise<{
    rentId: string;
    title: string;
  }>;
}
async function ReservationRentalPage({ searchParams }: Props) {
  const { rentId, title } = await searchParams;
  const rental = getRentalById(rentId);

  return (
    <section className="mx-auto max-w-5xl space-y-5 py-10">
      <Stepper />
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <Card className="flex-1 shadow-none">
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Rental details
              </span>
            </CardHeader>
            <CardContent>
              <Suspense>
                <RentalPreview url={rental.images[0]} title={title} />
              </Suspense>
            </CardContent>
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Contact details
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <RentalContactForm />
            </CardContent>
          </Card>
          <RentalDetailCard />
        </div>
      </div>
    </section>
  );
}

export default ReservationRentalPage;
