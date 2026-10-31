export const request = {
  city: "Curitiba",
  budget: 100,
  people: 2,
  day: "amanha",
  interest: "misturado",
  notes: "",
};
export const places = [
  {
    id: 1,
    name: "Parque",
  },
  {
    id: 2,
    name: "Museu",
  },
];
export const plan = {
  title: "Um dia na cidade",
  summary: "Passeio tranquilo pela cidade.",
  weatherAdvice: "Leve água e confira a previsão.",
  backup: "Se chover, prefira o museu.",
  stops: [
    {
      placeId: 1,
      time: "13:00",
      duration: 60,
      activity: "Caminhe pelo parque.",
      cost: 0,
    },
    {
      placeId: 2,
      time: "15:00",
      duration: 60,
      activity: "Visite as exposições.",
      cost: 20,
    },
  ],
  food: 20,
  transport: 10,
};
