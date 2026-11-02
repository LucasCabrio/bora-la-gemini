// Valida locais, orçamento e horários do roteiro e calcula os totais e o saldo por pessoa.
import { planSchema } from "./schemas.js";
export { requestSchema } from "./schemas.js";
export function validatePlan(raw, places, request) {
  const plan = planSchema.parse(raw);
  const ids = new Set();
  const stops = plan.stops.map((stop) => {
    const place = places.find((p) => p.id === stop.placeId);
    if (!place || ids.has(place.id))
      throw new Error("Escolha locais distintos da lista retornada pela ferramenta.");
    ids.add(place.id);
    return { ...stop, place };
  });
  const total = stops.reduce((sum, stop) => sum + stop.cost, 0) + plan.food + plan.transport;
  if (total > request.budget) throw new Error("O total por pessoa excede o orçamento. Refaça os valores.");
  for (let i = 1; i < stops.length; i++) {
    const minutes = (s) => Number(s.time.slice(0, 2)) * 60 + Number(s.time.slice(3));
    if (minutes(stops[i]) < minutes(stops[i - 1]) + stops[i - 1].duration)
      throw new Error("As paradas precisam ter horários em sequência, sem sobreposição.");
  }
  return {
    ...plan,
    stops,
    total,
    groupTotal: total * request.people,
    remaining: request.budget - total,
  };
}
