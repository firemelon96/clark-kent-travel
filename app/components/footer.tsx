"use client";

import Image from "next/image";
import { BiPhone } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaViber } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { tours } from "../data/tours";
import Link from "next/link";
import { RiWhatsappFill } from "react-icons/ri";
import { PiVibrateFill } from "react-icons/pi";
import { SiViber } from "react-icons/si";
import { menuItems } from "@/components/new-navigation";
import { ServiceLabel } from "@/components/service-label";

const Footer = () => {
  return (
    <footer className="bg-sky-200">
      <div className="container mx-auto p-4 md:px-20">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
            <div className="">
              <Image
                src="/resources/logo.png"
                width={120}
                height={120}
                alt="clark kent travel logo"
              />
            </div>
            <div className="text-center text-slate-500 md:text-start">
              <h6 className="text-2xl font-semibold text-[#E13179]">
                CLARK KENT
              </h6>
              <span className="text-xl font-medium text-[#E13179]">
                Travel and Tours
              </span>
              <p className="text-base text-[#E13179]/75">
                GSFM Bldg., Manalo Street, Puerto Princesa City,Palawan
              </p>
              <span className="text-base text-[#E13179]/75">Palawan 5300</span>
            </div>
            <h6 className="text-[#E13179]">Accredited by</h6>
            <div className="flex flex-row items-center gap-2">
              <Link href="https://beta.tourism.gov.ph/">
                <Image
                  src="/resources/dot.jpg"
                  width={50}
                  height={50}
                  alt="department of tourism"
                  className="rounded-full object-contain"
                />
              </Link>
              <Link href="https://www.dti.gov.ph/">
                <Image
                  src="/resources/dti.png"
                  width={50}
                  height={50}
                  alt="department of trade and industry"
                  className="object-contain"
                />
              </Link>
              <Link href="https://www.puertoprincesatourism.com/">
                <Image
                  src="/resources/citytourism.jpg"
                  width={50}
                  height={50}
                  alt="department of trade"
                  className="rounded-full object-contain"
                />
              </Link>
              <Link href="https://www.itsmorefuninthephilippines.co.uk/">
                <Image
                  src="/resources/loveph.png"
                  width={50}
                  height={50}
                  alt="department of trade"
                  className="object-contain"
                />
              </Link>
              <Link href="https://notices.philgeps.gov.ph/">
                <Image
                  src="/resources/philgeps.png"
                  width={50}
                  height={50}
                  alt="philgeps"
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 p-2">
            <span className="text-2xl font-semibold uppercase text-[#E13179]">
              Contact Details
            </span>
            <ul className="flex w-fit flex-col items-center text-base text-[#E13179]/70 md:items-center">
              <li className="flex items-center space-x-2">
                <RiWhatsappFill /> <span>0955-294-6691</span>
              </li>
              <li className="flex items-center space-x-2">
                <SiViber /> <span>0955-294-6691</span>
              </li>
              <li className="flex items-center space-x-2">
                <BiPhone /> <span>0917-302-8053</span>
              </li>
              <li className="flex items-center space-x-2">
                <MdEmail />{" "}
                <span className="text-base">clarkkent_ts@yahoo.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaFacebook />{" "}
                <span className="flex-1 text-base">
                  Clark Kent Travel and Tours & Ticketing Services
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <FaInstagram />{" "}
                <span className="flex-1 text-base">
                  @clarkkenttravelandtours
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-2xl font-semibold uppercase text-[#E13179]">
              Useful Links
            </span>
            <div className="flex gap-4 text-start text-base text-[#E13179]/75 md:flex-col md:text-end">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <div className="flex flex-col space-y-2">
                      <span className="text-lg font-semibold">
                        {item.title}
                      </span>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="text-sm text-rose-500 hover:text-rose-500/80"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-lg font-semibold hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center border-t border-sky-300 py-2 text-sm text-slate-500">
        <p> &copy; Copyright 2024. All Rights Reserved.</p>
        <span>Design and developed by: Almujahid Jamion</span>
      </div>
    </footer>
  );
};

export default Footer;
