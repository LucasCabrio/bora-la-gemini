import { CloudSun } from "lucide-react";
import { dateLabel } from "../lib/format";
export default function WeatherCard({ weather, plan, mode }) {
  return (
    <div className="weather-card">
      <div className="card-label">
        <CloudSun size={20} /> PREVISÃO DO TEMPO
      </div>
      <div className="temperature">
        {Math.round(weather.max)}°<span>/ {Math.round(weather.min)}°</span>
        <CloudSun size={48} strokeWidth={1.3} />
      </div>
      <div className="weather-description">
        {weather.label}
        <span>{weather.rain}% de chuva</span>
      </div>
      <p>{plan.weatherAdvice}</p>
      <small>
        {mode === "demo" ? "Previsão simulada para demonstração" : `Open-Meteo · ${dateLabel(weather.date)}`}
      </small>
    </div>
  );
}
