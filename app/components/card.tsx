import Image from "next/image";
import { formatPeso } from "../lib/helpers";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

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
    <Link href={`/tours/${id}`}>
      <div className="flex w-fit flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md sm:shadow-none">
        <div className="h-48 w-60 overflow-hidden rounded-xl">
          <Image
            unoptimized
            src={image || ""}
            width={300}
            height={300}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-60">
          {price && !Array.isArray(price) && (
            <span className="flex items-center text-2xl font-extrabold text-slate-700">
              {formatPeso(price)} / <FaUser className="ml-2 size-5" />
            </span>
          )}
          {price && Array.isArray(price) && (
            <span className="flex items-center text-2xl font-extrabold text-slate-700">
              {formatPeso(price[0])} / <FaUser className="ml-2 size-5" />
            </span>
          )}
          {!price && privatePrice && (
            <span className="flex items-center text-2xl font-extrabold text-slate-700">
              {formatPeso(privatePrice[0])} / <FaUser className="ml-2 size-5" />
            </span>
          )}
          <h2 className="truncate text-xl font-semibold text-slate-600">
            {title}
          </h2>
          <p className="text-sm text-slate-500">
            <span>{address}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
