import React from "react";

function TermsCondition() {
  return (
    <div className="m-4 mx-auto max-w-4xl space-y-10 rounded-md bg-white p-4 shadow-sm">
      <div className="">
        <h1 className="heading-rose">Terms and Conditions</h1>

        <h2 className="mt-5">Notes</h2>
        <ul className="list-inside list-disc pl-3">
          <li>
            For sharing/joiner trips, waiting time may vary depending on the
            arrival of other joiners.
          </li>
          <li>
            If the guest has a flight, please provide us with the flight details
            so we can offer the best itinerary.
          </li>
          <li>
            Clark Kent Travel and Tours is not accountable for any missed
            flights by guests.
          </li>
        </ul>
      </div>

      <div className="">
        <h3 className="heading-rose">
          Booking, Payment, Cancellation, and Refund Policies
        </h3>

        <ul className="mt-5 list-inside list-decimal pl-3">
          <li>
            All bookings must send through email at clarkkent_ts@yahoo.com or
            info.clarkkenttravelandtours@yahoo.com.
          </li>
          <li>
            A minimum of 50% down payment needed to confirm the booking for
            tours and transfers.
          </li>
          <li>
            Full payment must settle at least 3 days before the arrival date to
            avoid any inconvenience.
          </li>
          <li>
            Cancellation 72 hours prior to tour pick-up will be 100% charged.
          </li>
          <li>
            A full refund (Account Credit) will provide if the tours is canceled
            due to poor weather conditions as advised by the Coast Guard.
          </li>
          <li>Abrupt cancellations of tours are subject to 50% refund only.</li>
          <li>For an official receipt, an added 15% tax will be charge.</li>
          <li>
            Any changes made to a confirmed reservation will incur a ₱1,500
            handling fee per booking, in addition to any land arrangement
            amendment fee.
          </li>
          <li>
            Refunds will be process and issued within 30 days from the refund
            request date, subject to applicable costs.
          </li>
        </ul>
      </div>

      <p>
        We look forward to serving you and thank you for your continued trust
        and support.
      </p>
    </div>
  );
}

export default TermsCondition;
