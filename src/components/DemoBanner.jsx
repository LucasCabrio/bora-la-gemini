import { Info } from "lucide-react";
export default function DemoBanner() {
  return (
    <div className="demo-banner">
      <Info size={17} />
      <span>
        <strong>Você está vendo um exemplo.</strong> Clima, valores e chamadas abaixo são ilustrativos. Use o
        formulário para gerar com dados reais.
      </span>
    </div>
  );
}
