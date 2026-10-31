import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import ValueStrip from "./components/ValueStrip";
import { useEffect, useRef, useState } from "react";
import { Compass } from "lucide-react";
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
      output.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, [planner.result, planner.error, planner.loading]);
  return (
    <>
      <Header onAbout={() => setAbout(true)} />
      <main>
        <Hero />
        <ValueStrip />
        <PlannerForm onSubmit={planner.generate} loading={planner.loading} onDemo={planner.showDemo} />
        <div ref={output} className="output-anchor" aria-live="polite" aria-busy={planner.loading}>
          {planner.loading && <LoadingState />}
          {planner.error && <ErrorState planner={planner} />}
          {planner.result && (
            <PlanResult key={planner.result.generatedAt || "demo"} result={planner.result} />
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
