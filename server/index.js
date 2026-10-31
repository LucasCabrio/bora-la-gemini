import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import planRoutes from "./routes/plan.js";
const app = express();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
app.disable("x-powered-by");
app.use(express.json({ limit: "8kb" }));
app.get("/api/health", (_req, res) =>
  res.json({
    ok: true,
    configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "cole_sua_chave_aqui"),
  }),
);
app.use("/api", planRoutes);
app.use("/api", (_req, res) => res.status(404).json({ error: "Rota não encontrada." }));
app.use(express.static(path.join(root, "dist")));
app.get("/{*path}", (_req, res) => res.sendFile(path.join(root, "dist/index.html")));
app.use((error, _req, res, _next) =>
  res.status(error.status === 413 ? 413 : 400).json({ error: "Solicitação inválida ou muito grande." }),
);
const port = Number(process.env.PORT || 3001);
app.listen(port, "127.0.0.1", () => console.log(`Bora Lá disponível em http://localhost:${port}`));
