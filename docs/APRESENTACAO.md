# Apresentação do Bora Lá

Lucas Cabrio - 04723-133  
Paulo Esteves - 04723-090

## Roteiro de 5 a 7 minutos

1. **Problema (40 s):** “Escolher um passeio exige pesquisar locais, clima e gastos em várias páginas. Queremos reduzir esse esforço e incentivar conhecer a própria cidade.”
2. **Demonstração (2 min):** Curitiba, amanhã, R$ 100, duas pessoas. Gere o roteiro e explique o formulário enquanto carrega. Mostre clima, paradas, soma, plano B e fontes.
3. **Function calling (1 min):** expanda “Por trás do roteiro”. O modelo solicita ferramentas, o servidor executa as APIs. A IA não executa funções sozinha.
4. **Arquitetura (1 min):** React cuida da tela; Express valida o pedido; o planner conversa com Gemini e aciona serviços. A chave fica no servidor.
5. **Código (1 min):** mostre `planner.js`, `declarations.js`, `validation.js` e `PlanResult.jsx`.
6. **Limites (30 s):** previsão e locais vêm de APIs; preços e horários são sugestões. Não há reservas nem garantia de funcionamento.

Se internet ou cota falhar, abra o exemplo e explique que os dados são ilustrativos. Use prints e registro de teste real para mostrar a integração validada.

## Perguntas para os dois integrantes

**Por que IA?** Para combinar preferências, clima e locais em roteiro legível. Consultar APIs e somar valores são tarefas determinísticas do código.

**O que é function calling?** A IA devolve nome de função e argumentos estruturados; o programa valida, executa e devolve o resultado ao modelo.

**Onde está?** Esquemas em `server/tools/declarations.js`, execução em `server/services/planner.js`, HTTP em `server/services/gemini.js`.

**Por que funções sem argumentos?** Cidade e dia já foram validados no formulário; as funções usam esse contexto para evitar coordenadas inventadas. A conclusão recebe todos os argumentos do roteiro.

**A IA pode chamar qualquer função?** Não. `allowedFunctionNames` limita a etapa, e o servidor confere novamente. É um fluxo controlado com chamadas reais.

**Diferença para um prompt comum?** Não pedimos para adivinhar o clima: consultamos a API durante a conversa e devolvemos os dados antes da conclusão.

**Como impedir locais inventados?** IDs das paradas devem existir na busca e ser distintos. Isso não garante que o local esteja aberto.

**Como garante orçamento?** Soma estimativas de paradas, alimentação e transporte por pessoa e rejeita excedentes. Gasto real precisa ser confirmado.

**E as falhas?** Timeout, erros HTTP e falta de chave viram mensagens. Wikipédia em inglês é alternativa para falha/vazio em português. O exemplo não entra automaticamente.

**Por que sem Expo ou banco?** O requisito pede front-end, não app nativo nem contas. React web reduz infraestrutura. Resultado fica em memória e pode ser baixado em TXT.

**Componente versus serviço?** Componente monta interface; serviço concentra integração ou lógica. O hook gerencia os estados de requisição.

**Como protege a chave?** Backend, variável de ambiente e `.gitignore`. O arquivo de exemplo não contém credenciais.

**Por que REST direto?** `fetch` nativo deixa visível o JSON de `functionCall` e `functionResponse`, sem esconder o protocolo em um SDK. Preservamos partes do modelo e IDs.

**Melhorias futuras?** Seleção de cidades homônimas, horários e preços oficiais, deslocamentos, tradução de títulos e autenticação para publicação.

## Preparação conjunta

Os dois devem iniciar o projeto, explicar o caminho completo da solicitação, localizar cada função e distinguir dados reais de estimativas. Treinem alternando a demonstração e as respostas. Este guia não substitui a leitura do código.
