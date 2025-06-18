import { getUserBoookings } from "@/lib/data";
import { BookingCard } from "../../components/booking-card";

const Bookings = async () => {
  const bookings = await getUserBoookings();

  return (
    <div className="flex flex-col gap-2">
      <div className="leading-tight">
        <h2 className="text-xl font-bold tracking-wide">Bookings</h2>
        <span className="text-muted-foreground text-sm">
          List of the bookings
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {bookings.map((booking) => (
          <BookingCard
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
    </div>
  );
};

export default Bookings;
