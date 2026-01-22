"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PhoneInput from "react-phone-number-input";
import { toast } from "sonner";
import { format } from "date-fns";
import { useUrlParams } from "@/hooks/use-url-params";
import { TransferReserve } from "@/actions/tranfer-reservation";

export const contactFormSchema = z.object({
  contactName: z.string().min(1, { message: "Name is required" }),
  contactEmail: z.string().email(),
  contactNumber: z.string().refine(
    (value) => {
      const phoneNumber = parsePhoneNumberFromString(value || "");

      return phoneNumber?.isValid;
    },
    { message: "Invalid phone number" },
  ),
});

export const ContactDetailForm = () => {
  const { eachParams, router } = useUrlParams();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactName: "",
      contactEmail: "",
      contactNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    const newValues = {
      name: values.contactName,
      email: values.contactEmail,
      number: values.contactNumber,
      total: +eachParams.totalPrice,
      date: `${format(new Date(eachParams.date), "EEEE, MMM d")}`,
      count: +eachParams.participants,
      type: eachParams.type,
      title: eachParams.title,
      location: eachParams.location,
      time: eachParams.time,
    };

    startTransition(() => {
      TransferReserve(newValues)
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            form.reset();
            router.push("/booking/success");
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
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
                    disabled={isPending}
                    {...field}
                    placeholder="John Doe"
                    className=""
                  />
                </FormControl>
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
                    disabled={isPending}
                    placeholder="johnDoe@example.com"
                  />
                </FormControl>
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
                  <PhoneInput
                    disabled={isPending}
                    {...field}
                    international
                    defaultCountry="PH"
                    placeholder="e.g. 09171234567"
                    className="[&>input]:border-input [&>input]:bg-background [&>input]:placeholder:text-muted-foreground [&>input]:focus-visible:ring-ring w-full [&>input]:w-full [&>input]:rounded-md [&>input]:border [&>input]:px-3 [&>input]:py-2 [&>input]:text-sm [&>input]:shadow-xs [&>input]:focus-visible:ring-1 [&>input]:focus-visible:outline-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div>
          <span className="text-sm text-slate-700">
            By continuing, you acknowledge and agree to Terms and Privacy policy
          </span>
        </div>

        <Separator />

        <div>
          <Badge variant="secondary" className="text-xs">
            An email receipt will be sent to you.
          </Badge>
        </div>

        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <p className="max-w-sm text-xs">
            Your booking will be submitted once to our system. Please review all
            details before confirming.
          </p>
          <Button disabled={isPending}>
            {isPending ? "Please wait..." : "Confirm Reservation"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
