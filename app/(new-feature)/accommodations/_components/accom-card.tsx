import { formatPeso } from "@/app/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Price = {
  currency: string;
  baseRate: number;
  extraPersonCharge: number;
};

interface AccomProps {
  id: string;
  imageUrl: string;
  title: string;
  rooms?: {
    roomId: string;
    type: string;
    description: string;
    maxOccupancy: number;
    bedType: string;
    pricing: {
      currency: string;
      baseRate: number;
      extraPersonCharge: number;
    };
  }[];
}

export const AccomCard = ({ id, imageUrl, title, rooms }: AccomProps) => {
  const price = rooms?.[0].pricing.baseRate;

  return (
    <Link href={`/accommodations/${id}`}>
      <Card className="h-full overflow-hidden border-sky-600 shadow-none">
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
            <div className="flex gap-2">
              <Badge variant={"secondary"}>{formatPeso(price || 0)}</Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
