import { getJson, AppError } from "../lib/http.js";
export async function locateCity(city) {
  const query = new URLSearchParams({
    name: city,
    count: "5",
    language: "pt",
    countryCode: "BR",
    format: "json",
  });
  const data = await getJson(
    `https://geocoding-api.open-meteo.com/v1/search?${query}`,
  );
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
    data = await getJson(
      `https://pt.wikipedia.org/w/api.php?${query}`,
      options,
    );
  } catch {
    data = { error: true };
  }
  // A edição em inglês é uma alternativa explícita quando a busca em português falha.
  if (data.error || !data.query?.geosearch?.length) {
    language = "en";
    data = await getJson(
      `https://en.wikipedia.org/w/api.php?${query}`,
      options,
    );
  }
  if (data.error)
    throw new AppError("A busca de locais está indisponível. Tente novamente.");
  const all = (data.query?.geosearch ?? []).map((p) => ({
    id: p.pageid,
    name: p.title,
    distance: Math.round(p.dist),
    latitude: p.lat,
    longitude: p.lon,
    language,
    url: `https://${language}.wikipedia.org/?curid=${p.pageid}`,
  }));
  // Geosearch retorna artigos, não um catálogo de atrações. Priorizamos títulos de interesse turístico.
  const preferred = all.filter((p) =>
    /parque|museu|jardim|praça|teatro|centro cultural|mercado|memorial|catedral|palácio|biblioteca|pinacoteca|igreja|monumento|passeio|bosque|park|museum|garden|cathedral|palace|theat|library|square|opera|cultural/i.test(
      p.name,
    ),
  );
  const places = (preferred.length >= 2 ? preferred : all).slice(0, 18);
  if (places.length < 2)
    throw new AppError(
      "Há poucos locais cadastrados perto dessa cidade. Experimente outra cidade.",
      404,
    );
  return places;
}
