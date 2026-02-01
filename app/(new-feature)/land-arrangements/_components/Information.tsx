"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import useOptionStore from "@/hooks/use-option-store";
import { use } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";

type Options = {
  name: string;
  iti: string;
  price: number;
  itineraries: {
    day: number;
    activities: string[];
  }[];
};

type Props = {
  options: Options[];
};

export const Information = ({ options }: Props) => {
  const { id: selectedIti } = useOptionStore();

  const selectedOption = options.find((option) => option.iti === selectedIti);

  return (
    <div className="relative rounded-md bg-rose-50 px-4">
      <BiSolidLeftArrow className="absolute top-0 -left-4 hidden size-6 text-rose-50 md:block" />
      <div>
        <Accordion
          type="single"
          collapsible
          className="mt-2 w-full"
          defaultValue="1"
        >
          {selectedOption?.itineraries.map((itinerary) => (
            <AccordionItem key={itinerary.day} value={itinerary.day.toString()}>
              <AccordionTrigger className="hover:no-underline">
                <Badge>Day {itinerary.day}</Badge>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 px-4 text-balance">
                <ul>
                  {itinerary.activities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
