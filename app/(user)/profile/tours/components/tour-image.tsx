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
      <div>
        <p className="text-base font-medium">{title}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
};
