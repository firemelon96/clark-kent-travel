import { Dot } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";

interface Props {
  itineraries?: { name: string; activities: string[] }[];
  items?: string[];
  label?: string;
  isContent?: boolean;
}

export const ReusableAccordion = ({
  itineraries,
  items,
  label,
  isContent = false,
}: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item" className="border-rose-200">
        <AccordionTrigger className="hover:no-underline">
          <Badge
            variant={isContent ? "outline-solid" : "destructive"}
            className={`uppercase ${isContent && "border-rose-500 text-rose-500"}`}
          >
            {label}
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-2">
            {itineraries?.map((itinerary) => (
              <ReusableAccordion
                key={itinerary.name}
                label={itinerary.name}
                items={itinerary.activities}
                isContent
              />
            ))}
          </div>
          <ul className="pl-2">
            {items &&
              items.map((item) => (
                <li key={item} className="flex gap-2 text-slate-700">
                  <Dot /> <span className="flex-1">{item}</span>
                </li>
              ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
