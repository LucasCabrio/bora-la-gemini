import { stopSchema } from "./stopSchema.js";
const text = { type: "STRING" };
export const planTool = {
  name: "concluir_roteiro",
  description: "Entrega o roteiro consultado. Custos estimados por pessoa, em reais inteiros.",
  parameters: {
    type: "OBJECT",
    properties: {
      title: text,
      summary: text,
      weatherAdvice: text,
      backup: text,
      stops: { type: "ARRAY", items: stopSchema },
      food: { type: "INTEGER", description: "Alimentação por pessoa." },
      transport: { type: "INTEGER", description: "Transporte por pessoa." },
    },
    required: ["title", "summary", "weatherAdvice", "backup", "stops", "food", "transport"],
  },
};
