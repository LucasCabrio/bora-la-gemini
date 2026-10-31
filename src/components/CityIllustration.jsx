import SceneRoute from "./SceneRoute";
import { MapPin, Sun, Trees, Landmark } from "lucide-react";
export default function CityIllustration() {
  return (
    <div className="city-scene" aria-label="Ilustração de um passeio entre parque, museu e café" role="img">
      <div className="scene-grid" />
      <div className="scene-river" />
      <SceneRoute />
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
