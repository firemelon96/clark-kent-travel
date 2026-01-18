"use client";
import { useActionState, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { formatPeso } from "@/app/lib/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";

const coupons = {
  code: "CKANNIVERSARY",
  type: "percentage",
  value: 20,
  maxDiscount: 500,
  minBookingAmount: 3000,
  startDate: "2026-01-01",
  expiryDate: "2026-01-31",
  status: "active",
  description: "Celebrate our anniversary with a special discount!",
};

type Props = {
  name: string;
  type: string;
  from: Date;
  to: Date;
  participants: number;
  price: number;
};

export const DetailsCard = ({
  name,
  type,
  from,
  to,
  participants,
  price,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());
  // const totalPrice = searchParams.getAll();
  console.log(params);

  const addPromo = (prev: number | undefined, data: FormData) => {
    const promoCode = data.get("promo");

    let discPrice;

    if (promoCode === coupons.code && coupons.type === "percentage") {
      discPrice = price * (1 - coupons.value / 100);
      params.set("discountedPrice", discPrice.toString());

      router.replace(`${pathname}?${params.toString()}`);
    }
    return discPrice;
  };

  const discPrice = searchParams.get("discountedPrice");

  const [showField, setShowField] = useState(false);
  const [message, formAction, isPending] = useActionState(addPromo, undefined);

  return (
    <div className="w-full space-y-4 md:w-1/3">
      <Card>
        <CardHeader>
          {/* {isLoading ? (
                  <Skeleton className="h-5 w-full" />
                ) : (
                  <h1 className="font-semibold">{tour?.title}</h1>
                )} */}
          <h1 className="font-semibold">{name}</h1>
          <span className="text-slate-500">{type}</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex justify-between text-sm">
            <p className="text-slate-500">Date</p>
            <span>
              {format(from, "LLL dd, yyyy")} - {format(to, "LLL dd, yyyy")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-slate-500">Quantity</p>
            <span>Person x {participants}</span>
          </div>
          <Separator />
          <div>
            {!showField && (
              <Button
                onClick={() => setShowField(true)}
                variant={"link"}
                size={"sm"}
                className="pl-0"
              >
                Enter promo code
              </Button>
            )}
            {showField && !discPrice && (
              <form action={formAction} className="flex items-center gap-2">
                <Input name="promo" type="text" />{" "}
                <Button size={"sm"}>Redeem</Button>
              </form>
            )}
            {discPrice && (
              <span className="text-sm text-rose-500">
                {coupons.description}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Total</p>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "text-xl font-semibold",
                discPrice && "text-sm text-slate-500 line-through",
              )}
            >
              {formatPeso(price)}
            </span>
            {discPrice && (
              <span className="text-xl font-semibold">
                {formatPeso(Number(discPrice))}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
      <Card className="space-y-4">
        <div className="p-6">
          <div className="flex justify-between">
            <p className="text-slate-500">Subtotal</p>
            {!discPrice ? (
              <span>{formatPeso(price)}</span>
            ) : (
              <span>{formatPeso(Number(discPrice))}</span>
            )}
          </div>

          <div className="flex justify-between text-xl">
            <p>Total</p>
            {!discPrice ? (
              <span className="font-bold tracking-wide text-rose-500">
                {formatPeso(price)}
              </span>
            ) : (
              <span className="font-bold tracking-wide text-rose-500">
                {formatPeso(Number(discPrice))}
              </span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
