import CityField from "./CityField";
export default function TripFields({ form, set }) {
  return (
    <div className="form-grid">
      <CityField form={form} set={set} />
      <label>
        Quando?
        <select value={form.day} onChange={(e) => set("day", e.target.value)}>
          <option value="hoje">Hoje</option>
          <option value="amanha">Amanhã</option>
        </select>
      </label>
      <label>
        Orçamento por pessoa
        <span className="input-wrap">
          <span className="currency">R$</span>
          <input
            aria-label="Orçamento por pessoa"
            type="number"
            required
            min={0}
            max={2000}
            step={1}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value === "" ? "" : Number(e.target.value))}
          />
        </span>
      </label>
      <label>
        Quantas pessoas?
        <select value={form.people} onChange={(e) => set("people", Number(e.target.value))}>
          {Array.from(
            {
              length: 10,
            },
            (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} {i ? "pessoas" : "pessoa"}
              </option>
            ),
          )}
        </select>
      </label>
    </div>
  );
}
