import { z } from "zod";
export const requestSchema = z.object({
  city: z.string().trim().min(2).max(80),
  budget: z.number().int().min(0).max(2000),
  people: z.number().int().min(1).max(10),
  day: z.enum(["hoje", "amanha"]),
  interest: z.enum(["cultura", "natureza", "misturado"]),
  notes: z.string().trim().max(350).default(""),
});
export const planSchema = z.object({
  title: z.string().min(3).max(100),
  summary: z.string().min(10).max(700),
  weatherAdvice: z.string().min(10).max(500),
  backup: z.string().min(10).max(600),
  stops: z
    .array(
      z.object({
        placeId: z.number().int(),
        time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
        duration: z.number().int().min(15).max(180),
        activity: z.string().min(10).max(600),
        cost: z.number().int().min(0).max(2000),
      }),
    )
    .min(2)
    .max(3),
  food: z.number().int().min(0).max(2000),
  transport: z.number().int().min(0).max(2000),
});
