import { plan } from "./demoPlan";
import { trace } from "./demoTrace";
export const demo = {
  mode: "demo",
  model: "Exemplo ilustrativo",
  location: {
    name: "Curitiba",
    state: "Paraná",
  },
  request: {
    city: "Curitiba",
    budget: 100,
    people: 2,
    day: "amanha",
    interest: "misturado",
    notes: "",
  },
  weather: {
    date: "2026-10-28",
    min: 16,
    max: 24,
    rain: 20,
    label: "Entre nuvens",
    source: "Dados simulados",
  },
  plan: plan,
  trace: trace,
};
