"use client";

import z from "zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
// import DatePicker from "react-datepicker";
import { DayPicker } from "react-day-picker";
import { BiMinus, BiPlus } from "react-icons/bi";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { addDays, addMonths, format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { formatPeso } from "@/app/lib/helpers";
import DatePicker from "react-datepicker";

// Define the Zod schema
const schema = z.object({
  date: z.date(),
  travellerType: z.enum(["Private", "Joiners"]),
  notes: z.string().min(1, "Notes are required"),
  count: z.number().min(1, "Participants required"),
});

interface FormWithZODProps {
  duration: string;
  price?: number | number[];
  privatePrice: number[];
  title: string;
}

export const FormWithZOD = ({
  duration,
  price,
  privatePrice,
  title,
}: FormWithZODProps) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isLoading },
    setValue,
    watch,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: undefined,
      count: 1,
      travellerType: price ? "Joiners" : "Private",
      notes: "",
    },
  });

  const count = watch("count");
  const travellerType = watch("travellerType");

  const isPrivatePrice = travellerType === "Private";
  const joiners = !isPrivatePrice && price && !Array.isArray(price);
  const joinerPriceArray = !isPrivatePrice && Array.isArray(price);

  useEffect(() => {
    if (joiners) {
      setTotalPrice(price * count);
    }

    if (isPrivatePrice) {
      setTotalPrice(privatePrice[count - 1] * count);
    }

    if (joinerPriceArray) {
      setTotalPrice(price[count - 1] * count);
    }
  }, [price, privatePrice, isPrivatePrice, count]);

  const onSubmit = (data: FieldValues) => {
    const { date, count, travellerType, notes } = data;
    const formatDate = format(new Date(date), "MMM dd EEEE");
    const formattedTotalPrice = formatPeso(totalPrice);

    const appName = "Clark Kent Travel Website";

    router.push(
      `https://m.me/276166685864117/?text=Booking%20from%20${appName}%0ATour%20name:%20${title}%0ADate:%20${formatDate}%0AParticipants:%20${count}%20pax%0ATraveller%20Type:%20${travellerType}%0ANotes:%20${notes}%0ATotal%20Price:%20${formattedTotalPrice}`,
    );
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
          />
        )}
      />
      {errors.date && (
        <span className="text-sm text-rose-500">Select a date</span>
      )}
      <div className="flex items-center gap-2">
        <label
          className={`cursor-pointer rounded-xl border border-sky-500 px-4 py-2 ${travellerType === "Private" && "bg-sky-500 text-white"}`}
        >
          <input
            type="radio"
            value="Private"
            {...register("travellerType")}
            className="hidden"
          />{" "}
          Private
        </label>
        {price && (
          <label
            className={`cursor-pointer rounded-xl border border-sky-500 px-4 py-2 ${travellerType === "Joiners" && "bg-sky-500 text-white"}`}
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
        <label className="flex items-center justify-between text-xl text-slate-500">
          Participants
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setValue("count", Math.max(0, count - 1))}
              className="rounded-full bg-sky-500 p-2 text-white"
            >
              <BiMinus />
            </button>
            <input
              type="number"
              {...register("count")}
              readOnly
              className="flex w-7 justify-center bg-sky-50 text-center"
            />
            <button
              type="button"
              onClick={() => setValue("count", count + 1)}
              className="rounded-full bg-sky-500 p-2 text-white"
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
      <label className="text-xl text-slate-500">
        Notes
        <textarea
          placeholder="e.g. type of food and drinks"
          rows={3}
          className="h-36 w-full rounded-md border p-2"
          {...register("notes")}
        />
        {errors.notes && (
          <span className="text-sm text-rose-500">{errors.notes.message}</span>
        )}
      </label>
      {count ? (
        <div className="flex items-center justify-between p-4 text-xl font-semibold">
          <span className="text-lg text-slate-400">TOTAL</span>{" "}
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
          {isPrivatePrice && (
            <>
              <p className="font-bold text-slate-500">
                {count <= privatePrice.length ? (
                  formatPeso(privatePrice[count - 1] * count)
                ) : (
                  <span className="text-right text-base font-normal text-rose-500">
                    Minimum {privatePrice.length} per pax reach
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
        disabled={isLoading}
        className="w-full rounded-full bg-sky-500 p-4 font-bold uppercase tracking-widest text-white"
      >
        BOOK THIS TRIP
      </button>
    </form>
  );
};
