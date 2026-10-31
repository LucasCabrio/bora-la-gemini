import { Check, Download } from "lucide-react";
export default function ResultHeader({ save, saved }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">RESULTADO</span>
        <h2>Seu roteiro</h2>
      </div>
      <button className="secondary-button" onClick={save}>
        {saved ? <Check size={16} /> : <Download size={16} />} {saved ? "Roteiro baixado" : "Salvar roteiro"}
      </button>
    </div>
  );
}
