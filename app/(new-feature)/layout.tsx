import { ReactNode } from "react";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return <main className="container mx-auto p-4 md:px-20">{children}</main>;
};

export default MarketingLayout;
