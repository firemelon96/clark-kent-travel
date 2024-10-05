import { formatPeso } from "@/app/lib/helpers";
import { BiInfoSquare } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

interface DescriptionProps {
  tourName: string;
  price?: number | number[];
  description: string;
  iti: string;
}

const Description = ({
  tourName,
  price,
  description,
  iti,
}: DescriptionProps) => {
  return (
    <div className="space-y-2 rounded-md bg-sky-50 p-4">
      <h1 className="text-3xl font-bold uppercase text-sky-800">
        {tourName} {iti && `- ${iti}`}
      </h1>
      {price && !Array.isArray(price) && (
        <p className="text-semibold flex items-center gap-2 text-2xl font-bold text-slate-500">
          {formatPeso(price)} / <FaUser className="size-5" />
        </p>
      )}
      {price && Array.isArray(price) && (
        <p className="text-semibold flex items-center gap-2 text-2xl font-bold text-slate-500">
          {formatPeso(price[0])} / <FaUser className="size-5" />
        </p>
      )}
      <h5 className="pt-10 text-xl font-bold uppercase text-sky-800">
        Overview
      </h5>
      <p className="text-xl text-slate-600">{description}</p>
    </div>
  );
};

export default Description;
