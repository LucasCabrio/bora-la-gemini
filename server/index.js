import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { requestSchema } from './lib/validation.js';
import { createPlan } from './services/planner.js';

const app = express();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
app.disable('x-powered-by');
app.use(express.json({ limit: '8kb' }));
app.get('/api/health', (_req, res) => res.json({ ok: true, configured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'cole_sua_chave_aqui') }));
let active = 0;
const requests = new Map();
app.post('/api/plan', async (req, res) => {
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Confira cidade, orçamento (R$ 0 a 2.000), pessoas (1 a 10) e preferências.' });
  const now = Date.now();
  for (const [ip, item] of requests) if (now - item.start > 60000) requests.delete(ip);
  const rate = requests.get(req.ip) || { start: now, count: 0 };
  if (rate.count >= 5 || active >= 3) return res.status(429).json({ error: 'Muitos roteiros em andamento. Aguarde um minuto e tente novamente.' });
  requests.set(req.ip, { ...rate, count: rate.count + 1 });
  active++;
  try { res.json(await createPlan(parsed.data)); }
  catch (error) { res.status(error.status || 502).json({ error: error.status ? error.message : 'Não foi possível montar o roteiro. Tente novamente.' }); }
  finally { active--; }
});
app.use('/api', (_req, res) => res.status(404).json({ error: 'Rota não encontrada.' }));
app.use(express.static(path.join(root, 'dist')));
app.get('/{*path}', (_req, res) => res.sendFile(path.join(root, 'dist/index.html')));
app.use((error, _req, res, _next) => res.status(error.status === 413 ? 413 : 400).json({ error: 'Solicitação inválida ou muito grande.' }));
const port = Number(process.env.PORT || 3001);
app.listen(port, '127.0.0.1', () => console.log(`Bora Lá disponível em http://localhost:${port}`));
