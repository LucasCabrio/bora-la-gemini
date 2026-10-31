import test from "node:test";
import assert from "node:assert/strict";
import { createPlan } from "../server/services/planner.js";
import { requestSchema, validatePlan } from "../server/lib/validation.js";
import { weatherLabel } from "../server/services/weather.js";
import { request, places, plan } from "./fixtures.js";
test("bloqueia função desconhecida e encerra resposta sem function call", async () => {
  await assert.rejects(
    () =>
      createPlan(request, {
        generateContent: async () => ({
          candidates: [
            {
              content: {
                parts: [
                  {
                    functionCall: {
                      name: "executar_codigo",
                    },
                  },
                ],
              },
            },
          ],
        }),
      }),
    /fora da etapa/,
  );
  await assert.rejects(
    () =>
      createPlan(request, {
        generateContent: async () => ({}),
      }),
    /não retornou/,
  );
});
