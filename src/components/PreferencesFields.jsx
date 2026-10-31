import { Trees, Landmark, Shuffle } from "lucide-react";
const interests = [
  {
    id: "misturado",
    name: "Um pouco de tudo",
    Icon: Shuffle,
  },
  {
    id: "natureza",
    name: "Ar livre",
    Icon: Trees,
  },
  {
    id: "cultura",
    name: "Arte e cultura",
    Icon: Landmark,
  },
];
export default function PreferencesFields({ form, set }) {
  return (
    <div className="form-bottom">
      <div>
        <span className="field-label">O que combina com você?</span>
        <div className="interest-options">
          {interests.map(({ id, name, Icon }) => (
            <button
              type="button"
              key={id}
              aria-pressed={form.interest === id}
              className={`interest ${form.interest === id ? "selected" : ""}`}
              onClick={() => set("interest", id)}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </div>
      </div>
      <label className="notes-field">
        Algum detalhe? <span className="optional">opcional</span>
        <input
          placeholder="Ex.: prefiro caminhar e conhecer lugares tranquilos"
          value={form.notes}
          maxLength={350}
          onChange={(e) => set("notes", e.target.value)}
        />
      </label>
    </div>
  );
}
