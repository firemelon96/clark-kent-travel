import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bike, Car, Cog, Fuel, Luggage, Settings2, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { SiTransmission } from "react-icons/si";

interface AccomProps {
  id: string;
  imageUrl: string;
  title: string;
}

export const AccomCard = ({ id, imageUrl, title }: AccomProps) => {
  return (
    <Card className="h-full overflow-hidden border-none shadow-none">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 w-full md:h-56 md:w-72">
          <Image src={imageUrl} fill alt={id} className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="h-10">
            <h1 className="text-xl font-medium leading-none">{title}</h1>
          </div>
          {/* <div className="grid grid-cols-2 bg-slate-50 p-1 text-xs">
            <div className="flex gap-2">
              {type === "Scooter" ? (
                <Bike className="mr-1 size-4" />
              ) : (
                <Car className="mr-1 size-4" />
              )}{" "}
              <span>{brand}</span>
            </div>

            {seatingCapacity && (
              <div className="flex gap-2">
                <User className="mr-1 size-4" />{" "}
                <span>{seatingCapacity} Seater</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Cog className="mr-1 size-4" /> <span>{transmission}</span>
            </div>
            {luggageCapacity && (
              <div className="flex gap-2">
                <Luggage className="mr-1 size-4" />
                <span className="flex-1">{luggageCapacity}</span>
              </div>
            )}
            {type && (
              <div className="flex gap-2">
                <Settings2 className="mr-1 size-4" />
                <span className="flex-1">{type}</span>
              </div>
            )}
            <div className="flex gap-2">
              <Fuel className="mr-1 size-4" />{" "}
              <span className="flex-1">{fuelType}</span>
            </div>
          </div> */}
          <div className="flex flex-col md:items-end md:justify-end">
            <span className="text-sm text-slate-500">price start at</span>
            {/* <p>{pricePerDay || pricePerTrip}</p> */}
            <Button asChild>
              <Link href={`/rentals/${id}`}>Book This Model</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
