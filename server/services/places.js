import { getJson, AppError } from "../lib/http.js";
import { selectPlaces } from "./selectPlaces.js";
export { locateCity } from "./location.js";
export async function findPlaces(location) {
  const query = new URLSearchParams({
    action: "query",
    list: "geosearch",
    gscoord: `${location.latitude}|${location.longitude}`,
    gsradius: "10000",
    gslimit: "40",
    gsnamespace: "0",
    format: "json",
  });
  let data,
    language = "pt";
  const options = {
    headers: {
      "User-Agent": "BoraLaAcademic/1.0 (educational local trip planner)",
    },
  };
  try {
    data = await getJson(`https://pt.wikipedia.org/w/api.php?${query}`, options);
  } catch {
    data = { error: true };
  }
  // A edição em inglês é uma alternativa explícita quando a busca em português falha.
  if (data.error || !data.query?.geosearch?.length) {
    language = "en";
    data = await getJson(`https://en.wikipedia.org/w/api.php?${query}`, options);
  }
  if (data.error) throw new AppError("A busca de locais está indisponível. Tente novamente.");
  return selectPlaces(data, language);
}
