"use client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useUrlParams } from "@/hooks/use-url-params";
import { formatPeso } from "@/app/lib/helpers";

type Props = {
  url: string;
  title: string;
};

export const Preview = ({ url, title }: Props) => {
  const { eachParams } = useUrlParams();
  return (
    <div className="flex gap-2 rounded-md border p-4">
      <Image
        src={url}
        width={120}
        height={120}
        alt={title}
        className="aspect-video rounded-md object-cover"
      />
      <div className="">
        <p>{title}</p>
        <span className="text-slate-500">
          {formatPeso(+eachParams.price)} x {eachParams.participants} pax
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
