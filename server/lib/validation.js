import { z } from 'zod';
export const requestSchema = z.object({
  city: z.string().trim().min(2).max(80),
  budget: z.number().int().min(0).max(2000),
  people: z.number().int().min(1).max(10),
  day: z.enum(['hoje', 'amanha']),
  interest: z.enum(['cultura', 'natureza', 'misturado']),
  notes: z.string().trim().max(350).default(''),
});
export const planSchema = z.object({
  title: z.string().min(3).max(100),
  summary: z.string().min(10).max(700),
  weatherAdvice: z.string().min(10).max(500),
  backup: z.string().min(10).max(600),
  stops: z.array(z.object({
    placeId: z.number().int(),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    duration: z.number().int().min(15).max(180),
    activity: z.string().min(10).max(600),
    cost: z.number().int().min(0).max(2000),
  })).min(2).max(3),
  food: z.number().int().min(0).max(2000),
  transport: z.number().int().min(0).max(2000),
});
export function validatePlan(raw, places, request) {
  const plan = planSchema.parse(raw);
  const ids = new Set();
  const stops = plan.stops.map(stop => {
    const place = places.find(p => p.id === stop.placeId);
    if (!place || ids.has(place.id)) throw new Error('Escolha locais distintos da lista retornada pela ferramenta.');
    ids.add(place.id);
    return { ...stop, place };
  });
  const total = stops.reduce((sum, stop) => sum + stop.cost, 0) + plan.food + plan.transport;
  if (total > request.budget) throw new Error('O total por pessoa excede o orçamento. Refaça os valores.');
  for (let i = 1; i < stops.length; i++) {
    const minutes = s => Number(s.time.slice(0, 2)) * 60 + Number(s.time.slice(3));
    if (minutes(stops[i]) < minutes(stops[i - 1]) + stops[i - 1].duration) throw new Error('As paradas precisam ter horários em sequência, sem sobreposição.');
  }
  return { ...plan, stops, total, groupTotal: total * request.people, remaining: request.budget - total };
}
