import { AppError } from "../lib/http.js";
export function selectPlaces(data, language) {
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
    throw new AppError("Há poucos locais cadastrados perto dessa cidade. Experimente outra cidade.", 404);
  return places;
}
