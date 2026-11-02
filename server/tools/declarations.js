// Define os nomes, as descrições e os argumentos das ferramentas apresentadas ao Gemini.
import { planTool } from "./planTool.js";
export const declarations = [
  {
    name: "localizar_cidade",
    description: "Localiza a cidade brasileira informada no formulário.",
    parameters: { type: "OBJECT", properties: {} },
  },
  {
    name: "consultar_clima",
    description: "Consulta o clima da cidade localizada para o dia escolhido.",
    parameters: { type: "OBJECT", properties: {} },
  },
  {
    name: "buscar_locais",
    description: "Busca locais na Wikipédia até 10 km do centro da cidade.",
    parameters: { type: "OBJECT", properties: {} },
  },
  planTool,
];
