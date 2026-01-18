import { Badge } from "@/components/ui/badge";
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
  id: string;
  location: string[];
}

export const TransferCard = ({
  imageUrl,
  title,
  id,
  location,
}: TransferProps) => {
  return (
    <Link href={`/transfers/${id}`}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-md border border-sky-500 bg-white shadow-xs hover:shadow-md hover:shadow-rose-500">
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
              <div className="flex items-center gap-2">
                {location.map((loc) => (
                  <Badge variant={"secondary"}>
                    <MapPin /> {loc}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
