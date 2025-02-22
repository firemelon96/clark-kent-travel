import { Filter } from "@/components/filter";
import { ServiceLabel } from "@/components/service-label";

export const RentalsClient = () => {
  return (
    <section className="space-y-4">
      <ServiceLabel
        label="Car and Motorcycle Rentals"
        subHeading="Less hustle exploring the city."
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <Filter />
      </div>
    </section>
  );
};
