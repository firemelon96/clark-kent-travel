import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Star, Stars } from "lucide-react";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";

interface Props {
  imageUrl: string;
  name: string;
  time: string;
  message: string;
  rating: number;
}

export const ReviewCard = ({
  imageUrl,
  name,
  time,
  message,
  rating,
}: Props) => {
  return (
    <Card className="rounded-none border-rose-200 bg-transparent p-4 shadow-none">
      <div className="flex items-center gap-4">
        <div className="relative size-14 overflow-hidden rounded-full">
          <Image unoptimized src={imageUrl} fill alt="profile" />
        </div>
        <div className="flex flex-col">
          <h5 className="text-lg font-medium tracking-wide">{name}</h5>
          <p className="text-xs text-slate-500">{time}</p>
          <span className="flex gap-1">
            {Array.from({ length: rating }).map((_, i) => (
              <BsStarFill key={i} className="fill-amber-300" />
            ))}
          </span>
        </div>
      </div>
      <span className="text-justify text-base text-slate-500">{message}</span>
    </Card>
  );
};
