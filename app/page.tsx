import Navbar from "./components/navbar";
import Hero from "./components/hero";
import FeaturedTour from "./components/featured-tour";
import Footer from "./components/footer";
import Tours from "./components/tours";
import OtherServices from "./components/other-services";
import TripByLocation from "./components/trip-by-location";
import Contact from "./components/contact";
import ReviewsMap from "./components/reviewsMap";
import Others from "./components/others";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedTour />
      <Tours />
      <OtherServices />
      <Others />
      <ReviewsMap />
      <TripByLocation />
      <Contact />
      <Footer />
    </>
  );
}
