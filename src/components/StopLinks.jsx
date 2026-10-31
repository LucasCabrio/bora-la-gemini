import { ArrowUpRight } from "lucide-react";
export default function StopLinks({ stop }) {
  return (
    <div className="stop-links">
      <a href={stop.place.url} target="_blank" rel="noreferrer">
        Conheça o lugar <ArrowUpRight size={14} />
      </a>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${stop.place.latitude},${stop.place.longitude}`}
        target="_blank"
        rel="noreferrer"
      >
        Ver no mapa <ArrowUpRight size={14} />
      </a>
    </div>
  );
}
