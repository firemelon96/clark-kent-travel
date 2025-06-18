import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2Icon, CheckIcon } from "lucide-react";
import Link from "next/link";

const SuccessPage = async () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <CheckCircle2Icon className="stroke-primary size-20" />
      <h1 className="text-primary text-4xl">Thank you for your booking!</h1>
      <p className="text-muted-foreground text-sm">
        Your booking is being processed. You will receive a confirmation email
        once we verify your payment.
      </p>
      <div className="flex gap-2">
        <Link className={buttonVariants()} href={`/dashboard`}>
          Back to profile
        </Link>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={`/travel-and-tours`}
        >
          See more tours
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
