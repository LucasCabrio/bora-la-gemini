import { LoaderCircle, ArrowRight } from "lucide-react";
export default function FormActions({ loading }) {
  return (
    <div className="form-actions">
      <span>Roteiro com Gemini, previsão e locais próximos.</span>
      <button type="submit" className="primary-button">
        {loading ? (
          <>
            <LoaderCircle className="spin" size={18} /> Montando seu roteiro…
          </>
        ) : (
          <>
            Gerar roteiro <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}
