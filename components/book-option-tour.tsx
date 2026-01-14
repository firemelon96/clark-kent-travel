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
import { CalendarIcon, Loader2Icon, Minus, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { formatPeso } from "@/app/lib/helpers";
import { tourPricingSelectSchema } from "@/types/drizzle-schema";
import { DateRange } from "react-day-picker";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import { bookingOptionSchema, pricingSchema } from "@/types/tour";
import { MapLocation } from "./map-location";

type Props = {
  tourId: string;
  duration: number;
  tourPricing: z.infer<typeof pricingSchema>[];
  setShowForm?: (value: boolean) => void;
};

export const BookOptionTour = ({
  tourId,
  tourPricing,
  duration,
  setShowForm,
}: Props) => {
  const [openDate, setOpenDate] = useState(false);
  const [mapLink, setMapLink] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const priceType = Array.from(new Set(tourPricing.map((price) => price.type)));
  console.log(priceType);

  const form = useForm<z.infer<typeof bookingOptionSchema>>({
    resolver: zodResolver(bookingOptionSchema),
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
      tourPricing.map((t) => [
        `${t.type}-${t.label}`,
        { type: t.type, label: t.label },
      ]),
    ).values(),
  );

  const participants = form.watch("participants");
  const type = form.watch("type");

  const isDay = duration === 1;

  const maxForType = tourPricing.reduce((max, price) => {
    if (price.type === type) {
      return Math.max(max, price.maxGroupSize);
    }
    return max;
  }, 0);

  const minForType = Math.min(
    ...tourPricing.filter((t) => type === t.type).map((t) => t.minGroupSize),
  );

  console.log(type, maxForType, uniqueSet);

  if (participants > maxForType) {
    form.setValue("participants", maxForType, { shouldValidate: true });
  }

  useEffect(() => {
    if (participants > maxForType) {
      form.setValue("participants", maxForType, { shouldValidate: true });
    }

    const matched = tourPricing
      .filter((price) => price.type === type)
      .find(
        (price) =>
          participants >= price.minGroupSize &&
          participants <= price.maxGroupSize,
      );

    if (!matched) return;

    if (matched) {
      const total = matched.isGroupSize
        ? matched.price
        : matched.price * participants;

      form.setValue("totalPrice", total, {
        shouldValidate: true,
      });
    }
  }, [participants, type, tourPricing, form.setValue, form]);

  const onSubmit = (values: z.infer<typeof bookingOptionSchema>) => {
    const { participants, totalPrice, dateRange, type } = values;

    const { from, to } = dateRange;

    if (mapLink === "") {
      toast.error("Please select a location on the map");
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: "/booking",
        query: {
          tourId,
          from: from ? format(from, "yyyy-MM-dd") : undefined,
          to: to ? format(to, "yyyy-MM-dd") : undefined,
          participants,
          totalPrice,
          type,
          mapLink,
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
        {form.formState.errors && (
          <p>{JSON.stringify(form.formState.errors)}</p>
        )}
        <p>{mapLink}</p>
        <MapLocation setMaplink={setMapLink} />
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Travel Date</FormLabel>
                <Popover open={openDate} onOpenChange={setOpenDate}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="default"
                        className={cn(
                          "w-60 pl-3 text-left font-normal",
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
                          to: isDay ? day : addDays(day, duration - 1),
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
          {/* Make this persist in localstorage when saved */}
          {!!setShowForm && (
            <Button
              onClick={() => setShowForm(false)}
              variant="secondary"
              type="button"
            >
              Close
            </Button>
          )}
          <Button variant="default">
            {isPending && <Loader2Icon />}{" "}
            {isPending ? "Loading..." : "Book now"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
