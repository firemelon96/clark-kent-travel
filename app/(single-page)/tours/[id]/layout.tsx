import { ReactNode } from "react";
import { NavbarSingle } from "./_components/navbar-single";

const SinglePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarSingle />
      {children}
    </>
  );
};

export default SinglePageLayout;
