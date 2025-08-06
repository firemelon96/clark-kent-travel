"use client";

import { CldImage } from "next-cloudinary";

interface TourImageProps {
  image: string;
  title: string;
  description: string;
}

export const TourImage = ({ image, title, description }: TourImageProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative aspect-video h-20 overflow-hidden rounded-sm">
        <CldImage src={image} fill alt={title} />
      </div>
      <div className="max-w-sm">
        <p className="truncate text-base font-medium">{title}</p>
        <p className="text-muted-foreground truncate text-xs">{description}</p>
      </div>
    </div>
  );
};
