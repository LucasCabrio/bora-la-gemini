import { MapPin, CloudSun, Wallet } from "lucide-react";
export default function ValueStrip() {
  return (
    <div className="value-strip">
      <span>
        <MapPin size={17} /> Locais próximos
      </span>
      <span>
        <CloudSun size={18} /> Previsão do tempo
      </span>
      <span>
        <Wallet size={17} /> Estimativa de gastos
      </span>
    </div>
  );
}
