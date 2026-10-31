import { ArrowDown } from "lucide-react";
import CityIllustration from "./CityIllustration";
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">PASSEIOS NA SUA CIDADE</span>
        <h1>
          Onde vamos
          <br />
          <em>no fim de semana?</em>
        </h1>
        <p>
          Informe a cidade e quanto pretende gastar. O Bora Lá sugere lugares para visitar e consulta a
          previsão antes de montar o roteiro.
        </p>
        <a className="text-link" href="#planejar">
          Montar um roteiro <ArrowDown size={16} />
        </a>
      </div>
      <CityIllustration />
    </section>
  );
}
