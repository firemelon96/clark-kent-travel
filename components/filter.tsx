"use client";

import qs from "query-string";
import { useForm } from "react-hook-form";
import { Card } from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { useEffect } from "react";

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

export const FilterSchema = z.object({
  transferType: z.string(),
});

export const Filter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultFilter = searchParams.get("type");

  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      transferType: "",
    },
  });

  const transfer = form.watch("transferType");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: transfer || "all",
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [transfer, pathname, router]);

  return (
    <Card className="-mt-36 flex h-fit w-full items-center justify-center border-none bg-transparent p-2 shadow-none md:-mt-20 md:p-4">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="transferType"
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
                          type.value === defaultFilter
                            ? "default"
                            : "link"
                        }
                        className="text-xs text-white uppercase"
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
        </form>
      </Form>
    </Card>
  );
};
