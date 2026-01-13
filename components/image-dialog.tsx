"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

// const images = [
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 1' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 2' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 3' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 4' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 5' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 4' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 5' },
// ];

type Props = {
  images?: string[];
};

export const ImageDialog = ({ images }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-2 bottom-2" variant="outline">
          Gallery
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-2xl md:min-w-3xl lg:min-w-5xl">
        <DialogHeader>
          <DialogTitle>Gallery</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2">
          <Carousel setApi={setApi} className="w-full items-center">
            <CarouselContent className="">
              {images?.map((image) => (
                <CarouselItem key={image}>
                  <Image
                    key={image}
                    src={image}
                    height={800}
                    width={1000}
                    alt="test"
                    className="aspect-video rounded-md object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex gap-2 overflow-x-auto">
            {images?.map((image, i) => (
              <Image
                key={image + i}
                onClick={() => api?.scrollTo(i)}
                src={image}
                height={40}
                width={40}
                alt="thumbnail"
                className={cn(
                  "aspect-square rounded-sm",
                  current === i && "border-2 border-rose-500 opacity-70",
                )}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
