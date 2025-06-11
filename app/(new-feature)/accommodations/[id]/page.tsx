import { getHotel } from "@/app/lib/helpers";
import { ImageBanner } from "@/components/image-banner";
import { Description } from "../_components/description";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RoomTable } from "../_components/room-table";

interface SingleProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: SingleProps) => {
  const { id } = await params;

  const hotel = getHotel(id);

  return (
    <section className="mx-auto mt-5 mb-10 max-w-5xl space-y-5">
      <ImageBanner images={hotel.images} />
      <div className="flex flex-col-reverse gap-4 text-center md:flex-row md:text-start">
        <div className="flex flex-1 flex-col">
          <div className="space-y-2">
            <div className="hidden md:block">
              <h1 className="text-2xl font-medium">{hotel.name}</h1>
            </div>
            <Description description={hotel.description} />
          </div>
        </div>
        <Card className="h-full w-full border-none shadow-none md:w-[370px]">
          <CardHeader>
            <p className="text-2xl font-medium">{hotel.name}</p>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="w-full" asChild>
              <Link href={"#booking-option"}>Check Availability</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <RoomTable rooms={hotel.rooms} />
    </section>
  );
};

export default Page;
