export function allowedTools(state) {
  if (!state.location) return ["localizar_cidade"];
  const names = [];
  if (!state.weather) names.push("consultar_clima");
  if (!state.places) names.push("buscar_locais");
  if (state.weather && state.places) names.push("concluir_roteiro");
  return names;
}
export function toolResponse(call, result) {
  return {
    functionResponse: {
      name: call.name,
      ...(call.id ? { id: call.id } : {}),
      response: { result },
    },
  };
}
export function traceEntry(call, state, result, start) {
  const details = {
    localizar_cidade: `${state.location?.name}, ${state.location?.state}`,
    consultar_clima: `${state.weather?.min} a ${state.weather?.max} °C · chuva ${state.weather?.rain}%`,
    buscar_locais: `${state.places?.length} locais encontrados na Wikipédia`,
    concluir_roteiro: result.error
      ? "Correção solicitada ao modelo."
      : "Roteiro validado: locais, horários e orçamento.",
  };
  return {
    name: call.name,
    ms: Date.now() - start,
    detail: details[call.name],
    status: result.error ? "retry" : "ok",
  };
}
