from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
    y = start('7. Implementação', 'Organização do código e testes', 'Código dividido por responsabilidade, com no máximo 50 linhas por arquivo mantido manualmente.')
    for title, text in [
        ('Interface', 'src/components: Header, Hero, PlannerForm, PlanResult, ToolTrace e AboutDialog. App.jsx compõe a página; usePlanner controla requisição, carregamento, erro e demonstração.'),
        ('Backend', 'server/index.js inicia o servidor; routes/plan.js recebe o pedido. planner.js controla o ciclo do Gemini; tools/execute.js executa as funções. lib/schemas.js define os campos e lib/validation.js confere o roteiro.'),
        ('Testes de regras', 'Conferem soma do orçamento e grupo, IDs desconhecidos/repetidos, sobreposição de horários, orçamento zero, entrada inválida, mensagens functionCall/functionResponse, função desconhecida e códigos de clima.'),
        ('Teste integrado e visual', 'Build de produção concluído. APIs reais consultadas e geração Gemini concluída. Navegador sem erros JavaScript observados, sem overflow em 390 px, com download TXT, modal e painel de ferramentas verificados. Mensagem HTTP 429 testada por simulação.'),
        ('Proteções implementadas', 'Corpo JSON limitado a 8 KB, cinco pedidos por IP por minuto, três gerações simultâneas, timeout nas APIs, lista de funções permitidas e oito rodadas no máximo. Auditoria de dependências sem vulnerabilidades na validação registrada.')]:
        y=section(title,text,y)
    paragraph('O modo demonstrativo não prova integração: por isso o material inclui capturas e testes de geração real. npm run check:lines verifica o limite. O package-lock.json é gerado pelo npm e fica fora dessa regra. Registros em docs/VALIDACAO.md.',48,y,size=10,color=MUTED)
