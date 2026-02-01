"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import useOptionStore from "@/hooks/use-option-store";
import { MapIcon, MapPinCheck, MapPinIcon } from "lucide-react";
import { use } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { Options } from "./types/types";

type Props = {
  options: Options[];
};

export const Information = ({ options }: Props) => {
  const { id: selectedIti } = useOptionStore();

  const selectedOption = options.find((option) => option.iti === selectedIti);

  if (!selectedOption) {
    return (
      <div className="relative rounded-md bg-rose-50 px-4">
        <BiSolidLeftArrow className="absolute top-0 -left-4 hidden size-6 text-rose-50 md:block" />
        <div className="mt-2 h-40 py-4">
          <p className="text-slate-500">Select an option</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-5 rounded-md bg-rose-50 px-4">
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
                    <li key={item}>
                      <MapPinIcon className="mr-2 inline size-4" /> {item}
                    </li>
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
