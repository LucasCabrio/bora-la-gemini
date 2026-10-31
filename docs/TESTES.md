## Testar

```powershell
npm test
npm run build
npm run check:apis
```

`check:apis` faz consultas reais, **consome cota do Gemini** e salva evidências na pasta ignorada `tmp/`. Testes unitários usam dependências simuladas. `scripts/capture.cjs` requer Playwright/Chrome e o app rodando; testa navegação, exemplo, download, erro, celular de 390 px e geração real. O PDF pode ser recriado com Python, ReportLab e Pillow: `python scripts/create_report.py`, após gerar as capturas.

Proteções acadêmicas: validação, corpo de 8 KB, três gerações simultâneas, cinco pedidos por IP por minuto, timeout nas APIs, funções permitidas por etapa e conferência de IDs/valores. Publicação exigiria autenticação, controle persistente de custos e revisão de infraestrutura.
