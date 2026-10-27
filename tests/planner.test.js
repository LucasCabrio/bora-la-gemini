import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan } from '../server/services/planner.js';
import { requestSchema, validatePlan } from '../server/lib/validation.js';
import { weatherLabel } from '../server/services/weather.js';
const request = { city: 'Curitiba', budget: 100, people: 2, day: 'amanha', interest: 'misturado', notes: '' };
const places = [{ id: 1, name: 'Parque' }, { id: 2, name: 'Museu' }];
const plan = { title: 'Um dia na cidade', summary: 'Passeio tranquilo pela cidade.', weatherAdvice: 'Leve água e confira a previsão.', backup: 'Se chover, prefira o museu.', stops: [{ placeId: 1, time: '13:00', duration: 60, activity: 'Caminhe pelo parque.', cost: 0 }, { placeId: 2, time: '15:00', duration: 60, activity: 'Visite as exposições.', cost: 20 }], food: 20, transport: 10 };
test('valida orçamento, total do grupo e vincula somente locais consultados', () => {
  const result = validatePlan(plan, places, request);
  assert.equal(result.total, 50); assert.equal(result.groupTotal, 100); assert.equal(result.remaining, 50);
  assert.equal(result.stops[0].place.name, 'Parque');
});
test('rejeita orçamento excedido, local inventado, duplicata e sobreposição', () => {
  assert.throws(() => validatePlan({ ...plan, food: 100 }, places, request));
  assert.throws(() => validatePlan(plan, [], request));
  assert.throws(() => validatePlan({ ...plan, stops: [plan.stops[0], plan.stops[0]] }, places, request));
  assert.throws(() => validatePlan({ ...plan, stops: [plan.stops[0], { ...plan.stops[1], time: '13:30' }] }, places, request));
});
test('aceita passeio sem gastos e rejeita entrada inválida', () => {
  assert.equal(validatePlan({ ...plan, food: 0, transport: 0, stops: plan.stops.map(s => ({ ...s, cost: 0 })) }, places, { ...request, budget: 0 }).total, 0);
  for (const change of [{ budget: -1 }, { people: 0 }, { day: 'ontem' }, { city: '' }, { notes: 'x'.repeat(351) }]) assert.equal(requestSchema.safeParse({ ...request, ...change }).success, false);
});
test('orquestra functionCall e devolve functionResponse com id preservado', async () => {
  let step = 0;
  const model = async (contents, _declarations, allowed) => {
    const calls = [ ['localizar_cidade', {}], ['consultar_clima', {}], ['buscar_locais', {}], ['concluir_roteiro', plan] ];
    if (step > 0) {
      assert.equal(contents.at(-1).parts[0].functionResponse.id, `call-${step - 1}`);
      assert.equal(contents.at(-2).parts[0].thoughtSignature, 'preserved');
    }
    const [name, args] = calls[step];
    assert.ok(allowed.includes(name));
    return { candidates: [{ content: { role: 'model', parts: [{ thoughtSignature: 'preserved', functionCall: { name, args, id: `call-${step++}` } }] } }] };
  };
  const result = await createPlan(request, { generateContent: model, locateCity: async () => ({ name: 'Curitiba' }), getWeather: async () => ({ min: 10, max: 20, rain: 5 }), findPlaces: async () => places });
  assert.equal(step, 4); assert.equal(result.mode, 'live'); assert.equal(result.trace.length, 4);
});
test('bloqueia função desconhecida e encerra resposta sem function call', async () => {
  await assert.rejects(() => createPlan(request, { generateContent: async () => ({ candidates: [{ content: { parts: [{ functionCall: { name: 'executar_codigo' } }] } }] }) }), /fora da etapa/);
  await assert.rejects(() => createPlan(request, { generateContent: async () => ({}) }), /não retornou/);
});
test('interpreta códigos de clima', () => {
  assert.equal(weatherLabel(0), 'Céu aberto'); assert.equal(weatherLabel(95), 'Possibilidade de tempestade'); assert.equal(weatherLabel(61), 'Possibilidade de chuva');
});
