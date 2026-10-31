import { checkExternal } from "./checks/external.js";
import { locateCity, findPlaces } from "../server/services/places.js";
import { getWeather } from "../server/services/weather.js";
import { createPlan } from "../server/services/planner.js";
import { mkdir, writeFile } from "node:fs/promises";
const summary = { external: await checkExternal() };

try {
  const result = await createPlan({
    city: "Curitiba",
    budget: 100,
    people: 2,
    day: "amanha",
    interest: "misturado",
    notes: "Passeio tranquilo com arte e ar livre.",
  });
  await mkdir("tmp", { recursive: true });
  await writeFile("tmp/live-result.json", JSON.stringify(result, null, 2));
  summary.gemini = {
    ok: true,
    model: result.model,
    title: result.plan.title,
    total: result.plan.total,
    calls: result.trace.map((t) => t.name),
  };
  console.log("Gemini + function calling OK:", JSON.stringify(summary.gemini));
} catch (error) {
  summary.gemini = { ok: false, error: error.message };
  console.error("Gemini:", error.message);
}
await mkdir("tmp", { recursive: true });
await writeFile(
  "tmp/api-check.json",
  JSON.stringify({ checkedAt: new Date().toISOString(), ...summary }, null, 2),
);
if (!summary.external?.ok || !summary.gemini?.ok) process.exitCode = 1;
