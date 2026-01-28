import { Ticket } from "lucide-react";
import { FireworksBackground } from "./animate-ui/components/backgrounds/fireworks";
import { CountdownBlocks } from "./countdown-block";
import { CopyText } from "./copy-text";

export const PromoBanner = () => {
  return (
    <div className="relative flex h-1/4 w-full flex-col items-center justify-between gap-4 overflow-hidden rounded-md bg-rose-200 p-4 lg:flex-row">
      <FireworksBackground className="absolute inset-0" />
      <div className="flex flex-col">
        <h1 className="text-xl">Celebrate our Anniversary using </h1>
        <CopyText text="CLARKKENT@12" />
        <p className="text-md">
          and get{" "}
          <span className="text-3xl font-bold tracking-wider text-rose-500">
            20%
          </span>{" "}
          Discount on selected local day tour!
        </p>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <span className="text-sm">Promo runs until:</span>
        <CountdownBlocks targetDate="2026-01-31T00:00:00+08:00" />
      </div>
    </div>
  );
};
