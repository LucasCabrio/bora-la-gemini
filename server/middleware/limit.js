let active = 0;
const requests = new Map();
export function limitRequests(req, res, next) {
  const now = Date.now();
  for (const [ip, item] of requests) {
    if (now - item.start > 60000) requests.delete(ip);
  }
  const rate = requests.get(req.ip) || { start: now, count: 0 };
  if (rate.count >= 5 || active >= 3) {
    return res.status(429).json({ error: "Muitos roteiros em andamento. Aguarde um minuto." });
  }
  requests.set(req.ip, { ...rate, count: rate.count + 1 });
  active++;
  // O handler libera a vaga quando a geração termina, mesmo após desconexão.
  res.locals.release = () => active--;
  next();
}
