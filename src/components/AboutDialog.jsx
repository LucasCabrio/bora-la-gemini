import { useEffect, useRef } from "react";
import { X, MapPin, CloudSun, Check, Code2 } from "lucide-react";
export default function AboutDialog({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (open && !ref.current.open) ref.current.showModal();
    else if (!open && ref.current.open) ref.current.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="about-dialog"
    >
      <button className="close-button" aria-label="Fechar" onClick={onClose}>
        <X size={22} />
      </button>
      <span className="eyebrow">SOBRE O PROJETO</span>
      <h2>Como o roteiro é montado</h2>
      <p>
        Escolher um passeio costuma exigir várias buscas: onde ir, como estará o
        clima e quanto gastar. O Bora Lá reúne essas informações em um roteiro
        simples.
      </p>
      <div className="about-steps">
        {[
          [
            MapPin,
            "1. Dados do passeio",
            "Cidade, dia, orçamento e interesses.",
          ],
          [
            Code2,
            "2. Consulta às APIs",
            "O Gemini solicita funções; o servidor consulta Open-Meteo e Wikipédia.",
          ],
          [
            CloudSun,
            "3. Previsão do tempo",
            "A previsão ajuda a orientar as atividades e o plano B.",
          ],
          [
            Check,
            "4. Montagem e validação",
            "A IA sugere as paradas; o servidor valida locais, horários e orçamento.",
          ],
        ].map(([Icon, title, text]) => (
          <div key={title}>
            <Icon size={22} />
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="dialog-footnote">
        Projeto acadêmico · Lucas Cabrio — 04723-133
        <br />
        Paulo Esteves — 04723-090
      </p>
    </dialog>
  );
}
