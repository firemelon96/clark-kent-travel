import { formatPeso } from "@/app/lib/helpers";
import { BsClock } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

interface DescriptionProps {
  tourName: string;
  price: number;
  description: string;
  type: string;
  vehicleType: string;
}

const Description = ({
  tourName,
  price,
  description,
  type,
  vehicleType,
}: DescriptionProps) => {
  return (
    <div className="space-y-2 rounded-md bg-sky-50 p-4">
      <div className="flex justify-between">
        <p className="text-semibold flex items-center gap-2 text-3xl font-bold text-sky-800">
          {formatPeso(price)}
        </p>
      </div>
      <h1 className="text-xl font-semibold uppercase text-slate-500">
        {tourName}
      </h1>

      <h5 className="pt-5 text-xl font-bold uppercase text-sky-800">
        Overview
      </h5>
      <p className="text-xl text-slate-600">{description}</p>
    </div>
  );
};

export default Description;
