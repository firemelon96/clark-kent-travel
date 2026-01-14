import Image from "next/image";
import { formatPeso } from "../lib/helpers";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Banknote, BanknoteIcon, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  image: string;
  title: string;
  address: string;
  id: string;
  price: number | null;
  bestSeller?: boolean;
}

const TourCard = ({
  image,
  title,
  address,
  id,
  price,
  bestSeller,
}: CardProps) => {
  // const isPriceArray = Array.isArray(price);

  return (
    <Link href={`/travel-and-tours/${id}`} className="relative">
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-md border border-sky-500 bg-white shadow-xs hover:shadow-md hover:shadow-rose-500">
        {bestSeller && (
          <Badge className="absolute top-2 right-2" variant={"destructive"}>
            Best Seller
          </Badge>
        )}
        <div className="relative h-64 w-full md:h-52">
          <Image
            unoptimized
            src={image}
            fill
            alt={title}
            className="object-cover transition-all ease-in-out hover:scale-105"
          />
        </div>

        <div className="px-2 pb-4 md:w-64">
          <h2 className="line-clamp-1 font-medium text-slate-600">{title}</h2>
          <div className="flex gap-2">
            {price && (
              <Badge variant="secondary" className="text-slate-500">
                {formatPeso(price)}
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

export default TourCard;
