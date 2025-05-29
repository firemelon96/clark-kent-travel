import Image from "next/image";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

export const Hero = () => {
  return (
    <section className="relative -z-10 flex h-[500px] w-full items-center justify-center overflow-hidden md:h-[400px]">
      <div className="absolute inset-0 h-full w-full">
        <Image
          fill
          alt="Palawan island"
          src="/resources/hero.avif"
          className="w-full object-cover object-top"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 mx-4 max-w-xl space-y-4 rounded-2xl bg-white/10 p-2 text-center text-white">
        <h1 className="text-4xl font-semibold uppercase lg:text-5xl">
          Let your memory be your travel bag.
        </h1>
      </div>
    </section>
  );
};
