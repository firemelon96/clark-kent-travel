"use client";

import z from "zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
import { DayPicker } from "react-day-picker";
import { BiMinus, BiPlus } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, useMemo, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { formatPeso } from "@/app/lib/helpers";
import DatePicker from "react-datepicker";
import countryList from "react-select-country-list";
import Select from "react-select";
import { BookTour } from "@/actions/tour-booking";
import { TourFormSchema } from "@/types/tour";
import toast from "react-hot-toast";

// Define the Zod schema

type FormWithZODProps = {
  price?: number | number[];
  privatePrice: number[];
  title: string;
  type: string;
};

export const FormWithZOD = ({
  price,
  privatePrice,
  title,
  type,
}: FormWithZODProps) => {
  const [totalPrice, setTotalPrice] = useState(0);

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
  } = useForm<z.infer<typeof TourFormSchema>>({
    resolver: zodResolver(TourFormSchema),
    defaultValues: {
      date: new Date(Date.now()),
      count: 1,
      travellerType: price ? "Joiners" : "Private",
      notes: "",
      name: "",
      age: 20,
      gender: "male",
      nationality: "Philippines",
      email: "",
      contact: "",
      pickupLocation: "",
    },
  });

  const count = watch("count");
  const travellerType = watch("travellerType");
  const gender = watch("gender");

  const isPrivatePrice = travellerType === "Private";
  const joiners = !isPrivatePrice && price && !Array.isArray(price);
  const joinerPriceArray = !isPrivatePrice && Array.isArray(price);
  const groupPax = privatePrice.length >= 1 && privatePrice.length <= 7;

  useEffect(() => {
    if (isPrivatePrice) {
      setTotalPrice(privatePrice[count - 1] * count);
    }

    if (groupPax) {
      const index = Math.floor((count - 1) / 2);
      setTotalPrice(privatePrice[index]);
    }

    if (joiners) {
      setTotalPrice(price * count);
    }

    if (joinerPriceArray) {
      setTotalPrice(price[count - 1] * count);
    }
  }, [
    price,
    privatePrice,
    isPrivatePrice,
    joinerPriceArray,
    joiners,
    count,
    groupPax,
  ]);

  const onSubmit = (data: FieldValues) => {
    const transformedData = {
      ...data,
      title,
      total: totalPrice,
    };

    startTransition(() => {
      BookTour(transformedData)
        .then((data) => {
          if (data.success) {
            toast.success(data.message || "", { duration: 4000 });
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
            disabled={isLoading || isLoadingTransition}
            placeholderText="Select a date for your trip"
            className="border-third mt-1 block w-full rounded-md border border-gray-300 p-2 text-2xl shadow-sm"
          />
        )}
      />
      {errors.date && (
        <span className="text-sm text-rose-500">Select a date</span>
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
          {errors.age && <span>{errors.age.message}</span>}
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
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
              isDisabled={isLoading || isLoadingTransition}
              options={options}
              value={options.find((option) => option.label === field.value)}
              onChange={(selectedOption) =>
                field.onChange(selectedOption?.label)
              }
            />
          )}
        />
        {errors.nationality && <span>{errors.nationality.message}</span>}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-base text-slate-500">Traveler Type</span>
        {privatePrice.length > 0 && (
          <label
            className={`cursor-pointer rounded-xl border border-sky-500 px-2 py-1.5 ${travellerType === "Private" && "bg-sky-500 text-white"}`}
          >
            <input
              type="radio"
              value="Private"
              {...register("travellerType")}
              className="hidden"
            />{" "}
            Private
          </label>
        )}
        {price && (
          <label
            className={`cursor-pointer rounded-xl border border-sky-500 px-2 py-1.5 ${travellerType === "Joiners" && "bg-sky-500 text-white"}`}
          >
            <input
              type="radio"
              value="Joiners"
              {...register("travellerType")}
              className="hidden"
            />{" "}
            Joiners
          </label>
        )}
        {errors.travellerType && (
          <span className="text-sm text-rose-500">Select type</span>
        )}
        {!price && type === "package" && (
          <label
            className={`cursor-pointer rounded-xl border border-sky-500 px-2 py-1.5 ${travellerType === "Joiners" && "bg-sky-500 text-white"}`}
          >
            <input
              type="radio"
              value="Joiners"
              {...register("travellerType")}
              className="hidden"
            />{" "}
            Joiners
          </label>
        )}
        {errors.travellerType && (
          <span className="text-sm text-rose-500">Select type</span>
        )}
      </div>
      <div>
        <label className="flex items-center justify-between text-base text-slate-500">
          Participants
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setValue("count", Math.max(0, count - 1))}
              className="rounded-full bg-sky-500 p-1.5 text-white"
            >
              <BiMinus />
            </button>
            <input
              type="number"
              {...register("count", { valueAsNumber: true })}
              readOnly
              className="flex w-7 justify-center bg-sky-50 text-center"
            />
            <button
              type="button"
              onClick={() => setValue("count", count + 1)}
              className="rounded-full bg-sky-500 p-1.5 text-white"
            >
              <BiPlus />
            </button>
          </div>
        </label>
        {errors.count ? (
          <span className="text-sm text-rose-500">{errors.count.message}</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label className="flex flex-col justify-between text-base text-slate-500">
          Pick up location | Hotel
          <input
            placeholder="Pick up hotel"
            {...register("pickupLocation")}
            className="p-2 text-xl"
            disabled={isLoading || isLoadingTransition}
          />
        </label>
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
      {count ? (
        <div className="flex items-center justify-between px-2 text-xl font-semibold">
          <span className="text-lg text-slate-400">TOTAL</span>

          {!isPrivatePrice && price && !Array.isArray(price) && (
            <>
              <p className="font-bold text-slate-500">
                {formatPeso(price * count)}
              </p>
            </>
          )}
          {!isPrivatePrice && Array.isArray(price) && (
            <>
              <p className="font-bold text-slate-500">
                {count <= price.length ? (
                  formatPeso(price[count - 1] * count)
                ) : (
                  <span className="text-right text-base font-normal text-rose-500">
                    Minimum {price.length} per pax reach
                  </span>
                )}
              </p>
            </>
          )}
          {isPrivatePrice && !groupPax && (
            <>
              <p className="font-bold text-slate-500">
                {count <= privatePrice.length ? (
                  formatPeso(totalPrice)
                ) : (
                  <span className="text-right text-base font-normal text-rose-500">
                    Minimum {privatePrice.length} per pax reach
                  </span>
                )}
              </p>
            </>
          )}
          {!price && !isPrivatePrice && (
            <span className="text-md font-normal text-rose-400">
              Upon request
            </span>
          )}
          {isPrivatePrice && groupPax && (
            <>
              <p className="font-bold text-slate-500">
                {count <= privatePrice.length * 2 ? (
                  formatPeso(totalPrice)
                ) : (
                  <span className="text-right text-base font-normal text-rose-500">
                    Minimum {privatePrice.length * 2} per pax reach
                  </span>
                )}
              </p>
            </>
          )}
        </div>
      ) : (
        ""
      )}
      <button
        type="submit"
        disabled={isLoading || isLoadingTransition}
        className="w-full rounded-full bg-sky-500 p-2 font-bold uppercase tracking-widest text-white disabled:bg-slate-500"
      >
        {isLoadingTransition ? "Booking..." : "Book this trip"}
      </button>
    </form>
  );
};
