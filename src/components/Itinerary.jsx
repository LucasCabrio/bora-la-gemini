import PlanHeading from "./PlanHeading";
import StopCard from "./StopCard";
import PlanNote from "./PlanNote";
export default function Itinerary({ plan, location, weather, request }) {
  return (
    <div className="itinerary">
      <PlanHeading location={location} weather={weather} plan={plan} request={request} />
      <div className="stops">
        {plan.stops.map((stop, i) => (
          <StopCard stop={stop} i={i} />
        ))}
      </div>
      <PlanNote />
    </div>
  );
}
