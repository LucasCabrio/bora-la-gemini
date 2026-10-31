import { functionCall } from './modelFixture.js';
import test from "node:test";
import assert from "node:assert/strict";
import { createPlan } from "../server/services/planner.js";
import { requestSchema, validatePlan } from "../server/lib/validation.js";
import { weatherLabel } from "../server/services/weather.js";
import { request, places, plan } from "./fixtures.js";
test("orquestra functionCall e devolve functionResponse com id preservado", async () => {
  let step = 0;
  const model = async (contents, _declarations, allowed) => {
    const calls = [
      ["localizar_cidade", {}],
      ["consultar_clima", {}],
      ["buscar_locais", {}],
      ["concluir_roteiro", plan],
    ];
    if (step > 0) {
      assert.equal(contents.at(-1).parts[0].functionResponse.id, `call-${step - 1}`);
      assert.equal(contents.at(-2).parts[0].thoughtSignature, "preserved");
    }
    const [name, args] = calls[step];
    assert.ok(allowed.includes(name));
    return functionCall(name, args, `call-${step++}`);
  };
  const result = await createPlan(request, {
    generateContent: model,
    locateCity: async () => ({
      name: "Curitiba",
    }),
    getWeather: async () => ({
      min: 10,
      max: 20,
      rain: 5,
    }),
    findPlaces: async () => places,
  });
  assert.equal(step, 4);
  assert.equal(result.mode, "live");
  assert.equal(result.trace.length, 4);
});
