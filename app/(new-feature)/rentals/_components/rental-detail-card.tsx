"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPeso } from "@/app/lib/helpers";
import { useUrlParams } from "@/hooks/use-url-params";
import { Calendar1, CalendarClock, Clock1, User } from "lucide-react";

export const RentalDetailCard = () => {
  const { eachParams, params } = useUrlParams();

  const extras = params.getAll("extra");

  return (
    <div className="w-full space-y-4 md:w-1/3">
      <Card>
        <CardHeader>
          <h1 className="font-semibold">{eachParams.title}</h1>
          <span className="text-sm">{eachParams.duration} rental</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <Calendar1 className="size-3" /> Start
            </p>
            <span>{eachParams.startDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <CalendarClock className="size-3" /> End
            </p>
            <span>{eachParams.returnDate}</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <Clock1 className="size-3" /> Duration
            </p>
            <span>{eachParams.duration}</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="flex items-center gap-2 text-slate-500">
              <User className="size-3" /> Quantity
            </p>
            <span>Person x {eachParams.participantCount}</span>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex flex-col gap-1">
          <div className="flex w-full flex-col items-end justify-end gap-1">
            <span className="text-xs text-slate-500">
              {eachParams.additionalHour}
            </span>
          </div>
          {extras.length > 0 && (
            <div className="flex w-full flex-col items-end justify-end gap-1">
              {extras.map((e) => (
                <span key={e} className="text-xs text-slate-500">
                  {e}
                </span>
              ))}
            </div>
          )}
          <div className="flex w-full flex-col items-end justify-end gap-1">
            <span className="text-xs text-slate-500">{eachParams.price}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-sm text-slate-500">Total</p>
            <div className="flex items-center gap-2">
              <span className={cn("text-xl font-semibold")}>
                {formatPeso(+eachParams.totalPrice)}
              </span>
            </div>
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
