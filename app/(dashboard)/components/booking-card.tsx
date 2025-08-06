"use client";
import { cancelTour } from "@/actions/admin/cancel-tour";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useConfirmationStore from "@/hooks/use-confirmation-store";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface BookingCardProps {
  image: string;
  title: string;
  from: Date;
  to: Date;
  travellerType: string | null;
  status: string | null;
  invoiceUrl: string | null;
  bookingId: string;
}

export const BookingCard = ({
  image,
  title,
  from,
  to,
  travellerType,
  status,
  invoiceUrl,
  bookingId,
}: BookingCardProps) => {
  const { openConfirmation } = useConfirmationStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isPaid = status === "Paid";
  const isCanceled = status === "Canceled";
  const isExpired = status === "Expired";

  const onCancel = (bookingId: string) => {
    startTransition(async () => {
      const data = await cancelTour(bookingId);
      if (data.success) {
        toast.success(data.message);
      }
    });
  };

  return (
    <Card
      className={cn(
        "",
        isCanceled && "bg-secondary border-none shadow-none",
        isExpired && "bg-primary-foreground border-none shadow-none",
      )}
    >
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
              <Badge variant={"secondary"}>{travellerType}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
      {!isPaid && !isCanceled && !isExpired && (
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant={"secondary"}
            onClick={() => {
              openConfirmation({
                title: "Cancel this booking?",
                description: "Are you sure you? This cannot be undo.",
                cancelLabel: "No",
                actionLabel: "Yes",
                onAction() {
                  onCancel(bookingId);
                },
                onCancel() {
                  router.back();
                },
              });
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => (window.location.href = invoiceUrl || "")}
          >
            Pay now
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
