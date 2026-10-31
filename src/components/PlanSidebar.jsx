import WeatherCard from "./WeatherCard";
import BudgetCard from "./BudgetCard";
import BackupCard from "./BackupCard";
export default function PlanSidebar({ plan, weather, mode, request }) {
  return (
    <aside className="result-sidebar">
      <WeatherCard weather={weather} plan={plan} mode={mode} />
      <BudgetCard plan={plan} request={request} />
      <BackupCard plan={plan} />
    </aside>
  );
}
