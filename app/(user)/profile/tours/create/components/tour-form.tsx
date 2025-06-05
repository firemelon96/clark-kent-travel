"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { tourInsertSchema, tourTypes, unitTypes } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const TourForm = () => {
  const [inclusionValue, setInclusionValue] = useState("");
  const [exclusioValue, setExclusioValue] = useState("");

  const form = useForm<z.infer<typeof tourInsertSchema>>({
    resolver: zodResolver(tourInsertSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 2,
      durationUnit: "days",
      exclusions: [],
      inclusions: [],
      images: [],
      isFeatured: false,
      type: "Package",
    },
  });

  const inclusions = form.watch("inclusions") || [];
  const exclusions = form.watch("exclusions") || [];

  const updateInclusions = (array: string[]) => {
    form.setValue("inclusions", array, { shouldValidate: true });
  };

  const updateExclusions = (array: string[]) => {
    form.setValue("exclusions", array, { shouldValidate: true });
  };

  const onKeyDownInclusion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inclusionValue.trim();
      if (trimmed && !inclusions.includes(trimmed)) {
        updateInclusions([...inclusions, trimmed]);
        setInclusionValue("");
      }
    }
  };

  const onKeyDownExclusion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = exclusioValue.trim();
      if (trimmed && !exclusions.includes(trimmed)) {
        updateExclusions([...exclusions, trimmed]);
        setExclusioValue("");
      }
    }
  };

  const removeInclusion = (item: string) => {
    updateInclusions(inclusions.filter((i) => i !== item));
  };

  const removeExclusion = (item: string) => {
    updateExclusions(exclusions.filter((i) => i !== item));
  };

  const onSubmit = (values: z.infer<typeof tourInsertSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between space-y-4">
          <div>
            <h1 className="text-xl font-semibold">New Tour</h1>
            <p className="text-muted-foreground text-xs">Create new Tour.</p>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant={"secondary"}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="col-span-3 flex flex-col gap-4 rounded-xl border p-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-44"
                      placeholder="description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="inclusions"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Inclusions</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={inclusionValue}
                      onChange={(e) => setInclusionValue(e.target.value)}
                      placeholder="Add inclusions and press enter"
                      onKeyDown={onKeyDownInclusion}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2">
              {inclusions.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center rounded-md bg-emerald-100 px-3 py-1 text-sm font-medium text-gray-500"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeInclusion(item)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-rose-300"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <FormField
              name="exclusions"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormLabel>Exclusions</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      value={exclusioValue}
                      onChange={(e) => setExclusioValue(e.target.value)}
                      placeholder="Add exclusions and press enter"
                      onKeyDown={onKeyDownExclusion}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2">
              {exclusions.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center rounded-md bg-rose-100 px-3 py-1 text-sm font-medium text-gray-500"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeExclusion(item)}
                    className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-rose-300"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-4 rounded-xl border p-4">
            <div className="flex flex-col gap-1">
              Image Upload components (Cloudinary)
              <div className="bg-muted-foreground aspect-video rounded-t-xl"></div>
              <div className="flex h-24 gap-1 overflow-hidden overflow-x-scroll rounded-b-xl">
                <div className="bg-accent-foreground aspect-video h-full"></div>
                <div className="bg-accent-foreground aspect-video h-full"></div>
                <div className="bg-accent-foreground aspect-video h-full"></div>
              </div>
            </div>

            <div className="flex">
              <FormField
                name="duration"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl className="rounded-tr-none rounded-br-none">
                      <Input
                        placeholder="Duration number"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="durationUnit"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="w-30 rounded-tl-none rounded-bl-none border-l-0">
                        <SelectTrigger>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {unitTypes.enumValues.map((value) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type of tour</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex"
                    >
                      {tourTypes.enumValues.map((name) => (
                        <FormItem
                          key={name}
                          className="flex items-center gap-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={name} />
                          </FormControl>
                          <FormLabel className="font-normal">{name}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="isFeatured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Feature this tour</FormLabel>
                    <FormDescription>
                      Display this tour in featured.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
