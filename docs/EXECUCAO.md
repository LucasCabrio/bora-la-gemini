## Executar

Requisitos: Node.js 22 ou superior, npm, internet e uma chave Gemini com cota para o modelo configurado.

```powershell
npm install
Copy-Item .env.example .env
# Edite .env e preencha GEMINI_API_KEY
npm run dev
```

Abra **http://localhost:5173**. Nesta máquina, o `.env` já foi configurado localmente; **não substitua esse arquivo**. Ele é ignorado pelo Git. Nunca use prefixo `VITE_` para a chave: isso exporia o segredo no navegador.

Para executar o build de produção local:

```powershell
npm run build
npm start
```

Abra **http://localhost:3001**. O servidor usa `127.0.0.1`, voltado à demonstração local. O modo demonstrativo não consulta APIs, mas a aplicação ainda precisa estar rodando. As fontes do Google são opcionais, com fontes de sistema como alternativa.
