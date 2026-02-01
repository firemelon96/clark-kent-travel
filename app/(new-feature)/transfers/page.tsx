import { HeroService } from "@/components/hero-service";
import { Transfer } from "./_components/transfer";
import { Suspense } from "react";

const TransferPage = async () => {
  return (
    <section className="space-y-4">
      <HeroService
        title="Transfers"
        imageUrl="https://cdn.palawanwebsolutions.com/clarkkent/services/transfer.jpg"
      />
      <Suspense>
        <Transfer />
      </Suspense>
    </section>
  );
};

export default TransferPage;
