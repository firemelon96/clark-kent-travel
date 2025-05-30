import { formatPeso } from "@/app/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bike,
  Car,
  Cog,
  Fuel,
  LucideIcon,
  Luggage,
  Settings2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import { SiTransmission } from "react-icons/si";

interface RentalProps {
  imageUrl: string;
  title: string;
  brand: string;
  type: string;
  modelYear: number;
  fuelType: string;
  seatingCapacity: number | undefined;
  luggageCapacity: string | undefined;
  transmission: string;
  pricePerDay: number | undefined;
  serviceType: string;
  id: string;
}

export const RentalCard = ({
  imageUrl,
  title,
  brand,
  type,
  modelYear,
  serviceType,
  fuelType,
  seatingCapacity,
  luggageCapacity,
  transmission,
  pricePerDay,
  id,
}: RentalProps) => {
  return (
    <Link href={`/rentals/${id}`}>
      <Card className="h-fit overflow-hidden shadow-none hover:border-rose-500">
        <div className="flex flex-col">
          <div className="relative h-48 w-full">
            <Image
              unoptimized
              src={imageUrl}
              fill
              alt={title}
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="line-clamp-1">
              <h1 className="text-xl leading-none font-medium">{title}</h1>
            </div>
            <div className="flex gap-2">
              <Badge variant={"secondary"}>
                {formatPeso(pricePerDay || 0)}
              </Badge>{" "}
              <Badge className="uppercase" variant={"secondary"}>
                {serviceType}
              </Badge>
            </div>
            <div className="grid grid-cols-2 bg-slate-50 p-1 text-xs">
              <div className="flex gap-2">
                {type === "Scooter" ? (
                  <Bike className="mr-1 size-4" />
                ) : (
                  <Car className="mr-1 size-4" />
                )}{" "}
                <span>{brand}</span>
              </div>

              {seatingCapacity && (
                <IconText icon={User} label={`${seatingCapacity} Seater`} />
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
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

type IconTextProps = {
  icon: LucideIcon;
  label: string;
};

const IconText = ({ icon: Icon, label }: IconTextProps) => {
  return (
    <div className="flex gap-2">
      <Icon className="mr-1 size-4" />
      <span className="flex-1">{label}</span>
    </div>
  );
};
