"use client";

import z from "zod";
import { Car } from "lucide-react";
import { useEffect, useRef } from "react";
import { pricingSchema } from "@/types/tour";
import { Button } from "@/components/ui/button";
import useOptionStore from "@/hooks/use-option-store";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  iti: string;
  name: string;
  price: number;
};

export const Options = ({ iti, name, price }: Props) => {
  const { id: seletedIti, setId } = useOptionStore();

  const isVisible = seletedIti === iti;

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
              <p className="font-semibold">{price}</p>
              {/* <span className="text-sm">
                {pricing[0].isGroupSize ? "Per Way/Van" : "Per Person"}
              </span> */}
            </div>
            <Button onClick={() => setId(iti)}>Select</Button>
          </div>
        )}

        {/* {isVisible && (
          <div className="scroll-mt-40" ref={divRef}>
            <BookOptionTransfer
              duration={1}
              id={id}
              pricing={pricing}
              title={name}
              pickUpLocation={pickUpLocation}
              shareLink={shareLink}
            />
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};
