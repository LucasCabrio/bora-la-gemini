import PlanSidebar from "./PlanSidebar";
import Itinerary from "./Itinerary";
import { savePlan } from "../lib/savePlan";
import SourceNote from "./SourceNote";
import DemoBanner from "./DemoBanner";
import ResultHeader from "./ResultHeader";
import { useState } from "react";
import ToolTrace from "./ToolTrace";
export default function PlanResult({ result }) {
  const { plan, weather, location, request, mode, trace } = result;
  const [saved, setSaved] = useState(false);
  function save() {
    savePlan(result);
    setSaved(true);
  }
  return (
    <section className="results" id="roteiro" aria-label="Seu roteiro">
      <ResultHeader save={save} saved={saved} />
      {mode === "demo" && <DemoBanner />}
      <div className="result-grid">
        <Itinerary plan={plan} location={location} weather={weather} request={request} />
        <PlanSidebar plan={plan} weather={weather} mode={mode} request={request} />
      </div>
      <ToolTrace trace={trace} mode={mode} />
      <SourceNote mode={mode} />
    </section>
  );
}
