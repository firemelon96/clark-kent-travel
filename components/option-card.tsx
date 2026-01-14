"use client";

import { Car } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { BookOptionTour } from "./book-option-tour";
import { Pricing, pricingSchema } from "@/types/tour";
import z from "zod";
import { useState } from "react";

type Props = {
  name: string;
  pricing: z.infer<typeof pricingSchema>[];
  id: string;
};

export const OptionCard = ({ name, pricing, id }: Props) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Card className="">
      <CardHeader>
        <span className="flex gap-2 text-xl font-medium">
          <Car /> {name}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col">
        {!showForm && (
          <div className="flex items-center justify-between">
            <div className="leading-2">
              <p className="font-semibold">{pricing[0].price}</p>
              <span className="text-sm">Per way</span>
            </div>
            <Button onClick={() => setShowForm((v) => !v)}>Select</Button>
          </div>
        )}
        {showForm && (
          <BookOptionTour
            setShowForm={setShowForm}
            duration={1}
            tourId={id}
            tourPricing={pricing}
          />
        )}
      </CardContent>
    </Card>
  );
};
