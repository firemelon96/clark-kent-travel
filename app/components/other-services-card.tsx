import Image from "next/image";
import { formatPeso } from "../lib/helpers";
import Link from "next/link";

interface OtherServicesProps {
  image: string;
  service_name: string;
  vehicle_type: string;
  id: string;
  price_per_trip: number;
}

const OtherServicesCard = ({
  image,
  service_name,
  vehicle_type,
  id,
  price_per_trip,
}: OtherServicesProps) => {
  return (
    <Link href={`/other-services/${id}`}>
      <div className="flex w-fit flex-col gap-2 rounded-2xl bg-white p-4 shadow-xs hover:shadow-md sm:shadow-none">
        <div className="h-48 w-60 overflow-hidden rounded-xl">
          <Image
            unoptimized
            src={image}
            width={300}
            height={300}
            alt={service_name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-60">
          {price_per_trip && (
            <span className="flex items-center text-2xl font-extrabold text-slate-700">
              {formatPeso(price_per_trip)}
            </span>
          )}

          <h2 className="truncate text-xl font-semibold text-slate-600">
            {service_name}
          </h2>
          <p className="text-sm text-slate-500">
            <span>{vehicle_type}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default OtherServicesCard;
