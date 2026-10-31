import { getJson, AppError } from "../lib/http.js";
import { weatherLabel } from "../lib/weatherLabel.js";
export { weatherLabel } from "../lib/weatherLabel.js";
export async function getWeather(location, day) {
  const query = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code",
    timezone: location.timezone,
    forecast_days: "2",
  });
  const { daily } = await getJson(`https://api.open-meteo.com/v1/forecast?${query}`);
  const index = day === "amanha" ? 1 : 0;
  if (!daily?.time?.[index]) throw new AppError("Previsão indisponível para a data solicitada.");
  const min = daily.temperature_2m_min[index],
    max = daily.temperature_2m_max[index],
    rain = daily.precipitation_probability_max[index],
    code = daily.weather_code[index];
  if (![min, max, rain, code].every(Number.isFinite))
    throw new AppError("A previsão retornou dados incompletos. Tente novamente.");
  return {
    date: daily.time[index],
    min,
    max,
    rain,
    code,
    label: weatherLabel(code),
    timezone: location.timezone,
    source: "Open-Meteo",
  };
}
