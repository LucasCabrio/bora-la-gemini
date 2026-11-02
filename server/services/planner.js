// Coordena a conversa com o Gemini e a execução das ferramentas até obter um roteiro validado.
import { generateContent } from "./gemini.js";
import { locateCity, findPlaces } from "./places.js";
import { getWeather } from "./weather.js";
import { declarations } from "../tools/declarations.js";
import { executeTool } from "../tools/execute.js";
import { allowedTools, toolResponse, traceEntry } from "../tools/protocol.js";
import { AppError } from "../lib/http.js";

const services = { generateContent, locateCity, findPlaces, getWeather };
export async function createPlan(request, deps = services) {
  const text = JSON.stringify({ request, now: new Date().toISOString() });
  const contents = [{ role: "user", parts: [{ text }] }];
  const state = {},
    trace = [];
  for (let round = 0; round < 8; round++) {
    const allowed = allowedTools(state);
    const response = await deps.generateContent(contents, declarations, allowed);
    const content = response.candidates?.[0]?.content;
    const calls = content?.parts?.filter((p) => p.functionCall).map((p) => p.functionCall) || [];
    if (!calls.length) throw new AppError("O Gemini não retornou um roteiro válido. Tente novamente.");
    // Mantém as assinaturas de pensamento enviadas pelo Gemini.
    contents.push(content);
    const answers = [];
    for (const call of calls) {
      if (!allowed.includes(call.name)) throw new AppError("Função fora da etapa permitida.");
      const start = Date.now();
      const result = await executeTool(call, state, request, deps);
      trace.push(traceEntry(call, state, result, start));
      if (state.plan)
        return {
          ...state,
          trace,
          request,
          mode: "live",
          generatedAt: new Date().toISOString(),
          model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
        };
      answers.push(toolResponse(call, result));
    }
    contents.push({ role: "user", parts: answers });
  }
  throw new AppError("A IA não concluiu o roteiro dentro do limite de etapas. Tente novamente.");
}
