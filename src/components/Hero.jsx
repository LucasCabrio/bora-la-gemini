import { ArrowDown, MapPin, Sun, Trees, Landmark } from "lucide-react";
function CityIllustration() {
  return (
    <div
      className="city-scene"
      aria-label="Ilustração de um passeio entre parque, museu e café"
      role="img"
    >
      <div className="scene-grid" />
      <div className="scene-river" />
      <svg className="scene-route" viewBox="0 0 500 320" aria-hidden="true">
        <path
          d="M90 240 C90 170 200 270 240 180 S410 140 380 60"
          fill="none"
          stroke="#64865b"
          strokeWidth="3"
          strokeDasharray="6 8"
        />
        <circle cx="90" cy="240" r="7" fill="#244d3d" />
        <circle cx="380" cy="60" r="7" fill="#244d3d" />
      </svg>
      <div className="scene-park">
        <Trees size={76} strokeWidth={1.2} />
        <span>Parque</span>
      </div>
      <div className="scene-museum">
        <Landmark size={69} strokeWidth={1.2} />
      </div>
      <div className="scene-label label-one">
        <span>01</span> Passeio ao ar livre <Trees size={15} />
      </div>
      <div className="scene-label label-two">
        <span>02</span> Museu <Landmark size={15} />
      </div>
      <div className="scene-weather">
        <Sun size={24} />
        <div>
          Confira a previsão<small>Antes de escolher onde ir.</small>
        </div>
      </div>
      <span className="scene-pin">
        <MapPin size={25} />
      </span>
      <span className="scene-caption">ILUSTRAÇÃO DO PASSEIO</span>
    </div>
  );
}
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
          Informe a cidade e quanto pretende gastar. O Bora Lá sugere lugares
          para visitar e consulta a previsão antes de montar o roteiro.
        </p>
        <a className="text-link" href="#planejar">
          Montar um roteiro <ArrowDown size={16} />
        </a>
      </div>
      <CityIllustration />
    </section>
  );
}
