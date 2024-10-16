import {
  getDayTours,
  getServicesByType,
  getToursByLocation,
} from "../lib/helpers";
import { OtherServicesList } from "./other-services-list";
import { TourLists } from "./tour-lists";

const Tours = () => {
  const coronTours = getToursByLocation("coron");
  const puertoTours = getToursByLocation("Puerto");
  const elnidoTours = getToursByLocation("el nido");
  const portBartonTours = getToursByLocation("port barton");
  const boholTours = getToursByLocation("bohol");
  const transfers = getServicesByType("transfer");
  const rentals = getServicesByType("rentals");

  return (
    <section
      className="container mx-auto mt-80 scroll-mt-6 pb-16 text-center md:px-20 md:text-start"
      id="tours"
    >
      <TourLists title="Puerto Princesa, Palawan" tours={puertoTours} />
      <TourLists title="El nido Palawan" tours={elnidoTours} />
      <TourLists title="Coron Palawan" tours={coronTours} />
      <TourLists title="Port Barton, Palawan" tours={portBartonTours} />
      <TourLists title="Bohol" tours={boholTours} />
      {/* component should not be named as tourlist */}
      <OtherServicesList title="Transfers" services={transfers} />
      <OtherServicesList title="Rentals" services={rentals} />
    </section>
  );
};

export default Tours;
