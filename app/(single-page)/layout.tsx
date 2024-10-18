import { ReactNode } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Toaster } from "react-hot-toast";

const TourLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Footer />
    </>
  );
};

export default TourLayout;
