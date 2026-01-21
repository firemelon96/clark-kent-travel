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
import { differenceInCalendarDays, format } from "date-fns";
import { CalendarIcon, Loader2Icon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { formatPeso } from "@/app/lib/helpers";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import {
  bookingOptionSchema,
  pricingSchema,
  accomOptionSchema,
} from "@/types/tour";

type Props = {
  id: string;
  pricing: z.infer<typeof pricingSchema>[];
  title: string;
};

export const BookRange = ({ id, pricing, title }: Props) => {
  const [openDate, setOpenDate] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const priceType = Array.from(new Set(pricing.map((price) => price.type)));

  const form = useForm<z.infer<typeof accomOptionSchema>>({
    resolver: zodResolver(accomOptionSchema),
    defaultValues: {
      dateRange: {
        from: undefined,
        to: undefined,
      },
      participants: 2,
      totalPrice: 0,
      type: priceType[0],
    },
  });

  const uniqueSet = Array.from(
    new Map(
      pricing.map((t) => [
        `${t.type}-${t.label}`,
        { type: t.type, label: t.label },
      ]),
    ).values(),
  );

  const participants = form.watch("participants");
  const type = form.watch("type");
  const range = form.watch("dateRange");

  const numOfNights = differenceInCalendarDays(range.to, range.from);

  const maxForType = pricing.reduce((max, price) => {
    if (price.type === type) {
      return Math.max(max, price.maxGroupSize);
    }
    return max;
  }, 0);

  const minForType = Math.min(
    ...pricing.filter((t) => type === t.type).map((t) => t.minGroupSize),
  );

  if (participants > maxForType) {
    form.setValue("participants", maxForType, { shouldValidate: true });
  }

  const matched = pricing
    .filter((price) => price.type === type)
    .find(
      (price) =>
        participants >= price.minGroupSize &&
        participants <= price.maxGroupSize,
    );

  useEffect(() => {
    if (participants > maxForType) {
      form.setValue("participants", maxForType, { shouldValidate: true });
    }

    if (!matched) return;

    if (matched) {
      const total = matched.isGroupSize
        ? matched.price
        : matched.price * participants;

      form.setValue("totalPrice", total, {
        shouldValidate: true,
      });
    }

    if (numOfNights > 1) {
      form.setValue("totalPrice", matched.price * numOfNights, {
        shouldValidate: true,
      });
    }
  }, [participants, type, pricing, form.setValue, form, numOfNights]);

  const onSubmit = (values: z.infer<typeof accomOptionSchema>) => {
    const { participants, totalPrice, dateRange, type } = values;

    const { from, to } = dateRange;

    if (from.getTime() === to.getTime()) {
      toast.error("Select valid date range.");
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: "/accommodations/reservation",
        query: {
          id,
          from: from ? format(from, "yyyy-MM-dd") : undefined,
          to: to ? format(to, "yyyy-MM-dd") : undefined,
          participants,
          totalPrice,
          type,
          title,
          numOfNights,
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
        className="w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Reservation Date</FormLabel>
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
                      onSelect={(range) => {
                        if (range?.from) {
                          field.onChange({
                            from: range.from,
                            to: range.to,
                          });
                        }
                      }}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date() ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      }
                    />
                    <div className="flex items-center justify-between px-4">
                      <div className="flex flex-col leading-4">
                        <span className="font-medium">
                          {formatPeso(matched?.price || 0)}
                        </span>
                        {numOfNights > 1 ? (
                          <span className="text-xs font-light tracking-wide text-slate-500">
                            x {numOfNights} nights
                          </span>
                        ) : (
                          <span className="text-xs font-light tracking-wide text-slate-500">
                            Per night
                          </span>
                        )}
                      </div>
                      {range.from &&
                        range.to.getTime() !== range.from.getTime() && (
                          <Button onClick={() => setOpenDate(false)}>
                            Select date
                          </Button>
                        )}
                    </div>
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Select type</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {uniqueSet.map((p) => (
                    <Button
                      key={p.type}
                      type="button"
                      variant={field.value === p.type ? "default" : "outline"}
                      onClick={() => field.onChange(p.type)}
                    >
                      {p.label ? <span>{p.label}</span> : <span>{p.type}</span>}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Quantity</FormLabel>
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
                            field.onChange(
                              Math.max(minForType, field.value - 1),
                            )
                          }
                          disabled={field.value <= minForType}
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
                          disabled={participants === maxForType}
                          onClick={() => {
                            field.onChange(
                              Math.min(maxForType, field.value + 1),
                            );
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
          <Button variant="default" className="">
            {isPending && <Loader2Icon />}{" "}
            {isPending ? "Loading..." : "Reserve now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
