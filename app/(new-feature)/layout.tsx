import { ReactNode } from "react";
import Hero from "../components/hero";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return <main className="container mx-auto p-4 md:px-20">{children}</main>;
};

export default MarketingLayout;
