import Image from "next/image";
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi";

const Hero = () => {
  return (
    <section className="mt-16 flex max-h-[755px] w-full overflow-hidden bg-red-300">
      <div className="relative h-[440px] w-full">
        <Image
          unoptimized
          fill
          alt="Palawan island"
          src="/resources/hero.avif"
          className="w-full object-cover object-top"
          priority
        />

        <div className="absolute inset-y-0 left-5 flex items-center text-sky-50 sm:left-36 2xl:left-80">
          <div className="space-y-2">
            {/* <span className="text-rose-500 text-3xl">Let your</span> */}
            <h1 className="text-4xl font-semibold uppercase lg:text-7xl">
              Let your <span className="text-rose-300">Memory</span>
            </h1>
            <p className="text-3xl font-semibold uppercase lg:text-6xl">
              Be your <span className="text-rose-300">travel bag</span>.
            </p>
            {/* <p className="stroke-slate-500 stroke-1 text-xl font-semibold text-[#fff]">
              Experience budget friendly with quality tours and hussle free
            </p> */}

            <Link href="#tours">
              <button className="group mt-5 flex items-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold tracking-wider">
                EXPLORE NOW{" "}
                <BiChevronRight className="ml-2 group-hover:animate-ping" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
