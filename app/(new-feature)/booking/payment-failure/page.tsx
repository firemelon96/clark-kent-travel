import { buttonVariants } from "@/components/ui/button";
import { XCircleIcon } from "lucide-react";
import Link from "next/link";

const PaymentFailurePage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <XCircleIcon className="stroke-primary size-20" />
      <h1 className="text-primary text-4xl">
        Oops! Your payment wasn't successful.
      </h1>
      <p className="text-muted-foreground text-sm">
        Something went wrong with your booking's payment. Please try again or
        contact us for help.
      </p>
      <div className="flex gap-2">
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href={`/travel-and-tours`}
        >
          Try booking again
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
