"use client";

import z from "zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
import { DayPicker } from "react-day-picker";
import { BiMinus, BiPlus } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useMemo, useTransition } from "react";
import { addDays, addMonths, format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { formatPeso } from "@/app/lib/helpers";
import DatePicker from "react-datepicker";
import countryList from "react-select-country-list";
import Select from "react-select";
import { LogisticFormSchema } from "@/types/other-services";
import { BookLogistic } from "@/actions/logistic-booking";
import toast from "react-hot-toast";

type BookingFormProps = {
  price: number;
  title: string;
  vehicleType: string;
  type: string;
  availability: string;
};

export const BookingForm = ({
  price,
  vehicleType,
  type,
  availability,
  title,
}: BookingFormProps) => {
  const [isLoadingTransition, startTransition] = useTransition();

  const router = useRouter();

  const options = useMemo(() => countryList().getData(), []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isLoading },
    setValue,
    watch,
  } = useForm<z.infer<typeof LogisticFormSchema>>({
    resolver: zodResolver(LogisticFormSchema),
    defaultValues: {
      date: new Date(Date.now()),
      notes: "",
      name: "",
      age: 5,
      gender: "male",
      nationality: "Philippines",
      email: "",
      contact: "",
    },
  });

  const gender = watch("gender");

  const onSubmit = (data: FieldValues) => {
    const transformedData = {
      ...data,
      title,
      price,
      vehicleType,
      type,
      availability,
    };

    startTransition(() => {
      BookLogistic(transformedData)
        .then((data) => {
          if (data.success) {
            toast.success(data.message || "");
          }
        })
        .catch((err) => toast.error(err.message));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            minDate={new Date()}
            placeholderText="Select a date for your trip"
            className="border-third mt-1 block w-full rounded-md border border-gray-300 p-2 text-2xl shadow-sm"
            disabled={isLoading || isLoadingTransition}
          />
        )}
      />
      {errors.date && (
        <span className="text-sm text-rose-500">
          Please select your desired date
        </span>
      )}
      <div>
        <label className="flex flex-col justify-between text-base text-slate-500">
          Name
          <input
            placeholder="Your name..."
            {...register("name")}
            className="p-2 text-xl"
            disabled={isLoading || isLoadingTransition}
          />
        </label>
        {errors.name && (
          <span className="text-rose-500">{errors.name.message}</span>
        )}
      </div>
      <div>
        <label className="flex flex-col justify-between text-base text-slate-500">
          Email
          <input
            placeholder="Your email..."
            {...register("email")}
            className="p-2 text-xl"
            disabled={isLoading || isLoadingTransition}
          />
        </label>
        {errors.email && (
          <span className="text-sm text-rose-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex gap-2">
        <label className="flex flex-col justify-between text-base text-slate-500">
          Contact
          <input
            placeholder="Your contact (skype | whatsapp)"
            {...register("contact")}
            className="w-auto p-2 text-xl font-normal"
            disabled={isLoading || isLoadingTransition}
          />
        </label>
        <label className="flex flex-col justify-between text-base text-slate-500">
          Age
          <input
            type="number"
            placeholder="Age"
            {...register("age", { valueAsNumber: true })}
            className="w-full p-2 text-xl font-normal"
            disabled={isLoading || isLoadingTransition}
          />
        </label>
      </div>
      {errors.contact && (
        <span className="text-sm text-rose-500">{errors.contact.message}</span>
      )}
      {errors.age && (
        <span className="text-sm text-rose-500">{errors.age.message}</span>
      )}
      <div className="flex items-center gap-2">
        <span className="text-base text-slate-500">Gender</span>
        <label
          className={`cursor-pointer rounded-xl border border-sky-500 px-2 py-1.5 ${gender === "male" && "bg-sky-500 text-white"}`}
        >
          <input
            type="radio"
            value="male"
            {...register("gender")}
            className="hidden"
          />{" "}
          Male
        </label>
        <label
          className={`cursor-pointer rounded-xl border border-sky-500 px-2 py-1.5 ${gender === "female" && "bg-sky-500 text-white"}`}
        >
          <input
            type="radio"
            value="female"
            {...register("gender")}
            className="hidden"
          />{" "}
          Female
        </label>
        <label
          className={`cursor-pointer rounded-xl border border-sky-500 px-2 py-1.5 ${gender === "others" && "bg-sky-500 text-white"}`}
        >
          <input
            type="radio"
            value="others"
            {...register("gender")}
            className="hidden"
          />{" "}
          Others
        </label>
        {errors.gender && (
          <span className="text-sm text-rose-500">Select type</span>
        )}
      </div>

      <div>
        <Controller
          control={control}
          name="nationality"
          render={({ field }) => (
            <Select
              options={options}
              value={options.find((option) => option.label === field.value)}
              onChange={(selectedOption) =>
                field.onChange(selectedOption?.label)
              }
              isDisabled={isLoading || isLoadingTransition}
            />
          )}
        />
        {errors.nationality && <span>{errors.nationality.message}</span>}
      </div>

      <label className="text-base text-slate-500">
        Notes
        <textarea
          placeholder="e.g. type of food and drinks"
          rows={3}
          className="h-20 w-full rounded-md border p-2"
          {...register("notes")}
          disabled={isLoading || isLoadingTransition}
        />
        {errors.notes && (
          <span className="text-sm text-rose-500">{errors.notes.message}</span>
        )}
      </label>

      <button
        type="submit"
        disabled={isLoading || isLoadingTransition}
        className="w-full rounded-full bg-sky-500 p-2 font-bold uppercase tracking-widest text-white disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {isLoadingTransition ? "Booking..." : "Book now"}
      </button>
    </form>
  );
};
