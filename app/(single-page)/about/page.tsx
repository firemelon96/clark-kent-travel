import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About us",
  description:
    "CLARK KENT TRAVEL AND TOURS, a Department of Tourism (DOT) and City Tourism Office (CTO) Accredited tour operator owned by Mrs. Kathlyn Poquis- Cayabyab and Mr. Chris Salazar Cayabyab. CLARK KENT TRAVEL AND TOURS offers excursions, primarily around Palawan to local and foreign tourists from around the world. Its main office is located in City proper at Manalo Extension, Bgy. Milagrosa, Puerto Princesa City, Palawan. The business currently has five (5) office staff and five (5) tour guides as human resources in Puerto Princesa City only not included in El Nido.",
};

const About = () => {
  return (
    <div className="container mx-auto mt-10 space-y-4 md:px-20">
      <h1 className="pt-20 text-center text-3xl font-semibold text-rose-500 md:px-20">
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
          the Clark Kent Tourist Boat in El Nido, Palawan and Mariafe Inn and
          Clark Kent Tourist Van Transport in Puerto Princesa City, Palawan.
          CLARK KENT TRAVEL AND TOURS also manages several social media
          accounts, which serves as a channel for the booking officers and
          guests to discuss transactions regarding the tours offered by the
          business. The social media accounts are the following: Facebook:{" "}
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

      <div className="mx-auto flex max-w-3xl flex-col text-center">
        <h2 className="pb-5 text-xl font-semibold">VISION</h2>
        <p className="">
          Our vision is being recognized for the high quality of our services
          and to be the compass guiding wanderers to the heart of their travel
          aspirations.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col text-center">
        <h2 className="pb-5 text-xl font-semibold">MISION</h2>
        <p>
          Our mission is to turn wanderlust into lifelong memories and to serve
          our customers by ensuring their complete satisfaction and providing
          the best tourism services while remaining committed to our
          country&apos;s social, cultural, and environmental aspects.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col text-start">
        <h2 className="pb-5 text-center text-xl font-semibold">
          OUR CORE VALUES
        </h2>

        <ul className="list-inside list-disc">
          <li>
            Honesty- It is critical for us as a company that the information we
            provide to our customers is honest and correct.
          </li>
          <li>Services Quality</li>
          <li>Open to feedback</li>
          <li>
            Integrity: Upholding honesty and transparency in all dealings.
          </li>
          <li>
            Customer-Centric: Prioritizing exceptional service and customer
            satisfaction.
          </li>
          <li>
            Reliability: Ensuring consistent and dependable travel experiences.
          </li>
          <li>
            Passion for Exploration: Inspiring and enabling a love for travel
            and discovery
          </li>
          <li>
            Community and Environment: Promoting responsible and sustainable
            travel practices.
          </li>
        </ul>
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
