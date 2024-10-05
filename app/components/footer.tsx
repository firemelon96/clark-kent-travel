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

const Footer = () => {
  return (
    <footer className="bg-sky-200">
      <div className="container mx-auto grid grid-cols-1 gap-4 py-20 text-center md:grid-cols-3 md:px-20 md:text-start">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="">
            <Image
              src="/resources/logo.png"
              width={120}
              height={120}
              alt="clark kent travel logo"
            />
          </div>
          <div className="text-slate-500">
            <h6 className="text-2xl font-semibold text-[#E13179]">
              CLARK KENT
            </h6>
            <span className="text-xl font-medium text-[#E13179]">
              Travel and Tours
            </span>
            <p className="text-base text-[#E13179]/75">
              Lagan St., Puerto Princesa City
            </p>
            <span className="text-base text-[#E13179]/75">Palawan 5300</span>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <span className="text-2xl font-semibold uppercase text-[#E13179]">
            Contact Details
          </span>
          {/* TODO: Add proper links to this list */}
          <ul className="flex flex-col items-center text-base text-[#E13179]/70 md:items-start">
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
              <span className="flex-1 text-base">@clarkkenttravelandtours</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:items-end">
          <span className="text-2xl font-semibold uppercase text-[#E13179]">
            Useful links
          </span>
          <ul className="flex flex-col text-base text-[#E13179]/75 md:text-end">
            {tours.map((tour) => (
              <li key={tour.tourId}>
                <Link
                  href={`tours/${tour.tourId}`}
                  className="hover:text-sky-500 hover:underline"
                >
                  {tour.tourName}
                </Link>
              </li>
            ))}
          </ul>
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
