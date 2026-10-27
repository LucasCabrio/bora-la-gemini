export class AppError extends Error {
  constructor(message, status = 502) { super(message); this.status = status; }
}
export async function getJson(url, options = {}) {
  let response;
  try { response = await fetch(url, { ...options, signal: AbortSignal.timeout(25000) }); }
  catch { throw new AppError('Não foi possível conectar a uma API externa. Tente novamente em instantes.'); }
  if (!response.ok) {
    if (response.status === 429) throw new AppError('Limite de uso da API atingido. Aguarde um pouco ou confira a cota do Gemini.', 429);
    if ([400, 401, 403].includes(response.status) && String(url).includes('googleapis')) throw new AppError('O Gemini recusou a solicitação. Confira a chave, o modelo e as permissões no arquivo .env.');
    throw new AppError(`Um serviço externo respondeu com erro ${response.status}. Tente novamente.`);
  }
  return response.json();
}
