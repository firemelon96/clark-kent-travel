"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { travellerType } from "@/db/schema";
import { fullTourUpdateSchema } from "@/types/drizzle-schema";
import { ActivityIcon, ActivitySquareIcon, MapPinIcon, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FullTourValues = z.infer<typeof fullTourUpdateSchema>;

export const PricingForm = () => {
  const form = useFormContext<FullTourValues>();

  const { fields, append, remove } = useFieldArray({
    name: "tourPricings",
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2>Set up price</h2>
        <Button
          type="button"
          onClick={() =>
            append({
              type: "Private",
              minGroupSize: 1,
              maxGroupSize: 8,
              price: 2000,
            })
          }
          variant={"secondary"}
        >
          Add Price
        </Button>
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="group relative flex gap-4 rounded-xl border p-4"
        >
          <FormField
            name={`tourPricings.${index}.type`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-26">
                    <SelectTrigger>
                      <SelectValue placeholder="Type of participants" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {travellerType.enumValues.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name={`tourPricings.${index}.minGroupSize`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-16">
                <FormLabel>Min</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={`tourPricings.${index}.maxGroupSize`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-16">
                <FormLabel>Max</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="12" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name={`tourPricings.${index}.price`}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2000" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            size={"icon"}
            className="absolute top-2 right-2 rounded-full opacity-0 transition-colors duration-200 group-hover:opacity-100"
            type="button"
            onClick={() => remove(index)}
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  );
};
