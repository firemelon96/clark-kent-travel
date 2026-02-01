"use client";

import z from "zod";
import { Book, Car, Hotel, HotelIcon, MapIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { pricingSchema } from "@/types/tour";
import { Button } from "@/components/ui/button";
import useOptionStore from "@/hooks/use-option-store";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookForm } from "./book-form";
import { formatPeso } from "@/app/lib/helpers";
import { MapLocation } from "@/components/map-location";

type Props = {
  iti: string;
  name: string;
  price: number;
  duration: number;
  itineraries: {
    day: number;
    activities: string[];
  }[];
  id: string;
};

export const Options = ({
  iti,
  itineraries,
  duration,
  name,
  price,
  id,
}: Props) => {
  const { id: seletedIti, setId } = useOptionStore();

  const isVisible = seletedIti === iti;

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      divRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isVisible]);

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2">
          <HotelIcon className="size-6" />
          <span className="flex-1 text-xl font-medium"> {name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {itineraries.map((itinerary) => (
            <Badge
              variant={"outline"}
              key={itinerary.day}
              className="text-ellipsis"
            >
              <MapIcon className="" /> {itinerary.activities[0]}
            </Badge>
          ))}
        </div>
        {!isVisible && (
          <div className="flex items-center justify-between">
            <div className="leading-2">
              <p className="font-semibold">{formatPeso(price)}</p>
            </div>
            <Button onClick={() => setId(iti)}>Select</Button>
          </div>
        )}

        {isVisible && <hr className="my-4" />}

        {isVisible && (
          <div className="scroll-mt-80" ref={divRef}>
            <BookForm id={id} title={name} price={price} duration={duration} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
