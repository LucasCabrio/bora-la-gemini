import test from "node:test";
import assert from "node:assert/strict";
import { createPlan } from "../server/services/planner.js";
import { requestSchema, validatePlan } from "../server/lib/validation.js";
import { weatherLabel } from "../server/services/weather.js";
import { request, places, plan } from "./fixtures.js";
test("rejeita orçamento excedido, local inventado, duplicata e sobreposição", () => {
  assert.throws(() =>
    validatePlan(
      {
        ...plan,
        food: 100,
      },
      places,
      request,
    ),
  );
  assert.throws(() => validatePlan(plan, [], request));
  assert.throws(() =>
    validatePlan(
      {
        ...plan,
        stops: [plan.stops[0], plan.stops[0]],
      },
      places,
      request,
    ),
  );
  assert.throws(() =>
    validatePlan(
      {
        ...plan,
        stops: [
          plan.stops[0],
          {
            ...plan.stops[1],
            time: "13:30",
          },
        ],
      },
      places,
      request,
    ),
  );
});
