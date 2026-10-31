import test from "node:test";
import assert from "node:assert/strict";
import { createPlan } from "../server/services/planner.js";
import { requestSchema, validatePlan } from "../server/lib/validation.js";
import { weatherLabel } from "../server/services/weather.js";
import { request, places, plan } from "./fixtures.js";
test("valida orçamento, total do grupo e vincula somente locais consultados", () => {
  const result = validatePlan(plan, places, request);
  assert.equal(result.total, 50);
  assert.equal(result.groupTotal, 100);
  assert.equal(result.remaining, 50);
  assert.equal(result.stops[0].place.name, "Parque");
});
