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
    <section
      className="container mx-auto scroll-mt-6 pb-16 text-center md:px-20 md:text-start"
      id="tours"
    >
      <OtherServicesList title="Transfers" services={transfers} />
      <OtherServicesList title="Rentals" services={rentals} />
      <AccomodationsList name="Accomodations" data={accomodationsData} />
      <MarianfeList name="Mariafe Inn" data={partnersData} />
    </section>
  );
};

export default Others;
