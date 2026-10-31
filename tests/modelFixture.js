export function functionCall(name, args, id) {
  const part = { thoughtSignature: 'preserved', functionCall: { name, args, id } };
  return { candidates: [{ content: { role: 'model', parts: [part] } }] };
}
