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
import {
  add,
  differenceInDays,
  differenceInHours,
  format,
  parse,
} from "date-fns";
import { CalendarIcon, Info, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn, generateTimeSlots } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPeso } from "@/app/lib/helpers";

const BookingSchema = z.object({
  pickup: z.object({
    date: z.date(),
    time: z.string(),
  }),
  return: z.object({
    date: z.date(),
    time: z.string(),
  }),
  extra: z.array(
    z.object({
      name: z.string(),
      price: z.number(),
    }),
  ),
  participants: z.number(),
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
  pricePerHour: number;
  minDuration: number;
  maxDuration: number;
  isHourMinDuration: boolean;
  isDayMaxDuration: boolean;
}

const timeSlots = generateTimeSlots();

const MAX_HOURS_COUNT = 24;
const MAX_DAYS_COUNT = 30;

export const RentalBookingOptions = ({
  rentId,
  pricePerDay,
  extras,
  pricePerHour,
  minDuration,
  maxDuration,
  isDayMaxDuration,
  isHourMinDuration,
}: Props) => {
  const [totalPrice, setTotalPrice] = useState(pricePerDay);
  const [openDate, setOpenDate] = useState(false);
  // const [dayCount, setDayCount] = useState();
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      pickup: { date: undefined, time: undefined },
      return: { date: undefined, time: undefined },
      extra: [],
      participants: 1,
    },
  });

  const pickupDate = form.watch("pickup.date");
  const returnDate = form.watch("return.date");

  const startTime = form.watch("pickup.time");
  const endTime = form.watch("return.time");

  const selectedExtra = form.watch("extra");
  const participants = form.watch("participants");

  const dayCount = differenceInDays(returnDate, pickupDate) + 1 || 0;

  // const reducedPrice = selectedExtra.reduce(
  //   (sum, extra) => sum + extra.price,
  //   totalPrice,
  // );

  const availableEndTimes = startTime
    ? timeSlots.filter(
        (time) =>
          parse(time, "h:mm a", new Date()) >
          parse(startTime, "h:mm a", new Date()),
      )
    : timeSlots;

  const hourCount = Number(
    startTime &&
      endTime &&
      differenceInHours(
        parse(endTime, "h:mm a", new Date()),
        parse(startTime, "h:mm a", new Date()),
      ),
  );

  // Calculate hours and charge when end time is selected
  // const calculateCharge = (selectedEndTime: string) => {
  //   if (dayCount === 0) {
  //     if (startTime) {
  //       const startDate = parse(startTime, "h:mm a", new Date());
  //       const endDate = parse(selectedEndTime, "h:mm a", new Date());
  //       const hoursDiff = differenceInHours(endDate, startDate);

  //       // Reset charge if total hours is exactly BASE_HOURS
  //       const extraHours = Math.max(0, hoursDiff - minDuration);
  //       const extraCharge = extraHours > 0 ? extraHours * pricePerHour : 0;

  //       setTotalPrice(pricePerDay + extraCharge);
  //     } else {
  //       setTotalPrice(pricePerDay);
  //     }
  //   } else {
  //     setTotalPrice(pricePerDay);
  //   }
  // };

  // useEffect(() => {
  //   if (pickupDate && (!returnDate || returnDate < pickupDate)) {
  //     form.setValue("return.date", pickupDate);
  //   }

  //   if (pickupDate && !startTime) {
  //     form.setValue("pickup.time", "8:00 AM");
  //   }

  //   if (startTime) {
  //     const pickupIndex = timeSlots.indexOf(startTime);
  //     if (pickupIndex !== -1) {
  //       const newReturnTime =
  //         timeSlots[pickupIndex + minDuration] ||
  //         timeSlots[timeSlots.length - 1];
  //       if (!endTime || timeSlots.indexOf(endTime) <= pickupIndex) {
  //         form.setValue("return.time", newReturnTime);
  //       }
  //     }
  //   }

  //   let total = pricePerDay;

  //   if (selectedExtra?.length) {
  //     const reducedPrice = selectedExtra.reduce(
  //       (sum, extra) => sum + extra.price,
  //       0,
  //     );
  //     total += reducedPrice;
  //   }

  //   let extraCharge = 0;
  //   if (startTime && endTime) {
  //     const startDate = parse(startTime, "h:mm a", new Date());
  //     const endDate = parse(endTime, "h:mm a", new Date());
  //     const hoursDiff = differenceInHours(endDate, startDate);

  //     // Reset charge if total hours is exactly BASE_HOURS
  //     const extraHours = Math.max(0, hoursDiff - minDuration);
  //     extraCharge = extraHours > 0 ? extraHours * pricePerHour : 0;
  //   }

  //   if (dayCount > 1) {
  //     total *= dayCount;
  //   } else {
  //     total += extraCharge;
  //   }

  //   setTotalPrice(total);
  // }, [
  //   pickupDate,
  //   selectedExtra,
  //   startTime,
  //   endTime,
  //   pricePerDay,
  //   minDuration,
  //   dayCount,
  //   pricePerHour,
  //   returnDate,
  // ]);

  useEffect(() => {
    setError(null);

    if (pickupDate) {
      // Ensure return date is at least pickup date
      if (!returnDate || returnDate < pickupDate) {
        form.setValue("return.date", pickupDate);
      }

      // Set default pickup time to 8:00 AM if not selected
      if (!startTime) {
        form.setValue("pickup.time", "8:00 AM");
      }
    }

    if (startTime) {
      const pickupIndex = timeSlots.indexOf(startTime);
      if (pickupIndex !== -1) {
        const suggestedReturnTime =
          timeSlots[pickupIndex + minDuration] ||
          timeSlots[timeSlots.length - 1];

        // Ensure return time is valid
        if (!endTime || timeSlots.indexOf(endTime) <= pickupIndex) {
          form.setValue("return.time", suggestedReturnTime);
        }
      }
    }

    // Calculate total price
    let total =
      pricePerDay +
      (selectedExtra?.reduce((sum, extra) => sum + extra.price, 0) || 0);

    if (startTime && endTime) {
      const startDate = parse(startTime, "h:mm a", new Date());
      const endDate = parse(endTime, "h:mm a", new Date());
      const hoursDiff = differenceInHours(endDate, startDate);

      // Determine if maxDuration should be in days or hours
      const isDayBased =
        dayCount > 1 &&
        maxDuration > MAX_HOURS_COUNT &&
        maxDuration === MAX_DAYS_COUNT;
      const isHourBased = maxDuration <= MAX_HOURS_COUNT;

      // Error: If maxDuration is in hours but dayCount > 1
      if (isHourBased) {
        if (dayCount > 1) {
          setError("For hourly rentals, you cannot book for multiple days.");
        }
        if (hoursDiff > maxDuration) {
          setError(`Maximum rental duration is ${maxDuration} hours.`);
        }
      }

      if (hoursDiff < minDuration) {
        setError(`Minimum rental is ${minDuration} hours.`);
      }

      // Error: If maxDuration is in days but duration exceeds allowed max days
      if (isDayBased && dayCount > MAX_DAYS_COUNT) {
        setError(`You cannot book for more than ${MAX_DAYS_COUNT} days.`);
      }

      // Extra charge only applies for single-day rentals
      if (isDayBased) {
        total *= dayCount; // Multiply price for multi-day rentals
      } else {
        const extraHours = Math.max(0, hoursDiff - minDuration);
        total += extraHours * pricePerHour;
      }
    }

    setTotalPrice(total);
  }, [
    pickupDate,
    returnDate,
    startTime,
    endTime,
    selectedExtra,
    pricePerDay,
    minDuration,
    dayCount,
    pricePerHour,
    maxDuration,
  ]);

  const onSubmit = (values: z.infer<typeof BookingSchema>) => {
    if (error) return;

    console.log(selectedExtra, values);
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
        {/* date and time select */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center">
            <FormField
              control={form.control}
              name="pickup.date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-500">Pickup Date</FormLabel>
                  <Popover open={openDate} onOpenChange={setOpenDate}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="ckBtn"
                          className={cn(
                            "w-36 rounded-br-none rounded-tr-none pl-3 text-left font-normal",
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
                </FormItem>
              )}
            />
            <FormField
              name="pickup.time"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="line-clamp-none text-slate-500">
                    Time
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-32 rounded-bl-none rounded-tl-none border-rose-500 bg-rose-500 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem value={time} key={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* return fields */}
          <div className="flex items-center">
            <FormField
              control={form.control}
              name="return.date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-slate-500">Return Date</FormLabel>
                  <Popover
                    open={openReturnDate}
                    onOpenChange={setOpenReturnDate}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="ckBtn"
                          className={cn(
                            "w-36 rounded-br-none rounded-tr-none pl-3 text-left font-normal",
                            !field.value && "text-white",
                          )}
                        >
                          {field.value ? (
                            <span>{format(field.value, "LLL dd, y")}</span>
                          ) : (
                            <span>Return date</span>
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
                          date < pickupDate ||
                          date.getDay() === 0 ||
                          date.getDay() === 6
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              name="return.time"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="line-clamp-none text-slate-500">
                    Time
                  </FormLabel>
                  <Select
                    onValueChange={(time) => {
                      field.onChange(time);
                      // calculateCharge(time);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-32 rounded-bl-none rounded-tl-none border-rose-500 bg-rose-500 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableEndTimes.map((time) => (
                        <SelectItem value={time} key={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 p-2 text-rose-500">
            <p>{error}</p>
          </div>
        )}

        {/* number of participants */}
        <div>
          <p>Quantity</p>
          <div className="flex items-center rounded-lg border p-4">
            <span>Participants</span>
            <div className="ml-auto flex flex-col-reverse items-center gap-2 md:flex-row">
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
                            field.onChange(Math.max(1, field.value - 1))
                          }
                          disabled={field.value <= 1}
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
                          onClick={() =>
                            field.onChange(Math.min(12, field.value + 1))
                          }
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
        </div>

        <div className="flex flex-col gap-2 border p-4">
          <p>Extras (Optional)</p>
          {extras.map((extra) => {
            const price = extra.pricePerDay || extra.pricePerPerson;
            return (
              <FormField
                name="extra"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                    <div>
                      <FormLabel>{extra.name}</FormLabel>
                      <FormDescription>
                        {extra.pricePerDay || extra.pricePerPerson}{" "}
                        {extra.pricePerDay ? "Per Day" : "Per Person"}
                      </FormDescription>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value?.some(
                          (item) => item.name === extra.name,
                        )}
                        onCheckedChange={(isChecked) => {
                          const updatedExtras = isChecked
                            ? [
                                ...field.value,
                                {
                                  name: extra.name,
                                  price,
                                },
                              ] // Add price if checked
                            : field.value.filter(
                                (item) => item.name !== extra.name,
                              ); // Remove if unchecked
                          field.onChange(updatedExtras);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        {/* <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md bg-slate-50 p-4">
              <FormLabel className="font-light">Total Price</FormLabel>

              <Label className="p-2 text-xl font-medium">{field.value}</Label>
            </FormItem>
          )}
        /> */}

        <div className="rounded-md bg-slate-50 p-4">
          {pickupDate && returnDate && startTime && endTime && (
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span className="flex gap-2">
                Duration
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="size-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p>Minimum Rental {minDuration} Hours</p>
                        <p>
                          Maximum Rental {maxDuration}{" "}
                          {isDayMaxDuration ? "Days" : "Hours"}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              {dayCount > 1 && (
                <p>
                  {dayCount} {dayCount > 1 ? "Days" : "Day"}
                </p>
              )}
              {dayCount <= 1 && endTime && (
                <p>
                  {hourCount} {hourCount > 1 ? "Hours" : "Hour"}
                </p>
              )}
            </div>
          )}
          {dayCount <= 1 && hourCount > minDuration && (
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>
                Additional Hours ({formatPeso(pricePerHour)} *{" "}
                {hourCount - minDuration} Extra Hours)
              </span>
              <p>+ {formatPeso(pricePerHour * (hourCount - minDuration))}</p>
            </div>
          )}
          {selectedExtra.map((extra) => (
            <div
              className="flex items-center justify-between text-sm text-slate-500"
              key={extra.name}
            >
              <span>
                {extra.name} ({formatPeso(extra.price)}
                {dayCount > 1 ? `* ${dayCount} Days` : ""})
              </span>
              <p>
                +{" "}
                {dayCount > 1
                  ? formatPeso(extra.price * dayCount)
                  : formatPeso(extra.price)}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span>Total Price: </span>
            <p>{formatPeso(totalPrice)}</p>
          </div>
        </div>

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
