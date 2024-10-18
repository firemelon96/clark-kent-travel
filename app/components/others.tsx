import { accomodations } from "../data/accomodations";
import { partners } from "../data/partners";
import { getServicesByType } from "../lib/helpers";
import { AccomodationsList } from "./accomodations-list";
import { MarianfeList } from "./mariafe-list";
import { OtherServicesList } from "./other-services-list";

const Others = () => {
  const transfers = getServicesByType("transfer");
  const rentals = getServicesByType("rentals");
  const accomodationsData = accomodations.map((accomodation) => ({
    ...accomodation,
  }));
  const partnersData = partners.map((partner) => ({ ...partner }));

  return (
    <>
      <section
        className="container mx-auto scroll-mt-10 text-center md:px-20 md:text-start"
        id="transfers"
      >
        <OtherServicesList title="Transfers" services={transfers} />
      </section>
      <section
        className="container mx-auto scroll-mt-6 text-center md:px-20 md:text-start"
        id="rentals"
      >
        <OtherServicesList title="Rentals" services={rentals} />
      </section>
      <section
        className="container mx-auto scroll-mt-6 text-center md:px-20 md:text-start"
        id="accommodations"
      >
        <AccomodationsList name="Accomodations" data={accomodationsData} />
      </section>
      <section
        className="container mx-auto scroll-mt-6 text-center md:px-20 md:text-start"
        id="partners"
      >
        <MarianfeList name="Mariafe Inn" data={partnersData} />
      </section>
    </>
  );
};

export default Others;
