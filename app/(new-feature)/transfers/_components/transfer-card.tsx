import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bike,
  Car,
  CloudSun,
  Cog,
  Fuel,
  Luggage,
  MapPin,
  PinIcon,
  Settings2,
  Sun,
  TimerIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { SiTransmission } from "react-icons/si";

interface TransferProps {
  imageUrl: string;
  title: string;
  from: string;
  to: string;
  vehicleType: string;
  seatingCapacity: number;
  description: string;
  pricePerTrip: number;
  id: string;
  availability: string | { morning: string; afternoon: string };
}

export const TransferCard = ({
  imageUrl,
  title,
  id,
  from,
  to,
  vehicleType,
  seatingCapacity,
  description,
  availability,
  pricePerTrip,
}: TransferProps) => {
  const isAvailabilityString = typeof availability === "string";
  return (
    <Link href={`/transfers/${id}`}>
      <div className="flex min-h-[360px] w-full flex-col gap-2 overflow-hidden rounded-md border border-sky-500 bg-white shadow-xs hover:shadow-md hover:shadow-rose-500">
        <div className="flex flex-col">
          <div className="relative h-64 w-full md:h-52">
            <Image
              unoptimized
              src={imageUrl}
              fill
              alt={title}
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="h-14">
              <h1 className="text-xl leading-none font-medium">{title}</h1>
              <div className="flex items-center gap-0.5">
                <MapPin className="size-3" /> <p className="text-sm">{from}</p>{" "}
                - <MapPin className="size-3" />
                <p className="text-sm">{to}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 bg-slate-50 p-1 text-xs">
              <div className="flex gap-0.5">
                <User className="mr-1 size-4" />{" "}
                <span>{seatingCapacity} Seater</span>
              </div>
              {isAvailabilityString && (
                <div className="flex items-center gap-0.5">
                  <TimerIcon className="mr-1 size-4" />
                  <span>{availability}</span>
                </div>
              )}
              {!isAvailabilityString && (
                <>
                  <div className="flex gap-0.5">
                    <Sun className="mr-1 size-4" />{" "}
                    <span>{availability.morning}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <CloudSun className="mr-1 size-4" />{" "}
                    <span>{availability.afternoon}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
