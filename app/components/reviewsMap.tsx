"use client";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";
import { reviews } from "../data/reviews";
import { useState } from "react";

interface MessageObj {
  index: number;
  message: string;
  starRating: number;
  heading: string;
}

const ReviewsMap = () => {
  const [selectMessage, setSelectMessage] = useState<MessageObj>({
    index: 0,
    message: reviews[0].message,
    starRating: reviews[0].starRating,
    heading: reviews[0].heading,
  });

  return (
    <section className="container mx-auto h-fit md:px-20" id="testimonial">
      <h3 className="text-primary mb-20 text-center text-4xl font-semibold md:text-start">
        Customers <span className="text-rose-500">Testimonial</span>
      </h3>
      <div className="flex h-full flex-col items-center gap-4 md:flex-row">
        <div className="flex w-full flex-row items-center justify-center gap-2 md:w-1/3 md:flex-col">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              onClick={() => {
                setSelectMessage({
                  index,
                  message: review.message,
                  starRating: review.starRating,
                  heading: review.heading,
                });
              }}
              className={`flex w-full cursor-pointer items-start justify-start gap-4 rounded-md ${selectMessage.index === index && "bg-rose-50"} p-4 shadow-sm`}
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image unoptimized src={review.image} fill alt="avatar" />
              </div>
              <div className="hidden flex-col p-2 md:flex">
                <span className="text-xl text-slate-800">{review.name}</span>
                <p className="text-md text-slate-400">{review.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full items-center text-center md:w-2/3 md:text-start">
          <div className="flex flex-col gap-3 p-4">
            <p className="text-2xl font-bold text-slate-700">
              {selectMessage?.heading}
            </p>
            <div className="flex justify-center gap-2 md:justify-start">
              {Array.from({ length: selectMessage?.starRating! }).map(
                (_, i) => (
                  <BsStarFill key={i} className="size-6 fill-rose-500" />
                ),
              )}
            </div>
            <p className="text-xl text-slate-500">{selectMessage?.message}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsMap;
