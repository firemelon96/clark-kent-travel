"use client";
import qs from "query-string";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

const BookingSchema = z.object({
  date: z.date(),
  totalPrice: z.number(),
  time: z.string(),
  extra: z.number().array(),
});

type Extras = {
  name: string;
  pricePerDay?: number;
  pricePerHour?: number;
  pricePerPerson?: number;
};

interface Props {
  rentId: string;
  pricePerDay: number;
  extras: Extras[];
}

const timeSlots = ["1:00 PM", "3:00 PM"];

export const RentalBookingOptions = ({
  rentId,
  pricePerDay,
  extras,
}: Props) => {
  const [price, setPrice] = useState(0);
  const [openDate, setOpenDate] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      date: undefined,
      totalPrice: pricePerDay,
      time: "",
      extra: [],
    },
  });

  const date = form.watch("date");

  const onSubmit = (values: z.infer<typeof BookingSchema>) => {
    console.log(values);
    // const { participants, totalPrice, pricingType, date, time } = values;

    // const url = qs.stringifyUrl(
    //   {
    //     url: "/booking",
    //     query: {
    //       rentId,
    //       date: format(date, "yyyy-MM-dd"),
    //       participants,
    //       totalPrice,
    //       pricingType,
    //     },
    //   },
    //   { skipNull: true, skipEmptyString: true },
    // );

    // router.push(url);
  };

  return (
    <Form {...form}>
      <form
        id="booking-option"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Travel Date</FormLabel>
                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="ckBtn"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-white",
                        )}
                      >
                        {field.value ? (
                          <span>{format(field.value, "LLL dd, y")}</span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      onSelect={(date) => field.onChange(date)}
                      selected={field.value}
                      disabled={(date) =>
                        date < new Date() ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription
                  className={form.formState.errors.date && "text-rose-500"}
                >
                  Select Date and Time {form.formState.errors.date?.message}
                </FormDescription>
              </FormItem>
            );
          }}
        />

        {date && (
          <FormField
            name="time"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Time</FormLabel>
                <FormControl>
                  <div className="flex w-fit gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        onClick={() => {
                          field.onChange(time);
                        }}
                        type="button"
                        variant={field.value === time ? "ckBtn" : "secondary"}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          name="extra"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extras</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {extras.map((extra) => (
                    <Button
                      key={extra.name}
                      onClick={() => {
                        field.onChange(
                          field.value.some(
                            (v) =>
                              v === extra.pricePerDay ||
                              v === extra.pricePerPerson,
                          )
                            ? field.value.filter(
                                (v) =>
                                  v !== extra.pricePerDay &&
                                  v !== extra.pricePerPerson,
                              )
                            : [
                                extra.pricePerDay || extra.pricePerPerson,
                                ...field.value,
                              ],
                        );
                      }}
                      type="button"
                      variant={
                        field.value.some(
                          (v) =>
                            v === extra.pricePerDay ||
                            v === extra.pricePerPerson,
                        )
                          ? "ckBtn"
                          : "secondary"
                      }
                    >
                      {extra.name} {extra.pricePerDay || extra.pricePerPerson}
                    </Button>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md bg-slate-50 p-4">
              <FormLabel className="font-light">Total Price</FormLabel>

              <Label className="p-2 text-xl font-medium">{field.value}</Label>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="secondary" type="button">
            Save
          </Button>
          <Button variant="ckBtn">Book now</Button>
        </div>
      </form>
    </Form>
  );
};
