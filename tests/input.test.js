import test from 'node:test';
import assert from 'node:assert/strict';
import { requestSchema, validatePlan } from '../server/lib/validation.js';
import { request, places, plan } from './fixtures.js';

test('aceita passeio sem gastos e rejeita entrada inválida', () => {
  const freePlan = {
    ...plan,
    food: 0,
    transport: 0,
    stops: plan.stops.map(stop => ({ ...stop, cost: 0 })),
  };
  const result = validatePlan(freePlan, places, { ...request, budget: 0 });
  assert.equal(result.total, 0);
  const invalid = [{ budget: -1 }, { people: 0 }, { day: 'ontem' }, { city: '' }, { notes: 'x'.repeat(351) }];
  for (const change of invalid) {
    assert.equal(requestSchema.safeParse({ ...request, ...change }).success, false);
  }
});
