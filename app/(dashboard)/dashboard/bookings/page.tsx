import { getUserBoookings } from "@/lib/data";
import { BookingCard } from "../../components/booking-card";
import { FilterBookings } from "../components/filter-bookings";

interface BookingProps {
  searchParams?: Promise<{
    limit: string;
    page: string;
  }>;
}

const Bookings = async ({ searchParams }: BookingProps) => {
  const params = await searchParams;
  const limit = Number(params?.limit) || 6;
  const page = Number(params?.page) || 1;
  const { data, count } = await getUserBoookings(page, limit);

  return (
    <div className="flex flex-col gap-2">
      <div className="leading-tight">
        <h2 className="text-xl font-bold tracking-wide">Bookings</h2>
        <span className="text-muted-foreground text-sm">
          List of the bookings
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {data.map((booking) => (
          <BookingCard
            bookingId={booking.id}
            key={booking.id}
            image={booking.tour.images[0]}
            title={booking.tour.title}
            from={booking.from}
            to={booking.to}
            travellerType={booking.traveller}
            status={booking.status}
            invoiceUrl={booking.invoiceUrl}
          />
        ))}
      </div>
      <FilterBookings count={count} />
    </div>
  );
};

export default Bookings;
