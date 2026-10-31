import { MapPin } from "lucide-react";
export default function CityField({ form, set }) {
  return (
    <label className="city-field">
      Em qual cidade?
      <span className="input-wrap">
        <MapPin size={18} />
        <input
          name="city"
          required
          minLength={2}
          maxLength={80}
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder="Ex.: Curitiba"
        />
      </span>
      <small>Cidades brasileiras · use somente o nome</small>
    </label>
  );
}
