import { ArrowRight } from "lucide-react";
export default function FormExample({ loading, onDemo }) {
  return (
    <div className="under-form">
      <span>Os custos sugeridos são estimativas.</span>
      <button disabled={loading} onClick={onDemo}>
        Ver exemplo <ArrowRight size={14} />
      </button>
    </div>
  );
}
