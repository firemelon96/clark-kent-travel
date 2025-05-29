import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About us",
  description:
    "CLARK KENT TRAVEL AND TOURS, a Department of Tourism (DOT) and City Tourism Office (CTO) Accredited tour operator owned by Mrs. Kathlyn Poquis- Cayabyab and Mr. Chris Salazar Cayabyab. CLARK KENT TRAVEL AND TOURS offers excursions, primarily around Palawan to local and foreign tourists from around the world. Its main office is located in City proper at Manalo Extension, Bgy. Milagrosa, Puerto Princesa City, Palawan. The business currently has five (5) office staff and five (5) tour guides as human resources in Puerto Princesa City only not included in El Nido.",
};

const About = () => {
  return (
    <div className="container mx-auto space-y-4 md:px-20">
      <h1 className="pt-10 text-center text-3xl font-semibold text-rose-500 md:px-20">
        Company Profile
      </h1>

      <div className="mx-auto max-w-6xl space-y-4 pb-10">
        <p>
          <span className="font-semibold">CLARK KENT TRAVEL AND TOURS</span>, a
          Department of Tourism (DOT) and City Tourism Office (CTO) Accredited
          tour operator owned by Mrs. Kathlyn Poquis- Cayabyab and Mr. Chris
          Salazar Cayabyab.{" "}
          <span className="font-semibold">CLARK KENT TRAVEL AND TOURS</span>{" "}
          offers excursions, primarily around Palawan to local and foreign
          tourists from around the world. Its main office is located in City
          proper at Manalo Extension, Bgy. Milagrosa, Puerto Princesa City,
          Palawan. The business currently has five (5) office staff and five (5)
          tour guides as human resources in Puerto Princesa City only not
          included in El Nido.
        </p>
        <p>
          <span className="font-semibold">CLARK KENT TRAVEL AND TOURS</span> has
          been a booking office since January 13, 2014, and it was upgraded as a
          Tour Operator in Puerto Princesa City on January 15, 2020. They own
          the Clark Kent Tourist Boat in El Nido, Palawan, Short term rentals
          Homestay/Apartmente, Motorcycle and Car Rentals, and Clark Kent
          Tourist Van Transport in Puerto Princesa City, Palawan. CLARK KENT
          TRAVEL AND TOURS also manages several social media accounts, which
          serves as a channel for the booking officers and guests to discuss
          transactions regarding the tours offered by the business. The social
          media accounts are the following: Facebook:{" "}
          <span className="font-semibold">
            CLARK KENT TRAVEL AND TOURS & TICKETING SERVICES
          </span>{" "}
          with 5-star reviews since 2014. Instagram:{" "}
          <span className="font-semibold">@clarkkenttravelandtours</span>
          and Email: clarkkent_ts@yahoo.com
        </p>
        <p>
          <span className="font-semibold">CLARK KENT TRAVEL AND TOURS</span> is
          a local tour operator offering{" "}
          <span className="font-semibold">
            Underground River tours, Honda Bay Tours, Puerto Princesa City
            Tours, Firefly watching Tours, Ugong Rock and Sabang Zipline,
            Mangrove paddle-boat, Dos Palmas day tours, Van Transportation, El
            Nido Island Hoping, Coron Island Hoping, Balabac Tour, Port Barton
            Tours, Van/ Car / Motorcycle Rental, Domestic and International
            Airline Ticket and Domestic and International Hotel Booking.
          </span>{" "}
          We are also a highly recommended tour operator in Palawan due to the
          positive feedback and satisfaction of our guests during their stays in
          Palawan.
        </p>
      </div>

      <h1 className="pt-20 text-center text-3xl font-semibold text-rose-500 md:px-20">
        Legalities
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <Image
          src="/resources/legal/dot.png"
          alt="dot"
          width={600}
          height={600}
        />
        <Image
          src="/resources/legal/dti.png"
          alt="dti"
          width={600}
          height={600}
        />
        <Image
          src="/resources/legal/permit.png"
          alt="permit"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
};

export default About;
