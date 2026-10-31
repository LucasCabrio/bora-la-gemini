import { Bookmark } from "lucide-react";
export default function PlanNote() {
  return (
    <div className="plan-disclaimer">
      <Bookmark size={16} />
      <p>
        Este roteiro não inclui reservas. Confirme horários, acesso e preços nos canais oficiais antes de
        sair.
      </p>
    </div>
  );
}
