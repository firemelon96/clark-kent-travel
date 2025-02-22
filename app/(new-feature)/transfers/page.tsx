import { HeroService } from "@/components/hero-service";
import { Transfer } from "./_components/transfer";
import { getTransfer } from "@/lib/utils";

const TransferPage = async () => {
  return (
    <div className="space-y-4">
      <HeroService title="Transfers" />
      <Transfer />
    </div>
  );
};

export default TransferPage;
