import { locateCity, findPlaces } from "../../server/services/places.js";
import { getWeather } from "../../server/services/weather.js";
export async function checkExternal() {
for (const city of ["Curitiba"]) {
  try {
    const location = await locateCity(city);
    console.log("Geocoding OK:", location.name, location.state);
    const [weather, places] = await Promise.all([
      getWeather(location, "amanha"),
      findPlaces(location),
    ]);
    console.log("Clima OK:", weather.date, weather.min, weather.max);
    console.log(
      "Locais OK:",
      places.length,
      places.slice(0, 4).map((p) => p.name),
    );
    return {
      ok: true,
      location,
      weather,
      placeCount: places.length,
    };
  } catch (error) {
    return { ok: false, error: error.message };
    console.error(error.message);
  }
}
}
