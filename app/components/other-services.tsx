import Image from "next/image";
import Link from "next/link";
import { FaCar, FaHotel, FaMotorcycle, FaShuttleVan } from "react-icons/fa";
import { FaHouse, FaTruckPlane } from "react-icons/fa6";

const OtherServices = () => {
  return (
    <section
      className="container mx-auto scroll-mt-20 pb-10 md:px-20"
      id="other-services"
    >
      <div className="rounded-md bg-[#63C8F6] py-5">
        <h2 className="p-4 text-center text-4xl font-semibold uppercase text-white">
          Other Service Offer
        </h2>
        <div className="flex flex-col justify-evenly gap-2 p-4 md:flex-row">
          <Link href="#transfers">
            <div className="flex w-full flex-col items-center rounded-md bg-white/20 p-4 text-white md:w-48">
              <FaTruckPlane className="size-24" />
              <p>Transfers</p>
            </div>
          </Link>
          <Link href="#rentals">
            <div className="flex w-full flex-col items-center rounded-md bg-white/20 p-4 text-white md:w-48">
              <FaShuttleVan className="size-24" />
              <p>Rentals</p>
            </div>
          </Link>

          <Link href="#accommodations">
            <div className="flex w-full flex-col items-center rounded-md bg-white/20 p-4 text-white md:w-48">
              <FaHouse className="size-24" />
              <p>Accomodations</p>
            </div>
          </Link>
        </div>
        {/* <button className="text-white bg-white/60 m-4 rounded-full p-4 text-2xl">
          Contact us
        </button> */}
      </div>
    </section>
  );
};

export default OtherServices;
