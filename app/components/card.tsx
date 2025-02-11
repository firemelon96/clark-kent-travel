import Image from "next/image";
import { formatPeso } from "../lib/helpers";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Banknote, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  image: string;
  title: string;
  price?: number | number[];
  address: string;
  id: string;
  privatePrice: number[];
}

const Card = ({
  image,
  title,
  price,
  address,
  id,
  privatePrice,
}: CardProps) => {
  return (
    <Link href={`/travel-and-tours/${id}`}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-md border bg-white shadow-sm hover:border-rose-500 hover:shadow-md sm:shadow-none md:w-fit">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            fill
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-64 px-2 pb-4">
          <h2 className="truncate text-xl font-medium text-slate-600">
            {title}
          </h2>
          <div className="flex gap-2">
            {price && !Array.isArray(price) && (
              <Badge variant="secondary" className="text-slate-500">
                {formatPeso(price)}
              </Badge>
            )}
            {price && Array.isArray(price) && (
              <Badge variant="secondary" className="text-slate-500">
                {formatPeso(price[0])}
              </Badge>
            )}
            {!price && privatePrice && (
              <Badge variant="secondary" className="text-slate-500">
                {formatPeso(privatePrice[0])}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="overflow-hidden text-slate-500"
            >
              <MapPin className="size-3" />
              <span className="flex-1 truncate">{address}</span>
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
