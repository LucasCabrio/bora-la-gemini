import { AlertCircle } from "lucide-react";
export default function ErrorState({ planner }) {
  return (
    <div className="error-card" role="alert">
      <AlertCircle size={23} />
      <div>
        <strong>Não foi possível gerar o roteiro.</strong>
        <p>{planner.error}</p>
        <span>Você pode ajustar o formulário e tentar novamente ou explorar o exemplo.</span>
      </div>
    </div>
  );
}
