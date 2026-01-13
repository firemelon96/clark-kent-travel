import { formatPeso, getTourById } from "@/app/lib/helpers";
import {
  BookingPreview,
  BookingPreviewSkeleton,
} from "@/components/booking-preview";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Suspense } from "react";
import { ContactForm } from "./_components/contact-form";
import { Stepper } from "@/components/stepper";
// import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    from: Date;
    participants: number;
    to: Date;
    totalPrice: number;
    tourId: string;
    type: "Joiner" | "Private";
    mapLink: string;
  }>;
}

const BookingPage = async ({ searchParams }: Props) => {
  const { from, participants, to, totalPrice, tourId, type, mapLink } =
    await searchParams;

  console.log(from, participants, to, totalPrice, type);
  // const session = await auth();

  // console.log(await searchParams);

  const tour = getTourById(tourId);

  // if (!session?.user.id) redirect(`/travel-and-tours`);

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
                <BookingPreview
                  url={tour.images[0]}
                  title={tour.tourName}
                  participants={participants}
                  type={type}
                />
              </Suspense>
            </CardContent>
            <CardHeader>
              <span className="border-l-2 border-l-rose-500 pl-4 uppercase">
                Contact details
              </span>
            </CardHeader>
            <CardContent className="w-full">
              <ContactForm
                tourName={tour.tourName}
                participants={participants}
                totalPrice={totalPrice}
                from={from}
                to={to}
                type={type}
                mapLink={mapLink}
              />
            </CardContent>
          </Card>
          <div className="w-full space-y-4 md:w-1/3">
            <Card>
              <CardHeader>
                {/* {isLoading ? (
                  <Skeleton className="h-5 w-full" />
                ) : (
                  <h1 className="font-semibold">{tour?.title}</h1>
                )} */}
                <h1 className="font-semibold">{tour.tourName}</h1>
                <span className="text-slate-500">{type}</span>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="flex justify-between text-sm">
                  <p className="text-slate-500">Date</p>
                  <span>
                    {format(from, "LLL dd, yyyy")} -{" "}
                    {format(to, "LLL dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-slate-500">Quantity</p>
                  <span>Person x {participants}</span>
                </div>
                <Separator />
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <p className="text-sm text-slate-500">Total</p>
                <span className="text-xl font-semibold">
                  {formatPeso(totalPrice)}
                </span>
              </CardFooter>
            </Card>
            <Card className="space-y-4">
              <div className="p-6">
                <div className="flex justify-between">
                  <p className="text-slate-500">Subtotal</p>
                  <span>{formatPeso(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-xl">
                  <p>Total</p>
                  <span className="font-bold tracking-wide text-rose-500">
                    {formatPeso(totalPrice)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;
