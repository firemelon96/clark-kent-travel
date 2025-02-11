import { Card } from "@/components/ui/card";
import Image from "next/image";
import { formatPeso } from "../app/lib/helpers";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  imageUrl: string;
  name?: string;
  price?: number | number[];
  className?: string;
  hasText?: boolean;
  description?: string;
  href?: string;
};

export const FeatureCard = ({
  className,
  imageUrl,
  name,
  price,
  hasText = false,
  description,
  href,
}: Props) => {
  const isArray = Array.isArray(price);
  return (
    <Card
      className={cn(
        "relative h-56 w-96 overflow-hidden rounded-md border transition-opacity duration-300 ease-in-out hover:border-rose-500",
        className,
      )}
    >
      {hasText && (
        <div className="absolute inset-0 bottom-0 z-10 p-4">
          <div className="flex h-full flex-col justify-between">
            <div>
              {name && (
                <h2 className="text-2xl font-semibold tracking-wide text-white">
                  {name}
                </h2>
              )}
              {description && <p className="text-white">{description}</p>}
              {price && (
                <p className="text-base text-slate-300">
                  {isArray ? formatPeso(price[0]) : formatPeso(price)}
                </p>
              )}
            </div>
            {href && (
              <div>
                <Button variant="secondary">Book Now</Button>
              </div>
            )}
          </div>
        </div>
      )}
      <Image src={imageUrl} fill alt="image" />
    </Card>
  );
};
