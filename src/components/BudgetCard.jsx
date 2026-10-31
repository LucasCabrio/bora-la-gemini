import { Wallet, Check } from "lucide-react";
import { money } from "../lib/format";
export default function BudgetCard({ plan, request }) {
  return (
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
        Total para {request.people} {request.people === 1 ? "pessoa" : "pessoas"}: {money(plan.groupTotal)}.
        <br />
        Estimativas da IA, sem consulta de preços.
      </small>
    </div>
  );
}
