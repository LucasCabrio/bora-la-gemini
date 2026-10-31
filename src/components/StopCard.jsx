import StopLinks from "./StopLinks";
import { money } from "../lib/format";
export default function StopCard({ stop, i }) {
  return (
    <article className="stop" key={stop.placeId}>
      <div className="stop-marker">{String(i + 1).padStart(2, "0")}</div>
      <div className="stop-content">
        <div className="stop-top">
          <span>
            {stop.time} <span>· {stop.duration} min</span>
          </span>
          <span className={`cost-tag ${stop.cost === 0 ? "free" : ""}`}>
            {stop.cost === 0 ? "Sem gasto previsto" : `~ ${money(stop.cost)}`}
          </span>
        </div>
        <h4>{stop.place.name}</h4>
        <p>{stop.activity}</p>
        <StopLinks stop={stop} />
      </div>
    </article>
  );
}
