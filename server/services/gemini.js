import { SYSTEM_PROMPT } from "../tools/prompt.js";
import { getJson, AppError } from "../lib/http.js";
export async function generateContent(contents, declarations, allowedNames) {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "cole_sua_chave_aqui")
    throw new AppError("Configure GEMINI_API_KEY no arquivo .env e reinicie o servidor.", 503);
  const model = process.env.GEMINI_MODEL || "gemini-3.5-flash";
  return getJson(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        tools: [{ functionDeclarations: declarations }],
        toolConfig: {
          functionCallingConfig: {
            mode: "ANY",
            allowedFunctionNames: allowedNames,
          },
        },
        generationConfig: { temperature: 0.5, maxOutputTokens: 4500 },
      }),
    },
  );
}
