"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { formatPeso } from "@/app/lib/helpers";
import { useUrlParams } from "@/hooks/use-url-params";
import { Calendar, MoonStar, User } from "lucide-react";

export const AccomDetailCard = () => {
  const { eachParams } = useUrlParams();

  return (
    <div className="w-full space-y-4 md:w-1/3">
      <Card>
        <CardHeader>
          <h1 className="font-semibold">{eachParams.title}</h1>
          <span className="text-slate-500">{eachParams.type}</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <Calendar className="size-3" /> Date
            </p>
            <span>
              {format(eachParams.from, "EEE, LLL dd")} -{" "}
              {format(eachParams.to, "EEE, LLL dd")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <MoonStar className="size-3" /> Number of nights
            </p>
            <span>
              {eachParams.numOfNights}{" "}
              {+eachParams.numOfNights > 1 ? "nights" : "night"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <User className="size-3" /> Quantity
            </p>
            <span>Person x {eachParams.participants}</span>
          </div>

          <Separator />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Total</p>
          <div className="flex items-center gap-2">
            <span className={cn("text-xl font-semibold")}>
              {formatPeso(+eachParams.totalPrice)}
            </span>
          </div>
        </CardFooter>
      </Card>
      <Card className="space-y-4">
        <div className="p-6">
          <div className="flex justify-between">
            <p className="text-slate-500">Subtotal</p>
            <span>{formatPeso(+eachParams.totalPrice)}</span>
          </div>

          <div className="flex justify-between text-xl">
            <p>Total</p>
            <span className="font-bold tracking-wide text-rose-500">
              {formatPeso(+eachParams.totalPrice)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
