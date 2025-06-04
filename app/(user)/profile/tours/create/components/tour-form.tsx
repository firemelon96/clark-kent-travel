"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export const TourForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form action="">
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
          <div className="col-span-3 flex flex-col gap-4 rounded-xl border p-4"></div>
          <div className="col-span-2 flex flex-col gap-4 rounded-xl border p-4"></div>
        </div>
      </form>
    </Form>
  );
};
