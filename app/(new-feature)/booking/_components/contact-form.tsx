"use client";

import { Book } from "@/actions/book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { createXenditPayment } from "@/lib/xendit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormValues = z.infer<typeof contactFormSchema>;

export const contactFormSchema = z.object({
  contactName: z.string().min(1, { message: "Name is required" }),
  contactEmail: z.string().email(),
  contactNumber: z.string().min(1, { message: "Contact is required" }),
});

interface Props {
  tourId: string;
  totalPrice: number;
  participants: number;
  tourName: string;
}

export const ContactForm = ({
  tourId,
  tourName,
  totalPrice,
  participants,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      contactNumber: "",
    },
  });

  //   const onSubmit = (values: FormValues) => {
  //     onHandleSubmit(values);
  //   };

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    const newValues = { ...values, tourId, participants, totalPrice, tourName };

    startTransition(() => {
      Book(newValues)
        .then((data) => {
          if (!data) return;

          window.location.href = data.invoice_url;
        })
        .catch(() => console.log("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    // disabled={disabled}
                    {...field}
                    placeholder="John Doe"
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    // disabled={disabled}
                    placeholder="johnDoe@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={disabled}
                    placeholder="09xx-xxx-xxxx"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <span className="text-sm text-slate-700">
            By continuing, you acknowledge and agree to Terms of use and Privacy
            policy
          </span>
        </div>

        <Separator />

        <div>
          <Badge variant="secondary" className="text-xs">
            Once your info is submitted, it cannot be changed. Please
            double-check before proceeding.
          </Badge>
        </div>

        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <p className="max-w-sm text-xs">
            Your booking will be submitted once you go to payment. You can
            choose your payment method in the next step.
          </p>
          <Button disabled={isPending}>
            {isPending ? "Please wait..." : "Proceed to payment"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
