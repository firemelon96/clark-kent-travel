"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export const NavbarSingle = () => {
  const router = useRouter();

  return (
    <header className="relative z-9999">
      <div className="fixed left-0 top-0 z-10 w-full bg-[#E13179]">
        <div className="container mx-auto flex items-center justify-between xl:px-20">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-2 md:p-0">
              <Image
                width={80}
                height={80}
                src="https://cdn.palawanwebsolutions.com/clarkkent/logo.png"
                alt="clark kent travel logo"
                className="rounded-md bg-white"
              />
            </Link>
            <div className="text-white">
              <p className="text-lg font-semibold uppercase xl:text-3xl">
                Clark Kent
              </p>
              <p className="text-base font-normal tracking-widest xl:text-2xl">
                Travel and Tours
              </p>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-xs p-2 text-base text-sky-50 hover:bg-white/20"
            >
              {" "}
              <BsArrowLeft /> Go back
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
