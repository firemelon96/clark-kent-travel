"use client";
import { useActionState, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

export const PromoButton = () => {
  const addPromo = (prev: string | undefined, data: FormData) => {
    const promoCode = data.get("promo");

    if (promoCode === "promo") {
      return "You are eligible of promo";
    }
    console.log(prev);
  };

  const [showField, setShowField] = useState(false);
  const [message, formAction, isPending] = useActionState(addPromo, undefined);

  return (
    <div>
      {!showField && (
        <Button onClick={() => setShowField(true)} variant={"link"} size={"sm"}>
          Enter promo code
        </Button>
      )}
      {showField && (
        <form action={formAction} className="flex items-center gap-2">
          <Input name="promo" type="text" /> <Button size={"sm"}>Redeem</Button>
        </form>
      )}
      {message}
    </div>
  );
};
