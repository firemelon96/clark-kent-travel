import Image from "next/image";
import { FaCar, FaMotorcycle, FaShuttleVan } from "react-icons/fa";
import { FaTruckPlane } from "react-icons/fa6";

const OtherServices = () => {
  return (
    <section className="container mx-auto pb-10 md:px-20">
      <div className="rounded-md bg-[#63C8F6] py-5">
        <h2 className="text-white p-4 text-4xl font-semibold uppercase">
          Other Service Offer
        </h2>
        <div className="flex flex-col justify-evenly gap-2 p-4 md:flex-row">
          <div className="text-white bg-white/20 flex w-full flex-col items-center rounded-md p-4 md:w-48">
            <FaTruckPlane className="size-24" />
            <p>Airport Transfers</p>
          </div>
          <div className="text-white bg-white/20 flex w-full flex-col items-center rounded-md p-4 md:w-48">
            <FaShuttleVan className="size-24" />
            <p>Van Rentals</p>
          </div>
          <div className="text-white bg-white/20 flex w-full flex-col items-center rounded-md p-4 md:w-48">
            <FaMotorcycle className="size-24" />
            <p>Motorcycle Rentals</p>
          </div>
          <div className="text-white bg-white/20 flex w-full flex-col items-center rounded-md p-4 md:w-48">
            <FaCar className="size-24" />
            <p>Car Rentals</p>
          </div>
        </div>
        {/* <button className="text-white bg-white/60 m-4 rounded-full p-4 text-2xl">
          Contact us
        </button> */}
      </div>
    </section>
  );
};

export default OtherServices;
