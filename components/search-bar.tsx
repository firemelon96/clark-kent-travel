"use client";

import qs from "query-string";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Card } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { getAllTourLocation } from "@/app/lib/helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter } from "next/navigation";

const searchSchema = z.object({
  location: z.string().min(2, { message: "Please select a location!" }),
  type: z.string().min(2, { message: "Please select the type..." }),
});

export const SearchBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "",
      type: "",
    },
  });

  const locations = getAllTourLocation();

  const onSearch = (values: z.infer<typeof searchSchema>) => {
    console.log(values);
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: values,
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="-mt-16 w-full border-none p-4 shadow-none md:w-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSearch)}
            className="flex w-full flex-col gap-2 md:flex-row md:items-end md:justify-end"
          >
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-slate-500">
                    Location
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="md:w-96">
                        <SelectValue
                          className="text-slate-500"
                          placeholder="Where do you want to go?"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem
                          key={location.address}
                          value={location.address}
                        >
                          {location.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-slate-500">
                    Tour type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-full md:w-52">
                        <SelectValue placeholder="Type of tour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="All Tours">All Tours</SelectItem>
                      <SelectItem value="day tour">Day Tour</SelectItem>
                      <SelectItem value="Package Tour">Package Tour</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="ckBtn">Search</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
