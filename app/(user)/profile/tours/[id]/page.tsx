import { Button } from "@/components/ui/button";
import { UpdateTourForm } from "./components/update-tour-form";
import { getFullTourById } from "@/lib/data";
import { notFound } from "next/navigation";

interface CreatePageProps {
  params: Promise<{ id: string }>;
}

const TourPage = async ({ params }: CreatePageProps) => {
  const { id } = await params;

  const tour = await getFullTourById(id);

  if (!tour) return notFound();

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* {JSON.stringify(tour)} */}
      <UpdateTourForm tourId={tour?.id} defaultValues={tour} />
    </div>
  );
};

export default TourPage;
