export function weatherLabel(code) {
  if (code === 0) return "Céu aberto";
  if (code <= 3) return "Entre nuvens";
  if (code <= 48) return "Neblina";
  if (code >= 95) return "Possibilidade de tempestade";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "Neve";
  return "Possibilidade de chuva";
}
