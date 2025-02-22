import { ServiceLabel } from "@/components/service-label";
import { reviews } from "../data/reviews";
import { ReviewCard } from "./review-card";

export const Testimonials = () => {
  return (
    <section className="scroll-mt-6 space-y-4 md:text-start" id="tours">
      <ServiceLabel
        label="Testimonials"
        subHeading="What our traveller are saying..."
      />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard
            key={review.name}
            imageUrl={review.image}
            name={review.name}
            title={review.title}
            message={review.message}
          />
        ))}
      </div>
    </section>
  );
};
