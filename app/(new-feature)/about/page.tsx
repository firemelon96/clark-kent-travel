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
      <div className="mx-auto mt-5 flex max-w-4xl gap-4">
        <div className="rounded-full bg-slate-200">
          <Image src={""} width={300} height={300} alt="Owner" />
        </div>
        <div className="flex flex-col justify-center">
          <p>
            <strong>Owner :</strong> Mrs. Kathlyn Poquis-Cayabyab
          </p>
          <p>
            <strong>Head Office :</strong> Manalo Extension, Bgy. Milagrosa,
            <br />
            Puerto Princesa City, Palawan, Philippines
          </p>
        </div>
      </div>

      <h1 className="text-center text-3xl font-semibold text-rose-500 md:px-20">
        Company Background
      </h1>

      <div className="mx-auto max-w-5xl space-y-4 pb-10">
        <p>
          Clark Kent Travel and Tours is a Department of Tourism (DOT), City
          Tourism Office (CTO) accredited, and PhilGEPS registered tour
          operator, proudly owned and managed by Mrs. Kathlyn Poquis-Cayabyab.
        </p>
        <p>
          The company first began as a booking office on January 13, 2014, and
          officially expanded as a tour operator on January 15, 2020.
        </p>
        <p>
          With more than a decade of experience in the travel and tourism
          industry, the company has earned a formidable reputation for providing
          quality, reliable, and memorable travel experiences to both local and
          international tourists visiting Palawan.
        </p>
      </div>

      <h2 className="text-center text-3xl font-semibold text-rose-500 md:px-20">
        Reputation
      </h2>

      <div className="mx-auto max-w-5xl pb-10 text-center">
        <p>
          Through excellent service and consistent positive feedback, Clark Kent
          Travel and Tours have become a highly recommended tour operator in
          Palawan. Guests consistently commend the company for professionalism,
          reliability, and memorable travel experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
