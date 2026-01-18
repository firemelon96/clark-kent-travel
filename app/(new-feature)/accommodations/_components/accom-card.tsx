import { formatPeso } from "@/app/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { pricingSchema } from "@/types/tour";
import Image from "next/image";
import Link from "next/link";
import z from "zod";

interface AccomProps {
  id: string;
  imageUrl: string;
  title: string;
  pricing: z.infer<typeof pricingSchema>[];
  location: string;
  maxPax: number;
}

export const AccomCard = ({
  id,
  imageUrl,
  title,
  pricing,
  location,
  maxPax,
}: AccomProps) => {
  return (
    <Link href={`/accommodations/${id}`}>
      <div className="flex w-full flex-col gap-2 overflow-hidden rounded-md border border-sky-500 bg-white shadow-xs hover:shadow-md hover:shadow-rose-500">
        <div className="flex flex-col">
          <div className="relative h-48 w-full">
            <Image
              unoptimized
              src={imageUrl}
              fill
              alt={id}
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div>
              <h1 className="text-xl leading-none font-medium">{title}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={"secondary"}>
                {formatPeso(pricing[0].price)}
              </Badge>
              <Badge variant={"secondary"}>Maximum of {maxPax} Pax</Badge>
              <Badge variant={"secondary"}>{location}</Badge>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
