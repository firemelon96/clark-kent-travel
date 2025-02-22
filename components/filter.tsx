"use client";

import qs from "query-string";
import { useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { use, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { PopoverClose } from "@radix-ui/react-popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const types = [
  { value: "all", label: "All Services" },
  { value: "transfer", label: "Transfer" },
  { value: "proper", label: "City Proper" },
  { value: "day_tour", label: "Day Tour" },
  { value: "round_trip", label: "Roundtrip" },
  { value: "fast craft", label: "Fast Craft" },
  { value: "one_way", label: "One Way" },
];

const timeSlots = ["3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM"];

const locations = [
  { value: "puerto princesa, city", label: "Puerto Princesa City" },
  { value: "el nido", label: "El Nido" },
  { value: "coron", label: "Coron" },
  { value: "balabac", label: "Balabac" },
  { value: "port barton", label: "Port Barton" },
];

export const FilterSchema = z.object({
  date: z.date(),
  time: z.string(),
  transferType: z.string(),
  from: z.string(),
  to: z.string(),
});

export const Filter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilter = searchParams.get("type");

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      date: undefined,
      transferType: "",
      from: "",
      to: "",
      time: "",
    },
  });

  const isTransfer = form.watch("transferType") === "transfer";

  const transfer = form.watch("transferType");
  const from = form.watch("from");
  const to = form.watch("to");

  // const onSubmit = (values: z.infer<typeof FilterSchema>) => {
  //   console.log(values);
  // };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: transfer || "all",
          from: isTransfer ? from : undefined,
          to: isTransfer ? to : undefined,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [transfer, from, to, pathname, router]);

  return (
    <Card className="sticky top-2 h-fit w-full bg-rose-50 p-4 md:w-72">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="transferType"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Select type</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                      <Button
                        key={type.value}
                        type="button"
                        variant={
                          field.value === type.value ||
                          type.value === defaultFilter
                            ? "ckBtn"
                            : "outline"
                        }
                        onClick={() => field.onChange(type.value)}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <Separator className="my-2" />
          {isTransfer && (
            <>
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                          <Button
                            key={location.value}
                            type="button"
                            variant={
                              field.value === location.value
                                ? "ckBtn"
                                : "outline"
                            }
                            className={cn(
                              "",
                              field.value === location.value &&
                                "bg-rose-500 text-primary-foreground",
                            )}
                            onClick={() => field.onChange(location.value)}
                          >
                            {location.label}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-2" />
            </>
          )}

          {isTransfer && from && (
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>To ?</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {locations.map((location) => (
                        <Button
                          disabled={from === location.value}
                          key={location.value}
                          type="button"
                          variant={
                            field.value === location.value ? "ckBtn" : "outline"
                          }
                          className={cn(
                            "",
                            field.value === location.value &&
                              "bg-rose-500 text-primary-foreground",
                          )}
                          onClick={() => field.onChange(location.value)}
                        >
                          {location.label}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}

          {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Date</FormLabel>
                <FormControl>
                  <Card>
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      mode="single"
                    />
                  </Card>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
    </Card>
  );
};
