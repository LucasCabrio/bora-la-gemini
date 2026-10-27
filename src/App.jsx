import { useEffect, useRef, useState } from "react";
import {
  Compass,
  AlertCircle,
  LoaderCircle,
  MapPin,
  CloudSun,
  Wallet,
} from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlannerForm from "./components/PlannerForm";
import PlanResult from "./components/PlanResult";
import AboutDialog from "./components/AboutDialog";
import { usePlanner } from "./hooks/usePlanner";
export default function App() {
  const planner = usePlanner();
  const [about, setAbout] = useState(false);
  const output = useRef(null);
  useEffect(() => {
    if (planner.result || planner.error || planner.loading)
      output.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [planner.result, planner.error, planner.loading]);
  return (
    <>
      <Header onAbout={() => setAbout(true)} />
      <main>
        <Hero />
        <div className="value-strip">
          <span>
            <MapPin size={17} /> Locais próximos
          </span>
          <span>
            <CloudSun size={18} /> Previsão do tempo
          </span>
          <span>
            <Wallet size={17} /> Estimativa de gastos
          </span>
        </div>
        <PlannerForm
          onSubmit={planner.generate}
          loading={planner.loading}
          onDemo={planner.showDemo}
        />
        <div
          ref={output}
          className="output-anchor"
          aria-live="polite"
          aria-busy={planner.loading}
        >
          {planner.loading && (
            <div className="loading-card" role="status">
              <LoaderCircle size={32} className="spin" />
              <h3>Montando o roteiro…</h3>
              <p>
                O Gemini está consultando a cidade, o clima e os locais para
                montar seu passeio. Isso pode levar até alguns minutos.
              </p>
              <span>Localizar → Consultar → Planejar</span>
            </div>
          )}
          {planner.error && (
            <div className="error-card" role="alert">
              <AlertCircle size={23} />
              <div>
                <strong>Não foi possível gerar o roteiro.</strong>
                <p>{planner.error}</p>
                <span>
                  Você pode ajustar o formulário e tentar novamente ou explorar
                  o exemplo.
                </span>
              </div>
            </div>
          )}
          {planner.result && (
            <PlanResult
              key={planner.result.generatedAt || "demo"}
              result={planner.result}
            />
          )}
        </div>
      </main>
      <footer>
        <a href="#" className="footer-brand">
          <Compass size={21} /> bora lá.
        </a>
        <span>Passeios, clima e orçamento.</span>
        <small>Projeto acadêmico · Lucas Cabrio & Paulo Esteves</small>
      </footer>
      <AboutDialog open={about} onClose={() => setAbout(false)} />
    </>
  );
}
