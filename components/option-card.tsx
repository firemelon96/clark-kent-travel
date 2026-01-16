"use client";

import { Car } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { BookOptionTour } from "./book-option-tour";
import { Pricing, pricingSchema } from "@/types/tour";
import z from "zod";
import { useState } from "react";
import useOptionStore from "@/hooks/use-option-store";

type Props = {
  name: string;
  pricing: z.infer<typeof pricingSchema>[];
  id: string;
};

export const OptionCard = ({ name, pricing, id }: Props) => {
  const { id: selectedId, setId } = useOptionStore();

  console.log(selectedId);

  return (
    <Card className="">
      <CardHeader>
        <span className="flex gap-2 text-xl font-medium">
          <Car /> {name}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col">
        {selectedId !== id && (
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

        {selectedId === id && (
          <BookOptionTour
            duration={1}
            tourId={id}
            tourPricing={pricing}
            service="transfer"
            title={name}
          />
        )}
      </CardContent>
    </Card>
  );
};
