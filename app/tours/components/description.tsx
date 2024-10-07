import { formatPeso } from "@/app/lib/helpers";
import { BsClock } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

interface DescriptionProps {
  tourName: string;
  price?: number | number[];
  description: string;
  privatePrice: number[];
  duration: string[];
}

const Description = ({
  tourName,
  price,
  description,
  privatePrice,
  duration,
}: DescriptionProps) => {
  return (
    <div className="space-y-2 rounded-md bg-sky-50 p-4">
      <div className="flex justify-between">
        {price && !Array.isArray(price) && (
          <p className="text-semibold flex items-center gap-2 text-3xl font-bold text-sky-800">
            {formatPeso(price)} / <FaUser className="size-5" />
          </p>
        )}
        <div className="flex flex-col">
          {duration.map((item) => (
            <span
              className="flex items-center gap-2 text-sm text-slate-600"
              key={item}
            >
              <BsClock className="size-3" /> {item}
            </span>
          ))}
        </div>
      </div>
      <h1 className="text-xl font-semibold uppercase text-slate-500">
        {tourName}
      </h1>
      {price && Array.isArray(price) && (
        <p className="text-semibold flex items-center gap-2 text-2xl font-bold text-slate-500">
          {formatPeso(price[0])} / <FaUser className="size-5" />
        </p>
      )}
      {!price && privatePrice && (
        <p className="text-semibold flex items-center gap-2 text-2xl font-bold text-slate-500">
          {formatPeso(privatePrice[0])} / <FaUser className="size-5" />
        </p>
      )}
      <h5 className="pt-5 text-xl font-bold uppercase text-sky-800">
        Overview
      </h5>
      <p className="text-xl text-slate-600">{description}</p>
    </div>
  );
};

export default Description;
