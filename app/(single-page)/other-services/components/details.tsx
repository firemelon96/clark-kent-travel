import { IconType } from "react-icons";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiCheckCircle, BiHelpCircle, BiXCircle } from "react-icons/bi";

interface DetailsType {
  type: string;
  vehicleType: string;
  capacity: number;
  availability: string;
}

const Details = ({
  type,
  vehicleType,
  capacity,
  availability,
}: DetailsType) => {
  return (
    <div className="flex flex-col gap-2 bg-sky-50 p-4">
      <h5 className="text-xl font-semibold uppercase text-sky-800">
        {type} Details
      </h5>
      <p className="text-slate-400">
        <span className="text-slate-500">Vehicle Type: </span> {vehicleType}
      </p>
      <p className="text-slate-400">
        <span className="text-slate-500">Availability: </span> {availability}
      </p>
      <p className="text-slate-400">
        <span className="text-slate-500">Capacity: </span> {capacity}
      </p>
    </div>
  );
};

export default Details;
