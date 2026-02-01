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
import { addDays, format } from "date-fns";
import { CalendarIcon, Info, Loader2Icon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { formatPeso } from "@/app/lib/helpers";
import { toast } from "sonner";
import {
  landArrangementOptionSchema,
  pricingSchema,
  transferOptionSchema,
} from "@/types/tour";
import { MapLocation } from "@/components/map-location";
import useOptionStore from "@/hooks/use-option-store";
import { MeetUpLocation } from "@/components/meet-up-location";
import { Options } from "./types/types";
import { DateRange } from "react-day-picker";
import { Dialog } from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  id: string;
  duration: number;
  price: number;
  title?: string;
  pickUpLocation?: string;
  shareLink?: string;
};

export const BookForm = ({
  id,
  price,
  title,
  pickUpLocation,
  duration,
}: Props) => {
  const { onClose } = useOptionStore();

  const router = useRouter();
  const [openDate, setOpenDate] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof landArrangementOptionSchema>>({
    resolver: zodResolver(landArrangementOptionSchema),
    defaultValues: {
      dateRange: {
        from: undefined,
        to: undefined,
      },
      participants: 2,
      totalPrice: 0,
    },
  });

  const participants = form.watch("participants");

  //   const minForType = Math.min(
  //     ...pricing.filter((t) => type === t.type).map((t) => t.minGroupSize),
  //   );

  //   if (participants > maxForType) {
  //     form.setValue("participants", maxForType, { shouldValidate: true });
  //   }

  useEffect(() => {
    if (participants > 12) {
      form.setValue("participants", 12, { shouldValidate: true });
    }

    const totalPrice = participants * price;
    form.setValue("totalPrice", totalPrice, { shouldValidate: true });
  }, [participants, price, form.setValue]);

  const onSubmit = (values: z.infer<typeof landArrangementOptionSchema>) => {
    const { participants, totalPrice, dateRange } = values;

    // if (!pickUpLocation && mapLink === "") {
    //   toast.error("Please select a location on the map");
    //   return;
    // }

    const url = qs.stringifyUrl(
      {
        url: "/land-arrangements/booking",
        query: {
          id,
          date: `${format(dateRange.from, "MMM dd, eee")} to ${format(
            dateRange.to,
            "MMM dd, eee",
          )}`,
          participants,
          totalPrice,
          title,
          price,
          duration,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <Form {...form}>
      <form
        id="booking-option"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full -scroll-mt-96 space-y-4"
      >
        {/* {pickUpLocation ? (
          <MeetUpLocation pickUpUrl={pickUpLocation} />
        ) : (
          <MapLocation setMaplink={setMapLink} />
        )} */}
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Select Date</FormLabel>
                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <FormControl className="">
                      <Button
                        variant="default"
                        className={cn(
                          "w-full pl-3 text-left font-normal md:w-60",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value?.from ? (
                          field.value.to &&
                          field.value.to.getTime() ===
                            field.value.from.getTime() ? (
                            format(field.value.from, "LLL dd, y")
                          ) : (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          )
                        ) : (
                          <span>Pick a desired date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={(field.value as DateRange) || undefined}
                      onDayClick={(day) => {
                        const range: DateRange = {
                          from: day,
                          to: addDays(day, duration - 1),
                        };

                        field.onChange(range);
                        setOpenDate(false);
                      }}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date() ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription
                  className={form.formState.errors.dateRange && "text-rose-500"}
                >
                  Select date that is available
                </FormDescription>
              </FormItem>
            );
          }}
        />

        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <div className="flex items-center rounded-lg border p-4">
            <span>Participants</span>{" "}
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="ml-2 size-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>Minimum of 2 participants</p>
              </TooltipContent>
            </Tooltip>
            <div className="ml-auto flex flex-col-reverse items-center gap-2 md:flex-row">
              <span className="text-sm text-slate-500">
                {formatPeso(price)}
              </span>
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            field.onChange(Math.max(2, field.value - 1))
                          }
                          disabled={field.value <= 2}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease participants</span>
                        </Button>
                        <Input
                          {...field}
                          type="text"
                          readOnly
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                          className="w-11 border-none text-center shadow-none"
                          min={1}
                          max={2}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          disabled={participants === 12}
                          onClick={() => {
                            field.onChange(Math.min(12, field.value + 1));
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase participants</span>
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md bg-slate-50 p-4">
              <FormLabel className="font-light">Total Price</FormLabel>

              <Label className="p-2 text-xl font-medium">
                {formatPeso(field.value)}
              </Label>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          {/* Make this persist in localstorage when saved */}
          {id && (
            <Button onClick={() => onClose()} variant="secondary" type="button">
              Close
            </Button>
          )}
          <Button variant="default" className="">
            {isPending && <Loader2Icon />}{" "}
            {isPending ? "Loading..." : "Reserve now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
