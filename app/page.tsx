import Navbar from "./components/navbar";
import Hero from "./components/hero";
import FeaturedCard from "./components/featured-tour";
import Footer from "./components/footer";
import Tours from "./components/tours";
import OtherServices from "./components/other-services";
import TripByLocation from "./components/trip-by-location";
import Contact from "./components/contact";
import ReviewsMap from "./components/reviewsMap";
import Others from "./components/others";
import { SearchBar } from "@/components/search-bar";
import { Testimonials } from "./components/testimonials";

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <SearchBar />
      <main className="container mx-auto space-y-14 p-4 md:px-20">
        <FeaturedCard />
        <Tours />
        <OtherServices />
        {/* <Others /> */}
        {/* <ReviewsMap /> */}
        <Testimonials />
        <TripByLocation />
        {/* <Contact /> */}
      </main>
    </>
  );
}
