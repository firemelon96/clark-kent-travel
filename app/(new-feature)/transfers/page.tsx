import { transfer_services } from "@/app/data/logistics";
import { ServiceLabel } from "@/components/service-label";

const TransferPage = () => {
  return (
    <section>
      <ServiceLabel label="Transfers" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {transfer_services.map((transfer) => (
          <p key={transfer.service_name}>{transfer.service_name}</p>
        ))}
      </div>
    </section>
  );
};

export default TransferPage;
