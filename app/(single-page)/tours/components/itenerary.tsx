interface IteneraryProps {
  itineraries: {
    name: string;
    activities: string[];
  }[];
}

const Itenerary = ({ itineraries }: IteneraryProps) => {
  return (
    <div className="bg-sky-50 space-y-2 rounded-md p-4">
      <h2 className="text-sky-800 text-xl font-semibold uppercase">
        Itinerary
      </h2>
      {itineraries.map((itinerary) => (
        <div key={itinerary.name} className="space-y-4">
          <h3 className="text-slate-600 text-lg">{itinerary.name}</h3>
          <ul className="text-md text-slate-600 list-inside list-disc">
            {itinerary.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Itenerary;
