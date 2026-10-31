import { getJson, AppError } from "../lib/http.js";
export async function locateCity(city) {
  const query = new URLSearchParams({
    name: city,
    count: "5",
    language: "pt",
    countryCode: "BR",
    format: "json",
  });
  const data = await getJson(`https://geocoding-api.open-meteo.com/v1/search?${query}`);
  const found = data.results?.[0];
  if (!found)
    throw new AppError(
      "Cidade não encontrada. Informe apenas o nome de uma cidade brasileira, por exemplo: Curitiba.",
      404,
    );
  return {
    name: found.name,
    state: found.admin1,
    country: found.country,
    latitude: found.latitude,
    longitude: found.longitude,
    timezone: found.timezone,
  };
}
