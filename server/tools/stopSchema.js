export const stopSchema = {
  type: "OBJECT",
  properties: {
    placeId: { type: "INTEGER" },
    time: { type: "STRING", description: "Horário sugerido HH:MM (24 horas)." },
    duration: { type: "INTEGER", description: "Duração de 15 a 180 minutos." },
    activity: { type: "STRING" },
    cost: { type: "INTEGER" },
  },
  required: ["placeId", "time", "duration", "activity", "cost"],
};
