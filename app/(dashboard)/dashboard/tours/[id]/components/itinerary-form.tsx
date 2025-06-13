"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fullTourUpdateSchema } from "@/types/drizzle-schema";
import { ActivityIcon, ActivitySquareIcon, MapPinIcon, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FullTourValues = z.infer<typeof fullTourUpdateSchema>;

export const ItineraryForm = () => {
  const [destinationValues, setDestinationValues] = useState<
    Record<number, string>
  >({});
  const [activityValues, setActivityValues] = useState<Record<number, string>>(
    {},
  );

  const form = useFormContext<FullTourValues>();

  const { fields, append, remove } = useFieldArray({
    name: "itineraries",
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2>Itinerary Detail</h2>
        <Button
          type="button"
          onClick={() =>
            append({ title: "", destinations: [], activities: [], images: [] })
          }
          variant={"secondary"}
        >
          Add Itinerary
        </Button>
      </div>
      {fields.map((field, index) => {
        const itineraries = form.watch("itineraries") || [];

        const destinations = itineraries[index]?.destinations || [];
        const activities = itineraries[index]?.activities || [];

        const destinationValue = destinationValues[index] || "";
        const activityValue = activityValues[index] || "";

        const updateDestinations = (array: string[]) => {
          form.setValue(`itineraries.${index}.destinations`, array, {
            shouldValidate: true,
          });
        };

        const updateActivities = (array: string[]) => {
          form.setValue(`itineraries.${index}.activities`, array, {
            shouldValidate: true,
          });
        };

        const onKeyDownDestination = (
          e: React.KeyboardEvent<HTMLInputElement>,
        ) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = destinationValue.trim();
            if (trimmed && !destinations.includes(trimmed)) {
              updateDestinations([...destinations, trimmed]);
              setDestinationValues((prev) => ({
                ...prev,
                [index]: "",
              }));
            }
          }
        };

        const onKeyDownActivity = (
          e: React.KeyboardEvent<HTMLInputElement>,
        ) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = activityValue.trim();
            if (trimmed && !activities.includes(trimmed)) {
              updateActivities([...activities, trimmed]);
              setActivityValues((prev) => ({
                ...prev,
                [index]: "",
              }));
            }
          }
        };

        const removeDestination = (item: string) => {
          updateDestinations(destinations.filter((i) => i !== item));
        };

        const removeActivity = (item: string) => {
          updateActivities(activities.filter((i) => i !== item));
        };

        return (
          <div
            key={field.id}
            className="group relative flex flex-col gap-4 rounded-xl border p-4"
          >
            <FormField
              name={`itineraries.${index}.title`}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name of the itinerary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`itineraries.${index}.destinations`}
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Destinations</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={destinationValue}
                      onChange={(e) =>
                        setDestinationValues((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      onKeyDown={onKeyDownDestination}
                      placeholder="Add destination and press enter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2">
              {destinations.map((item) => (
                <div
                  key={item}
                  className="bg-secondary inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500"
                >
                  <MapPinIcon className="mr-1 size-4" />
                  {item}
                  <button
                    type="button"
                    onClick={() => removeDestination(item)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-rose-300"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <FormField
              name={`itineraries.${index}.activities`}
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Activities</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={activityValue}
                      onChange={(e) =>
                        setActivityValues((prev) => ({
                          ...prev,
                          [index]: e.target.value,
                        }))
                      }
                      onKeyDown={onKeyDownActivity}
                      placeholder="Add activities and press enter"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2">
              {activities.map((item) => (
                <div
                  key={item}
                  className="bg-secondary inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-500"
                >
                  <ActivitySquareIcon className="mr-1 size-4" />
                  {item}
                  <button
                    type="button"
                    onClick={() => removeActivity(item)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-rose-300"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <Button
              size={"icon"}
              className="absolute top-2 right-2 rounded-full opacity-0 transition-colors duration-200 group-hover:opacity-100"
              type="button"
              onClick={() => remove(index)}
            >
              <X />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
