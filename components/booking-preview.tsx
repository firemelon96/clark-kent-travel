"use client";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useUrlParams } from "@/hooks/use-url-params";

type Props = {
  url: string;
  title: string;
};

export const BookingPreview = ({ url, title }: Props) => {
  const { eachParams } = useUrlParams();
  return (
    <div className="flex gap-2 rounded-md border p-4">
      <Image
        src={url}
        width={120}
        height={120}
        alt={title}
        className="object-cover"
      />
      <div className="space-y-2">
        <p>{title}</p>
        <span className="text-slate-500">
          {eachParams.type.toLowerCase()} transfer x {eachParams.participants}{" "}
          pax
        </span>
      </div>
    </div>
  );
};

export const BookingPreviewSkeleton = () => {
  return (
    <div className="flex gap-2 rounded-md border p-4">
      <Skeleton className="h-20 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
};
