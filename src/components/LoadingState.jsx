import { LoaderCircle } from "lucide-react";
export default function LoadingState() {
  return (
    <div className="loading-card" role="status">
      <LoaderCircle size={32} className="spin" />
      <h3>Montando o roteiro…</h3>
      <p>
        O Gemini está consultando a cidade, o clima e os locais para montar seu passeio. Isso pode levar até
        alguns minutos.
      </p>
      <span>Localizar → Consultar → Planejar</span>
    </div>
  );
}
