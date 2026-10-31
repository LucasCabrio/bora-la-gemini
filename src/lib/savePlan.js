import { money, dateLabel } from "./format";
export function savePlan({ plan, location, weather, mode }) {
  const text = [
    `BORA LÁ — ${plan.title}`,
    `${location.name} · ${dateLabel(weather.date)}`,
    mode === "demo" ? "EXEMPLO DEMONSTRATIVO — DADOS SIMULADOS" : "Roteiro gerado com Gemini e APIs externas",
    "",
    plan.summary,
    "",
    ...plan.stops.flatMap((s) => [
      `${s.time} · ${s.place.name} (${s.duration} min)`,
      s.activity,
      `Estimativa por pessoa: ${money(s.cost)}`,
      s.place.url,
      "",
    ]),
    `Alimentação: ${money(plan.food)} · Transporte: ${money(plan.transport)}`,
    `Total estimado por pessoa: ${money(plan.total)} · Grupo: ${money(plan.groupTotal)}`,
    "",
    `Clima: ${plan.weatherAdvice}`,
    `Plano B: ${plan.backup}`,
    "",
    "Valores e horários são sugestões. Confirme ingressos, acesso e funcionamento nos canais oficiais.",
    "Fontes: Open-Meteo / GeoNames e Wikipédia (no modo ao vivo).",
  ].join("\n");
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "bora-la-roteiro.txt";
  a.click();
  URL.revokeObjectURL(url);
}
