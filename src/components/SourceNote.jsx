export default function SourceNote({ mode }) {
  return (
    <p className="source-note">
      {mode === "demo"
        ? "Exemplo editorial, sem consultas externas."
        : "Dados: Open-Meteo (CC BY 4.0), GeoNames e Wikipédia. A cobertura de locais varia por cidade."}{" "}
      Os links dos locais permitem conferir as fontes.
    </p>
  );
}
