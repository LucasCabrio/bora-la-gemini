# Registro de validação

Data: 27/10/2026. Windows, Node.js 24.14.0 e Chrome headless.

- Testes de regras: orçamento, total do grupo, IDs, duplicatas, sobreposição, orçamento zero, entrada inválida, functionCall/functionResponse com ID e assinatura preservados, função desconhecida, resposta sem chamada e códigos meteorológicos.
- Build Vite concluído.
- Auditoria: zero vulnerabilidades após atualizar Zod.
- Geocoding: Curitiba, Paraná resolvida.
- Forecast: previsão para 28/10/2026, mínima 12,1 °C, máxima 22,4 °C e probabilidade de chuva 63% na consulta registrada.
- Wikipédia: português e alternativa em inglês testados. Sobrecarga transitória na busca em português motivou a alternativa.
- Gemini `gemini-3.5-flash`: geração real com as quatro funções; teste por script estimou R$ 95 por pessoa num limite de R$ 100.
- Formulário: geração real capturada no navegador, estimando R$ 90 por pessoa. Gerações diferentes podem produzir sugestões diferentes.
- Nenhum erro JavaScript observado; sem overflow horizontal em 390 px no início e resultado demonstrativo.
- Download TXT, modal, detalhes de ferramentas e mensagem HTTP 429 verificados. O erro HTTP foi simulado pelo teste, sem consumir cota.
- Prints em `docs/screenshots/`. Arquivos de exemplo e roteiro mobile são demonstrativos. `07-roteiro-real.png` e `08-function-calling-real.png` mostram consulta real.

Disponibilidade de modelos, cotas e APIs pode mudar. Os testes não certificam preços, funcionamento de locais ou deslocamentos.
