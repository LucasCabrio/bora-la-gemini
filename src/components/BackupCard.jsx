import { Umbrella } from "lucide-react";
export default function BackupCard({ plan }) {
  return (
    <div className="backup-card">
      <Umbrella size={20} />
      <h4>Alternativa para chuva</h4>
      <p>{plan.backup}</p>
    </div>
  );
}
