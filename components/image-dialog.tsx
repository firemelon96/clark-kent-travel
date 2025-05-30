"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  const [api, setApi] = useState<any>();
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
      <DialogContent className="aspect-video border-none bg-transparent shadow-none sm:min-w-[980px]">
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {images?.map((image, index) => (
                <CarouselItem key={index} className="">
                  <div className="relative aspect-video">
                    <Image
                      src={image}
                      alt={image}
                      fill
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex justify-center gap-2 overflow-x-auto py-4">
            {images?.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative h-16 w-16 overflow-hidden rounded-md transition-all",
                  current === index ? "ring-primary ring-2" : "opacity-70",
                )}
                onClick={() => api?.scrollTo(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
