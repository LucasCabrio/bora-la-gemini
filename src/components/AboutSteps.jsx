import { MapPin, CloudSun, Check, Code2 } from "lucide-react";
export default function AboutSteps() {
  return (
    <div className="about-steps">
      {[
        [MapPin, "1. Dados do passeio", "Cidade, dia, orçamento e interesses."],
        [
          Code2,
          "2. Consulta às APIs",
          "O Gemini solicita funções; o servidor consulta Open-Meteo e Wikipédia.",
        ],
        [CloudSun, "3. Previsão do tempo", "A previsão ajuda a orientar as atividades e o plano B."],
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
  );
}
