# Bora Lá

Planejador de passeios com React, Gemini, previsão do tempo e locais da Wikipédia.

- Lucas Cabrio - 04723-133
- Paulo Esteves - 04723-090

## Por que fazer?

Escolher um passeio exige pesquisar lugares, clima e gastos em páginas diferentes.
O projeto reúne essas informações em um roteiro curto, com valores estimados e alternativa para chuva.

## Rodar o projeto

Requer Node.js 22+ e uma chave Gemini configurada no `.env`.
Nesta máquina o arquivo já está configurado; em outra, copie `.env.example` e preencha a chave.

```powershell
npm install
npm run dev
```

Abra http://localhost:5173. Para produção local: `npm run build` e `npm start` (porta 3001).

## Ler o código

- `src/App.jsx`: organiza a página.
- `src/components/`: formulário, cartões e mensagens, separados por função.
- `src/styles/`: regras CSS e adaptações de tela em arquivos pequenos.
- `server/services/planner.js`: controla a conversa com o Gemini.
- `server/tools/execute.js`: executa as funções pedidas pelo modelo.
- `server/lib/validation.js`: confere locais, horários e orçamento.
- `scripts/report/`: layout e páginas do PDF.

Todos os arquivos mantidos manualmente têm até 50 linhas, contando linhas em branco.
`package-lock.json` é gerado pelo npm e não entra no limite, assim como dependências, build e binários.

## Verificar e estudar

Execute `npm test`, `npm run build` e `npm run check:lines`.
`npm run check:apis` consulta os serviços reais e consome cota do Gemini.

- [Arquitetura e function calling](docs/ARQUITETURA.md)
- [APIs e limitações](docs/APIS.md)
- [Instalação](docs/EXECUCAO.md) e [uso](docs/USO.md)
- [Guia de apresentação](docs/APRESENTACAO.md) e [testes](docs/VALIDACAO.md)
- [Relatório PDF](output/pdf/Bora_La_Lucas_Cabrio_Paulo_Esteves.pdf)
- [Referências](docs/REFERENCIAS.md)
