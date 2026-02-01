"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { formatPeso } from "@/app/lib/helpers";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { useUrlParams } from "@/hooks/use-url-params";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type Props = {
  name: string;
};

export const DetailsCard = ({ name }: Props) => {
  const { eachParams } = useUrlParams();

  return (
    <div className="w-full space-y-4 md:w-1/3">
      <Card>
        <CardHeader>
          <h1 className="font-semibold">{name}</h1>
          <span className="text-slate-500">{eachParams.type}</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex justify-between text-sm">
            <p className="text-slate-500">Date</p>
            <span>{eachParams.date}</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-slate-500">Quantity</p>
            <span>Person x {eachParams.participants}</span>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Total</p>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xl font-semibold",
                eachParams.discountedPrice &&
                  "text-sm text-slate-500 line-through",
              )}
            >
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
            <p className="text-slate-500">Total</p>

            <span className="font-bold tracking-wide text-rose-500">
              {formatPeso(+eachParams.totalPrice)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
