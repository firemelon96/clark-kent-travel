import { Check, CheckCircle, Notebook, Package, Paperclip } from "lucide-react";
import { Separator } from "./ui/separator";
import { BsBank } from "react-icons/bs";

interface StepperProps {
  isSucces?: boolean;
}

export const Stepper = ({ isSucces = false }: StepperProps) => {
  return (
    <div className="mx-auto flex max-w-xl items-center p-4">
      <div className="flex flex-col items-center justify-center text-sm">
        <CheckCircle className="size-4 text-slate-300" />
        <p className="text-slate-300">Activity</p>
      </div>
      <div className="flex-1 border-t border-slate-300" />
      <div className="flex flex-col items-center justify-center text-sm">
        {isSucces ? (
          <CheckCircle className="size-4 text-slate-300" />
        ) : (
          <Package className="size-4" />
        )}
        <p className={isSucces ? "text-slate-300" : ""}>Confirm Details</p>
      </div>
      <div className="flex-1 border-t border-slate-300" />
      <div className="flex flex-col items-center justify-center text-sm">
        {isSucces ? (
          <CheckCircle className="size-4 text-slate-300" />
        ) : (
          <BsBank className="size-4" />
        )}
        <p className={isSucces ? "text-slate-300" : ""}>Status</p>
      </div>
    </div>
  );
};
