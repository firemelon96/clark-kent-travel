import { Check, CheckCircle, Notebook, Package, Paperclip } from "lucide-react";
import { Separator } from "./ui/separator";
import { BsBank } from "react-icons/bs";

interface StepperProps {
  isSucces?: boolean;
}

export const Stepper = ({ isSucces = false }: StepperProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center justify-center text-sm">
        <CheckCircle className="size-4 text-slate-300" />
        <p className="text-slate-300">Choose Tour</p>
      </div>
      <div className="flex-1 border-t border-slate-300" />
      <div className="flex flex-col items-center justify-center text-sm">
        {isSucces ? (
          <CheckCircle className="size-4 text-slate-300" />
        ) : (
          <Package className="size-4" />
        )}
        <p className={isSucces ? "text-slate-300" : ""}>Confirm Booking</p>
      </div>
      <div className="flex-1 border-t border-slate-300" />
      <div className="flex flex-col items-center justify-center text-sm">
        {isSucces ? (
          <CheckCircle className="size-4 text-slate-300" />
        ) : (
          <BsBank className="size-4" />
        )}
        <p className={isSucces ? "text-slate-300" : ""}>Payment Status</p>
      </div>
    </div>
  );
};
