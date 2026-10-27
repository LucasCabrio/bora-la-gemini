import { ArrowDown, MapPin, Sparkles, Sun, Trees, Landmark } from 'lucide-react';
function CityIllustration() {
  return <div className="city-scene" aria-label="Ilustração de um passeio entre parque, museu e café" role="img">
    <div className="scene-grid"/><div className="scene-river"/>
    <svg className="scene-route" viewBox="0 0 500 320" aria-hidden="true"><path d="M90 240 C90 170 200 270 240 180 S410 140 380 60" fill="none" stroke="#64865b" strokeWidth="3" strokeDasharray="6 8"/><circle cx="90" cy="240" r="7" fill="#244d3d"/><circle cx="380" cy="60" r="7" fill="#244d3d"/></svg>
    <div className="scene-park"><Trees size={76} strokeWidth={1.2}/><span>um pouco de verde</span></div>
    <div className="scene-museum"><Landmark size={69} strokeWidth={1.2}/></div>
    <div className="scene-label label-one"><span>01</span> Respire lá fora <Trees size={15}/></div>
    <div className="scene-label label-two"><span>02</span> Descubra algo novo <Landmark size={15}/></div>
    <div className="scene-weather"><Sun size={24}/><div>Vai dar passeio.<small>O clima também entra no plano.</small></div></div>
    <span className="scene-pin"><MapPin size={25}/></span><span className="scene-caption">BOAS HISTÓRIAS COMEÇAM PERTO.</span>
  </div>;
}
export default function Hero() {
  return <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> SEU TEMPO LIVRE, BEM APROVEITADO</span><h1>Um rolê com a sua cara.<br/><em>E com o seu bolso.</em></h1><p>Descubra o que fazer na sua cidade com um roteiro que combina clima, interesses e quanto você quer gastar.</p><a className="text-link" href="#planejar">Vamos sair do “o que fazer?” <ArrowDown size={16}/></a></div><CityIllustration/></section>;
}
