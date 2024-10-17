import { ReactNode } from "react";
import { NavbarSingle } from "../../tours/[id]/_components/navbar-single";

const SinglePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarSingle />
      {children}
    </>
  );
};

export default SinglePageLayout;
