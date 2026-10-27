import { generateContent } from './gemini.js';
import { locateCity, findPlaces } from './places.js';
import { getWeather } from './weather.js';
import { declarations } from '../tools/declarations.js';
import { validatePlan } from '../lib/validation.js';
import { AppError } from '../lib/http.js';

// Injeção de dependências permite testar a orquestração sem consumir a API.
export async function createPlan(request, deps = { generateContent, locateCity, findPlaces, getWeather }) {
  const contents = [{ role: 'user', parts: [{ text: JSON.stringify({ request, now: new Date().toISOString() }) }] }];
  const state = {}, trace = [];
  for (let round = 0; round < 8; round++) {
    const allowed = !state.location ? ['localizar_cidade'] : [!state.weather && 'consultar_clima', !state.places && 'buscar_locais', state.weather && state.places && 'concluir_roteiro'].filter(Boolean);
    const response = await deps.generateContent(contents, declarations, allowed);
    const content = response.candidates?.[0]?.content;
    const calls = content?.parts?.filter(part => part.functionCall).map(part => part.functionCall) ?? [];
    if (!calls.length) throw new AppError('O Gemini não retornou um roteiro válido. Tente novamente.');
    // Preserva todas as partes, inclusive thoughtSignature, exigida por alguns modelos.
    contents.push(content);
    const answers = [];
    for (const call of calls) {
      if (!allowed.includes(call.name)) throw new AppError('O Gemini solicitou uma função fora da etapa permitida.');
      const start = Date.now();
      let result;
      if (call.name === 'localizar_cidade') result = state.location = await deps.locateCity(request.city);
      if (call.name === 'consultar_clima') result = state.weather = await deps.getWeather(state.location, request.day);
      if (call.name === 'buscar_locais') result = state.places = await deps.findPlaces(state.location);
      if (call.name === 'concluir_roteiro') {
        try {
          const plan = validatePlan(call.args, state.places, request);
          trace.push({ name: call.name, ms: Date.now() - start, detail: 'Roteiro validado: locais, horários e orçamento.', status: 'ok' });
          return { ...state, plan, trace, request, mode: 'live', generatedAt: new Date().toISOString(), model: process.env.GEMINI_MODEL || 'gemini-3.5-flash' };
        } catch {
          result = { error: 'Roteiro inválido. Use 2 ou 3 IDs distintos retornados por buscar_locais; custos inteiros não negativos, total <= orçamento; horários HH:MM sem sobreposição; duração 15 a 180. Preencha todos os textos e respeite os limites de tamanho.' };
        }
      }
      trace.push({ name: call.name, ms: Date.now() - start, detail: call.name === 'localizar_cidade' ? `${state.location.name}, ${state.location.state}` : call.name === 'consultar_clima' ? `${state.weather.min} a ${state.weather.max} °C · chuva ${state.weather.rain}%` : call.name === 'buscar_locais' ? `${state.places.length} locais encontrados na Wikipédia` : 'Correção solicitada ao modelo.', status: result?.error ? 'retry' : 'ok' });
      answers.push({ functionResponse: { name: call.name, ...(call.id ? { id: call.id } : {}), response: { result } } });
    }
    contents.push({ role: 'user', parts: answers });
  }
  throw new AppError('A IA não concluiu o roteiro dentro do limite de etapas. Tente novamente.');
}
