import { Hero } from "../components/hero";
import FeaturedCard from "../components/featured-tour";
import Tours from "../components/tours";
import OtherServices from "../components/other-services";
import TripByLocation from "../components/trip-by-location";
import { SearchBar } from "@/components/search-bar";
import { Testimonials } from "../components/testimonials";
import { getGoogleReviews } from "@/actions/google-reviews";
import { PromoBanner } from "@/components/promo-banner";

export default async function Home() {
  const reviews = await getGoogleReviews();

  return (
    <>
      <Hero />
      <SearchBar />
      <main className="container mx-auto space-y-14 p-4 md:px-20">
        <PromoBanner />
        <FeaturedCard />
        <Tours />
        <OtherServices />
        <Testimonials reviews={reviews} />
        <TripByLocation />
      </main>
    </>
  );
}
