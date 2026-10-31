import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlan } from '../server/services/planner.js';
import { request, places, plan } from './fixtures.js';
import { functionCall } from './modelFixture.js';

function dependencies(finalPlan) {
  let rounds = 0;
  return {
    generateContent: async (_contents, _tools, allowed) => {
      const name = allowed[0];
      const args = name === 'concluir_roteiro' ? finalPlan(rounds++) : {};
      return functionCall(name, args, String(rounds));
    },
    locateCity: async () => ({ name: 'Curitiba' }),
    getWeather: async () => ({ min: 10, max: 20, rain: 5 }),
    findPlaces: async () => places,
  };
}
test('devolve erro ao modelo e aceita um roteiro corrigido', async () => {
  const deps = dependencies(attempt => attempt === 0 ? { ...plan, food: 200 } : plan);
  const result = await createPlan(request, deps);
  assert.equal(result.plan.total, 50);
  assert.equal(result.trace.filter(item => item.status === 'retry').length, 1);
});
test('encerra tentativas quando o modelo não corrige o roteiro', async () => {
  await assert.rejects(() => createPlan(request, dependencies(() => ({}))), /limite de etapas/);
});
