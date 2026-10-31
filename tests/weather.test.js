import test from "node:test";
import assert from "node:assert/strict";
import { createPlan } from "../server/services/planner.js";
import { requestSchema, validatePlan } from "../server/lib/validation.js";
import { weatherLabel } from "../server/services/weather.js";
import { request, places, plan } from "./fixtures.js";
test("interpreta códigos de clima", () => {
  assert.equal(weatherLabel(0), "Céu aberto");
  assert.equal(weatherLabel(95), "Possibilidade de tempestade");
  assert.equal(weatherLabel(61), "Possibilidade de chuva");
});
