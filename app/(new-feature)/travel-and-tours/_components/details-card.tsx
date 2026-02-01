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

const coupons = {
  code: "CLARKKENT@12",
  type: "percentage",
  eligible: {
    type: "day tour",
    location: ["El Nido", "Puerto Princesa"],
  },
  value: 20,
  maxDiscount: 500,
  minBookingAmount: 3000,
  startDate: "2026-02-01",
  expiryDate: "2026-02-28",
  status: "active",
  description: "Celebrate our anniversary with a special discount!",
};

type Props = {
  name: string;
};

export const DetailsCard = ({ name }: Props) => {
  const [showField, setShowField] = useState(false);

  const { pathname, router, eachParams, params } = useUrlParams();

  const addPromo = (prev: any, data: FormData) => {
    const promoCode = data.get("promo");

    if (promoCode === null || promoCode === "") {
      return "Please enter a promo code.";
    }

    if (promoCode !== coupons.code) {
      return "Invalid promo code.";
    }

    const isEligible =
      coupons.eligible.location.some((loc) => loc === eachParams.location) &&
      coupons.eligible.type === eachParams.serviceType;

    if (!isEligible) {
      return "This tour is not eligible of discount.";
    }

    const isExpired = new Date(coupons.expiryDate).getTime() < Date.now();

    if (isExpired) {
      return "Promo already expired.";
    }

    if (promoCode === coupons.code && coupons.type === "percentage") {
      const discountedPrice =
        +eachParams.totalPrice * (1 - coupons.value / 100);
      params.set("discountedPrice", discountedPrice.toString());

      router.replace(`${pathname}?${params.toString()}`);
    }

    return "Enjoy our anniversary with 20% discount";
  };

  const [message, formAction, isPending] = useActionState(addPromo, undefined);

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
            <span>
              {format(eachParams.from, "LLL dd, yyyy")} -{" "}
              {format(eachParams.to, "LLL dd, yyyy")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-slate-500">Quantity</p>
            <span>Person x {eachParams.participants}</span>
          </div>
          <Separator />
          <div>
            {!showField && !eachParams.discountedPrice && (
              <Button
                onClick={() => setShowField(true)}
                variant={"link"}
                size={"sm"}
                className="pl-0"
              >
                Enter promo code
              </Button>
            )}
            {showField && !eachParams.discountedPrice && (
              <form action={formAction} className="flex items-center gap-2">
                <Input name="promo" type="text" />{" "}
                <Button size={"sm"}>Redeem</Button>
              </form>
            )}
            <span className="text-sm text-rose-500">{message}</span>
          </div>
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
            {eachParams.discountedPrice && (
              <span className="text-xl font-semibold">
                {formatPeso(Number(eachParams.discountedPrice))}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
      <Card className="space-y-4">
        <div className="p-6">
          <div className="flex justify-between">
            <p className="text-slate-500">Subtotal</p>
            {!eachParams.discountedPrice ? (
              <span>{formatPeso(+eachParams.totalPrice)}</span>
            ) : (
              <span>{formatPeso(Number(eachParams.discountedPrice))}</span>
            )}
          </div>

          <div className="flex justify-between text-xl">
            <p>Total</p> {isPending && "loading..."}
            {!eachParams.discountedPrice ? (
              <span className="font-bold tracking-wide text-rose-500">
                {formatPeso(+eachParams.totalPrice)}
              </span>
            ) : (
              <span className="font-bold tracking-wide text-rose-500">
                {formatPeso(Number(eachParams.discountedPrice))}
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
