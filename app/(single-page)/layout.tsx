import { ReactNode } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import RecommendedTours from "../components/recommended-tours";

const TourLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}

      <Footer />
    </>
  );
};

export default TourLayout;
