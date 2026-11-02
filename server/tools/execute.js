// Executa a ferramenta solicitada pela IA e guarda os dados consultados ou o roteiro validado.
import { validatePlan } from "../lib/validation.js";
export async function executeTool(call, state, request, deps) {
  switch (call.name) {
    case "localizar_cidade":
      state.location = await deps.locateCity(request.city);
      return state.location;
    case "consultar_clima":
      state.weather = await deps.getWeather(state.location, request.day);
      return state.weather;
    case "buscar_locais":
      state.places = await deps.findPlaces(state.location);
      return state.places;
    case "concluir_roteiro":
      try {
        state.plan = validatePlan(call.args, state.places, request);
        return state.plan;
      } catch {
        return {
          error:
            "Corrija o roteiro: 2 ou 3 IDs distintos da busca; custos inteiros dentro do orçamento; horários sem sobreposição; duração 15 a 180 minutos; textos completos.",
        };
      }
  }
}
