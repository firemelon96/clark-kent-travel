import { ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { cn } from "@/lib/utils";

type KeyValue<T extends string | number> = {
  key: T;
  value: string;
}[];

interface Props<T extends string | number> {
  children: ReactNode;
  className?: string;
  datas: KeyValue<T>;
}

export const ItemsCarousel = <T extends string | number>({
  datas,
  children,
  className,
}: Props<T>) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {datas.map((item, i) => (
          <CarouselItem
            key={item.key}
            className={cn(
              "flex items-center justify-center md:basis-1/3",
              className,
            )}
          >
            {children}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
