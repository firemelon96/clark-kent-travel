"use client";

import qs from "query-string";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useEffect } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const locations = [
  { value: "all", label: "All Tours" },
  { value: "coron", label: "Coron" },
  { value: "balabac", label: "Balabac" },
  { value: "puerto princesa", label: "Puerto Princesa" },
  { value: "el nido", label: "El Nido" },
  { value: "bohol", label: "Bohol" },
  { value: "port barton", label: "Port Barton" },
];

const types = [
  { value: "all types", label: "All Types" },
  { value: "day tour", label: "Day Tour" },
  { value: "package", label: "Package" },
];

export const FilterSchema = z.object({
  location: z.string(),
  type: z.string(),
});

export const FilterTour = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilter = searchParams.get("location");
  const typeFilter = searchParams.get("type");

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      location: "",
      type: "",
    },
  });

  const location = form.watch("location");
  const type = form.watch("type");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          location: location || "all",
          type: type || "all types",
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [location, type, pathname, router]);

  return (
    <Card className="-mt-36 flex h-32 w-full items-center justify-center border-none bg-transparent p-2 shadow-none md:-mt-20 md:h-fit md:p-4">
      <Form {...form}>
        <form className="flex">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {locations.map((type) => (
                      <Button
                        key={type.value}
                        type="button"
                        size={"sm"}
                        variant={
                          field.value === type.value ||
                          type.value === defaultFilter
                            ? "filterActive"
                            : "link"
                        }
                        className="text-xs uppercase text-white"
                        onClick={() => field.onChange(type.value)}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Separator orientation="vertical" />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {types.map((type) => (
                      <Button
                        key={type.value}
                        type="button"
                        size={"sm"}
                        variant={
                          field.value === type.value ||
                          type.value === typeFilter
                            ? "filterActive"
                            : "link"
                        }
                        className="text-xs uppercase text-white"
                        onClick={() => field.onChange(type.value)}
                      >
                        {type.label}
                      </Button>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
};
