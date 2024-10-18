import { formatPeso } from "@/app/lib/helpers";

interface DescriptionProps {
  name: string;
  price: number;
  description: string;
}

const Description = ({ name, price, description }: DescriptionProps) => {
  return (
    <div className="space-y-2 rounded-md bg-sky-50 p-4">
      <div className="flex justify-between">
        <p className="text-semibold flex items-center gap-2 text-3xl font-bold text-sky-800">
          {formatPeso(price)} / night
        </p>
      </div>
      <h1 className="text-xl font-semibold uppercase text-slate-500">{name}</h1>

      <h5 className="pt-5 text-xl font-bold uppercase text-sky-800">
        Overview
      </h5>
      <p className="text-xl text-slate-600">{description}</p>
    </div>
  );
};

export default Description;
