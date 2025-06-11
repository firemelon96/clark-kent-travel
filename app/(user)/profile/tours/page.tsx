import { Button } from "@/components/ui/button";

import { getTours } from "@/lib/data";
import Link from "next/link";
import { TourTable } from "./components/tour-table";

const TourPage = async () => {
  const tours = await getTours();

  if (!tours) return;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex justify-between space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Tours</h1>
          <p className="text-muted-foreground text-xs">
            Manage your tour listings.
          </p>
        </div>
        <Button asChild>
          <Link href="/profile/tours/create">Create</Link>
        </Button>
      </div>
      <TourTable tours={tours} />
    </div>
  );
};

export default TourPage;
