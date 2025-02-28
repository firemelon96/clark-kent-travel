import { HeroService } from "@/components/hero-service";
import { Transfer } from "./_components/transfer";
import { getTransfer } from "@/lib/utils";

const TransferPage = async () => {
  return (
    <section className="space-y-4">
      <HeroService title="Transfers" imageUrl="/resources/van.jpg" />
      <Transfer />
    </section>
  );
};

export default TransferPage;
