import { Stepper } from "@/components/stepper";
import { buttonVariants } from "@/components/ui/button";
import { CheckCircle2Icon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SuccessPage = async () => {
  return (
    <section className="mx-auto max-w-5xl space-y-5 py-10">
      <Stepper isSucces />
      <div className="my-10 flex flex-col items-center justify-center gap-4 text-center">
        <CheckCircle2Icon className="stroke-primary size-20" />
        <h1 className="text-primary text-4xl">Thank you for your booking!</h1>
        <p className="text-muted-foreground text-sm">
          Your booking is confirmed. You will receive an email for payment
          instructions and further details. <br /> Please refer to the bank
          details below for your payment. <br /> Once payment is made, kindly
          send us a screenshot of the transaction.
        </p>
        <Image
          src="https://cdn.palawanwebsolutions.com/bank-details.png"
          alt="Bank details"
          width={500}
          height={300}
          unoptimized
        />
        <div className="flex gap-2">
          <Link className={buttonVariants()} href={`/`}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessPage;
