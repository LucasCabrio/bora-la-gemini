import { useState } from "react";
import {
  MapPin,
  Clock3,
  ArrowUpRight,
  CloudSun,
  Umbrella,
  Wallet,
  Download,
  Check,
  Bookmark,
  Info,
} from "lucide-react";
import { money, dateLabel } from "../lib/format";
import ToolTrace from "./ToolTrace";
export default function PlanResult({ result }) {
  const { plan, weather, location, request, mode, trace } = result;
  const [saved, setSaved] = useState(false);
  function save() {
    const text = [
      `BORA LÁ — ${plan.title}`,
      `${location.name} · ${dateLabel(weather.date)}`,
      mode === "demo"
        ? "EXEMPLO DEMONSTRATIVO — DADOS SIMULADOS"
        : "Roteiro gerado com Gemini e APIs externas",
      "",
      plan.summary,
      "",
      ...plan.stops.flatMap((s) => [
        `${s.time} · ${s.place.name} (${s.duration} min)`,
        s.activity,
        `Estimativa por pessoa: ${money(s.cost)}`,
        s.place.url,
        "",
      ]),
      `Alimentação: ${money(plan.food)} · Transporte: ${money(plan.transport)}`,
      `Total estimado por pessoa: ${money(plan.total)} · Grupo: ${money(plan.groupTotal)}`,
      "",
      `Clima: ${plan.weatherAdvice}`,
      `Plano B: ${plan.backup}`,
      "",
      "Valores e horários são sugestões. Confirme ingressos, acesso e funcionamento nos canais oficiais.",
      "Fontes: Open-Meteo / GeoNames e Wikipédia (no modo ao vivo).",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "bora-la-roteiro.txt";
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
  }
  return (
    <section className="results" id="roteiro" aria-label="Seu roteiro">
      <div className="section-title">
        <div>
          <span className="eyebrow">RESULTADO</span>
          <h2>Seu roteiro</h2>
        </div>
        <button className="secondary-button" onClick={save}>
          {saved ? <Check size={16} /> : <Download size={16} />}{" "}
          {saved ? "Roteiro baixado" : "Salvar roteiro"}
        </button>
      </div>
      {mode === "demo" && (
        <div className="demo-banner">
          <Info size={17} />
          <span>
            <strong>Você está vendo um exemplo.</strong> Clima, valores e
            chamadas abaixo são ilustrativos. Use o formulário para gerar com
            dados reais.
          </span>
        </div>
      )}
      <div className="result-grid">
        <div className="itinerary">
          <div className="itinerary-heading">
            <span className="location-label">
              <MapPin size={14} />
              {location.name}, {location.state} <span>·</span>{" "}
              {dateLabel(weather.date)}
            </span>
            <h3>{plan.title}</h3>
            <p>{plan.summary}</p>
            <div className="meta-chips">
              <span>
                <Clock3 size={14} />
                {plan.stops.length} paradas
              </span>
              <span>
                <Wallet size={14} />
                Até {money(request.budget)} por pessoa
              </span>
            </div>
          </div>
          <div className="stops">
            {plan.stops.map((stop, i) => (
              <article className="stop" key={stop.placeId}>
                <div className="stop-marker">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="stop-content">
                  <div className="stop-top">
                    <span>
                      {stop.time} <span>· {stop.duration} min</span>
                    </span>
                    <span
                      className={`cost-tag ${stop.cost === 0 ? "free" : ""}`}
                    >
                      {stop.cost === 0
                        ? "Sem gasto previsto"
                        : `~ ${money(stop.cost)}`}
                    </span>
                  </div>
                  <h4>{stop.place.name}</h4>
                  <p>{stop.activity}</p>
                  <div className="stop-links">
                    <a href={stop.place.url} target="_blank" rel="noreferrer">
                      Conheça o lugar <ArrowUpRight size={14} />
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${stop.place.latitude},${stop.place.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver no mapa <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="plan-disclaimer">
            <Bookmark size={16} />
            <p>
              Este roteiro não inclui reservas. Confirme horários, acesso e
              preços nos canais oficiais antes de sair.
            </p>
          </div>
        </div>
        <aside className="result-sidebar">
          <div className="weather-card">
            <div className="card-label">
              <CloudSun size={20} /> PREVISÃO DO TEMPO
            </div>
            <div className="temperature">
              {Math.round(weather.max)}°
              <span>/ {Math.round(weather.min)}°</span>
              <CloudSun size={48} strokeWidth={1.3} />
            </div>
            <div className="weather-description">
              {weather.label}
              <span>{weather.rain}% de chuva</span>
            </div>
            <p>{plan.weatherAdvice}</p>
            <small>
              {mode === "demo"
                ? "Previsão simulada para demonstração"
                : `Open-Meteo · ${dateLabel(weather.date)}`}
            </small>
          </div>
          <div className="budget-card">
            <div className="card-label">
              <Wallet size={18} /> GASTOS ESTIMADOS
            </div>
            <div className="budget-total">
              {money(plan.total)}
              <span>/ pessoa</span>
            </div>
            <dl>
              <div>
                <dt>Passeios</dt>
                <dd>{money(plan.stops.reduce((a, s) => a + s.cost, 0))}</dd>
              </div>
              <div>
                <dt>Alimentação</dt>
                <dd>{money(plan.food)}</dd>
              </div>
              <div>
                <dt>Transporte</dt>
                <dd>{money(plan.transport)}</dd>
              </div>
            </dl>
            <div className="budget-left">
              <Check size={15} /> {money(plan.remaining)} de folga no orçamento
            </div>
            <small>
              Total para {request.people}{" "}
              {request.people === 1 ? "pessoa" : "pessoas"}:{" "}
              {money(plan.groupTotal)}.<br />
              Estimativas da IA, sem consulta de preços.
            </small>
          </div>
          <div className="backup-card">
            <Umbrella size={20} />
            <h4>Alternativa para chuva</h4>
            <p>{plan.backup}</p>
          </div>
        </aside>
      </div>
      <ToolTrace trace={trace} mode={mode} />
      <p className="source-note">
        {mode === "demo"
          ? "Exemplo editorial, sem consultas externas."
          : "Dados: Open-Meteo (CC BY 4.0), GeoNames e Wikipédia. A cobertura de locais varia por cidade."}{" "}
        Os links dos locais permitem conferir as fontes.
      </p>
    </section>
  );
}
