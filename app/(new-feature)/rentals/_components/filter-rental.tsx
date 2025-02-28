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
import { rentals } from "@/app/data/rentals";

const servicesType = [
  { value: "all", label: "All Services" },
  { value: "van_rentals", label: "Van Rentals" },
  { value: "self_drive", label: "Self Drive" },
  { value: "scooter", label: "Scooter" },
];

export const FilterSchema = z.object({
  serviceType: z.string(),
});

export const FilterRental = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilter = searchParams.get("type");

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      serviceType: "",
    },
  });

  const serviceType = form.watch("serviceType");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: serviceType || "all",
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [serviceType, pathname, router]);

  return (
    <Card className="-mt-36 flex h-32 w-full items-center justify-center border-none bg-transparent p-2 shadow-none md:-mt-20 md:h-fit md:p-4">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {servicesType.map((type) => (
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
        </form>
      </Form>
    </Card>
  );
};
