"use client";

import { Car } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { BookOptionTour } from "./book-option-tour";
import { Pricing, pricingSchema } from "@/types/tour";
import z from "zod";
import { useEffect, useRef, useState } from "react";
import useOptionStore from "@/hooks/use-option-store";

type Props = {
  name: string;
  pricing: z.infer<typeof pricingSchema>[];
  id: string;
};

export const OptionCard = ({ name, pricing, id }: Props) => {
  const { id: selectedId, setId } = useOptionStore();

  const isVisible = selectedId === id;

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      divRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isVisible]);

  return (
    <Card className="">
      <CardHeader>
        <div className="flex gap-2">
          <Car className="size-6" />
          <span className="flex-1 text-xl font-medium"> {name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        {!isVisible && (
          <div className="flex items-center justify-between">
            <div className="leading-2">
              <p className="font-semibold">{pricing[0].price}</p>
              <span className="text-sm">
                {pricing[0].isGroupSize ? "Per Way/Van" : "Per Person"}
              </span>
            </div>
            <Button onClick={() => setId(id)}>Select</Button>
          </div>
        )}

        {isVisible && (
          <div className="scroll-mt-40" ref={divRef}>
            <BookOptionTour
              duration={1}
              tourId={id}
              tourPricing={pricing}
              service="transfer"
              title={name}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
