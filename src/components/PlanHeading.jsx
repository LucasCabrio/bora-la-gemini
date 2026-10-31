import { MapPin, Clock3, Wallet } from "lucide-react";
import { money, dateLabel } from "../lib/format";
export default function PlanHeading({ location, weather, plan, request }) {
  return (
    <div className="itinerary-heading">
      <span className="location-label">
        <MapPin size={14} />
        {location.name}, {location.state} <span>·</span> {dateLabel(weather.date)}
      </span>
      <h3>{plan.title}</h3>
      <p>{plan.summary}</p>
      <div className="meta-chips">
        <span>
          <Clock3 size={14} />
          {plan.stops.length} paradas
        </span>
        <span>
          <Wallet size={14} />
          Até {money(request.budget)} por pessoa
        </span>
      </div>
    </div>
  );
}
