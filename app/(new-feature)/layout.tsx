import { NewNavbar } from "@/components/new-navigation";
import { ReactNode } from "react";
import Footer from "../components/footer";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NewNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
