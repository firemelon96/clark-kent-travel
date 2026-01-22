"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "./ui/popover";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const MeetUpLocation = ({ pickUpUrl }: { pickUpUrl: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover>
      <PopoverTrigger
        className={cn("text-xs underline")}
        onClick={() => setOpen(!open)}
      >
        Meeting location
      </PopoverTrigger>
      <PopoverContent
        className="mr-2 w-80 overflow-hidden rounded-none p-1"
        align="start"
      >
        <iframe
          src={pickUpUrl}
          width="310"
          height="400"
          loading="lazy"
        ></iframe>
        <PopoverClose className="absolute top-4 right-5">
          <X />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
