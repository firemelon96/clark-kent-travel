import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  title: string;
  imageUrl?: string;
  className?: string;
}

export const HeroService = ({ title, imageUrl, className }: Props) => {
  return (
    <section
      className={cn(
        "relative -z-10 flex h-[300px] w-full items-center justify-center overflow-hidden rounded-xl md:h-[200px]",
        className,
      )}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          fill
          alt="Palawan island"
          src={imageUrl || "/resources/hero.avif"}
          className="w-full object-cover object-top"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 mx-4 max-w-xl space-y-4 rounded-2xl bg-white/10 p-2 text-center tracking-widest text-white">
        <h1 className="text-3xl font-medium uppercase">{title}</h1>
      </div>
    </section>
  );
};
