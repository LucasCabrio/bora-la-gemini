// Guarda as escolhas do usuário e envia os dados do formulário para gerar o roteiro.
import FormExample from "./FormExample";
import FormHeading from "./FormHeading";
import FormActions from "./FormActions";
import PreferencesFields from "./PreferencesFields";
import TripFields from "./TripFields";
import { useState } from "react";
export default function PlannerForm({ onSubmit, loading, onDemo }) {
  const [form, setForm] = useState({
    city: "Curitiba",
    budget: 100,
    people: 2,
    day: "amanha",
    interest: "misturado",
    notes: "",
  });
  const set = (key, value) =>
    setForm((f) => ({
      ...f,
      [key]: value,
    }));
  return (
    <section id="planejar" className="planner-section">
      <FormHeading />
      <form
        className="planner-card"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <fieldset disabled={loading} className="form-fields">
          <TripFields form={form} set={set} />
          <PreferencesFields form={form} set={set} />
          <FormActions loading={loading} />
        </fieldset>
      </form>
      <FormExample loading={loading} onDemo={onDemo} />
    </section>
  );
}
