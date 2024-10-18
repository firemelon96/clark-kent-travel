import Image from "next/image";
import { formatPeso } from "../lib/helpers";
import Link from "next/link";
import { PartnersType } from "@/types/partners";

interface MariafeProps {
  data: PartnersType;
}

const MariafeCard = ({ data }: MariafeProps) => {
  return (
    <Link href={`/mariafe-inn/${data.id}`}>
      <div className="flex w-fit flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md sm:shadow-none">
        <div className="h-48 w-60 overflow-hidden rounded-xl">
          <Image
            src={data.images[0]}
            width={300}
            height={300}
            alt={data.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-60">
          <span className="flex items-center text-2xl font-extrabold text-slate-700">
            {formatPeso(data.roomType[0].pricePerNight)}
          </span>

          <h2 className="truncate text-xl font-semibold text-slate-600">
            {data.name}
          </h2>
          <p className="truncate text-sm text-slate-500">
            <span>{data.address}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MariafeCard;
