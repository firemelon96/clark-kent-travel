"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  image: string;
  title: string;
  from: Date;
  to: Date;
  travellerType: string | null;
  status: string | null;
  invoiceUrl: string | null;
}

export const BookingCard = ({
  image,
  title,
  from,
  to,
  travellerType,
  status,
  invoiceUrl,
}: BookingCardProps) => {
  const isPaid = status === "Paid";
  return (
    <Card>
      <CardContent>
        <div className="flex gap-2">
          <div className="relative aspect-video h-24 overflow-hidden rounded-xl">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="line-clamp-1 text-xl font-semibold">{title}</h4>
            <span className="text-muted-foreground text-xs">
              {format(from, "MMM dd, yyyy")} to {format(to, "MMM dd, yyyy")}
            </span>{" "}
            <div className="flex gap-2">
              <Badge variant={isPaid ? "success" : "secondary"}>{status}</Badge>
              <Badge>{travellerType}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      {!isPaid && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant={"secondary"}>Cancel</Button>
          <Button onClick={() => (window.location.href = invoiceUrl || "")}>
            Pay now
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
