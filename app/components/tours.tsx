import { getDayTours, getToursByLocation } from "../lib/helpers";
import { TourLists } from "./tour-lists";

const Tours = () => {
  const coronTours = getToursByLocation("coron");
  const puertoTours = getToursByLocation("Puerto");
  const elnidoTours = getToursByLocation("el nido");
  const portBartonTours = getToursByLocation("port barton");
  const boholTours = getToursByLocation("bohol");
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
    </section>
  );
};

export default Tours;
