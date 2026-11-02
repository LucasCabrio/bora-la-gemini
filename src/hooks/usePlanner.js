// Envia o pedido ao servidor e controla os estados de carregamento, erro e resultado.
import { useState } from "react";
import { demo } from "../data/demo";
export function usePlanner() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function generate(values) {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(240000),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível gerar seu roteiro.");
      setResult(data);
    } catch (err) {
      setError(
        err.name === "TimeoutError"
          ? "O roteiro demorou mais que o esperado. Tente novamente."
          : err instanceof TypeError
            ? "Não foi possível conectar ao servidor. Confira se npm run dev está rodando."
            : err.message,
      );
    } finally {
      setLoading(false);
    }
  }
  return {
    result,
    loading,
    error,
    generate,
    showDemo: () => {
      setError("");
      setResult(demo);
    },
  };
}
