"""Gera o relatório acadêmico a partir dos prints reais em docs/screenshots."""
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf/Bora_La_Lucas_Cabrio_Paulo_Esteves.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
TMP = ROOT / 'tmp/pdfs'
TMP.mkdir(parents=True, exist_ok=True)
fonts = Path('C:/Windows/Fonts')
if (fonts / 'arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('Body', str(fonts / 'arial.ttf')))
    pdfmetrics.registerFont(TTFont('Bold', str(fonts / 'arialbd.ttf')))
else:
    pdfmetrics.registerFontFamily('Helvetica', normal='Helvetica', bold='Helvetica-Bold')
BODY = 'Body' if 'Body' in pdfmetrics.getRegisteredFontNames() else 'Helvetica'
BOLD = 'Bold' if 'Bold' in pdfmetrics.getRegisteredFontNames() else 'Helvetica-Bold'
GREEN, MUTED, LIME, BG = map(HexColor, ['#25332f', '#4f5753', '#e2e9df', '#ffffff'])
W, H = 595.28, 841.89
c = canvas.Canvas(str(OUT), pagesize=(W, H))
c.setTitle('Bora Lá - Arquitetura, implementação e apresentação')
c.setAuthor('Lucas Cabrio - 04723-133; Paulo Esteves - 04723-090')
page = 0

def paragraph(text, x, y, width=499, size=10.5, color=GREEN, bold=False, leading=None):
    style = ParagraphStyle('p', fontName=BOLD if bold else BODY, fontSize=size,
                           leading=leading or size*1.5, textColor=color, spaceAfter=0)
    p = Paragraph(text, style)
    _, height = p.wrap(width, 750)
    if y-height < 49:
        raise ValueError(f'Texto excede a página {page}: {text[:60]}')
    p.drawOn(c, x, y-height)
    return y-height

def start(label, title, subtitle=None):
    global page
    if page: c.showPage()
    page += 1
    c.setFillColor(BG); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(GREEN); c.setFont(BOLD, 12); c.drawString(48, H-39, 'bora lá.')
    c.setFont(BODY, 8); c.setFillColor(MUTED); c.drawRightString(W-48, H-38, 'PROJETO ACADÊMICO • 2026')
    c.setStrokeColor(HexColor('#dfe5d6')); c.line(48, 46, W-48, 46)
    c.setFont(BODY, 7.5); c.drawString(48, 31, 'Lucas Cabrio  |  Paulo Esteves')
    c.drawRightString(W-48, 31, f'{page:02d}')
    y = paragraph(label.upper(), 48, H-76, size=8, color=MUTED, bold=True)
    y = paragraph(title, 48, y-14, size=22, bold=True, leading=28)
    if subtitle: y = paragraph(subtitle, 48, y-13, size=10.5, color=MUTED)
    return y-23

def section(title, text, y):
    y = paragraph(title, 48, y, size=12, bold=True)
    return paragraph(text, 48, y-7, size=10.5, color=MUTED)-20

def screenshot(name, x, top, width, max_height):
    path = ROOT / 'docs/screenshots' / name
    with Image.open(path) as im: iw, ih = im.size
    scale = min(width/iw, max_height/ih)
    rw, rh = iw*scale, ih*scale
    c.drawImage(str(path), x+(width-rw)/2, top-rh, rw, rh, mask='auto')
    return top-rh

def box(x, y, width, height, title, body, fill='#eaf0e1'):
    c.setFillColor(HexColor(fill)); c.roundRect(x, y-height, width, height, 10, fill=1, stroke=0)
    yy = paragraph(title, x+14, y-13, width-28, size=11, bold=True)
    paragraph(body, x+14, yy-7, width-28, size=9, color=MUTED)

y = start('1. Introdução', 'Bora Lá: planejador de passeios',
          'Bora Lá: planejamento de passeios locais com Gemini, function calling e dados externos.')
c.setFillColor(GREEN); c.roundRect(48, y-111, 499, 111, 12, fill=1, stroke=0)
paragraph('EQUIPE', 66, y-16, size=8, color=LIME, bold=True)
paragraph('Lucas Cabrio - 04723-133<br/>Paulo Esteves - 04723-090', 66, y-39, size=14, color=white, leading=24)
y -= 139
y = section('O problema', 'Decidir onde passear costuma exigir várias pesquisas: atrações, previsão do tempo e gastos. Quem tem pouco tempo ou orçamento limitado pode desistir ou escolher um programa que não combina com o clima.', y)
y = section('A solução', 'Um formulário reúne cidade, dia, orçamento por pessoa, quantidade de pessoas e interesses. A IA combina informações externas em duas ou três paradas, explica a escolha, estima os gastos e sugere um plano B.', y)
y = section('Justificativa', 'A proposta reúne três decisões comuns antes de sair: onde ir, como estará o tempo e quanto gastar. É um problema pequeno o suficiente para implementar e testar, mas que exige integrar a IA a informações externas. O usuário consegue conferir os locais consultados e a composição dos gastos.', y)
y = section('Escopo do projeto', 'Aplicação web em React e Node.js, sem login, banco de dados ou aplicativo nativo. A complexidade fica concentrada no ciclo de ferramentas da IA, que pode ser acompanhado na própria interface.', y)
paragraph('Relatório de implementação - 27 de outubro de 2026', 48, y, size=9, color=MUTED)

y = start('2. Arquitetura', 'Organização da aplicação', 'Separação entre interface, orquestração, validação e serviços externos.')
box(48, y, 499, 67, '1. React + Vite', 'Formulário, estados de carregamento e erro, cartões do roteiro e download em TXT.')
y -= 84
box(48, y, 499, 67, '2. Express - POST /api/plan', 'Valida a entrada com Zod, limita requisições e encaminha o pedido ao planner.')
y -= 84
box(48, y, 499, 75, '3. Planner ↔ Gemini', 'Envia esquemas; recebe functionCall; executa a ferramenta; devolve functionResponse. Repete até concluir ou atingir o limite de oito rodadas.')
y -= 92
box(48, y, 241, 86, 'Open-Meteo', 'Geocoding: coordenadas e fuso.<br/>Forecast: temperaturas e probabilidade de chuva.')
box(306, y, 241, 86, 'Wikipédia / MediaWiki', 'Artigos georreferenciados até 10 km do centro. Alternativa em inglês quando necessário.')
y -= 104
box(48, y, 499, 73, '4. Validação → resposta JSON → componentes', 'Confere IDs, custos, duração e sequência de horários. Calcula total por pessoa, total do grupo e saldo do orçamento.')
y -= 95
y = section('Chave e dados', 'GEMINI_API_KEY fica no .env do backend, ignorado pelo Git. O navegador recebe apenas o resultado. Não existe persistência: recarregar a página descarta o roteiro; o usuário pode baixar um TXT.', y)
paragraph('O Google Maps é apenas um link de saída para coordenadas. Não há integração de rotas ou consulta de preços.', 48, y, size=9, color=MUTED)

y = start('3. Integração com Gemini', 'Implementação do function calling', 'O servidor envia as funções disponíveis ao modelo e executa as chamadas retornadas.')
for title, text in [
    ('01  localizar_cidade()', 'O Gemini solicita a localização. O servidor usa a cidade já validada do formulário e consulta o Geocoding. As coordenadas retornadas alimentam as próximas funções.'),
    ('02  consultar_clima()', 'Com a cidade resolvida, o servidor consulta mínima, máxima e probabilidade de chuva para hoje ou amanhã, considerando o fuso retornado.'),
    ('03  buscar_locais()', 'A busca retorna IDs, nomes, coordenadas e links da Wikipédia. O código prioriza títulos de parques, museus, praças e outros espaços culturais.'),
    ('04  concluir_roteiro({...})', 'A IA envia os argumentos estruturados do roteiro: título, resumo, recomendações, plano B, paradas, horários e custos. Essa função encerra o fluxo quando a validação passa.')]:
    y = section(title, text, y)
y = section('Por que as primeiras funções não recebem argumentos?', 'Cidade e dia já estão no contexto validado do pedido. Reutilizá-los evita coordenadas inventadas. A função final recebe argumentos detalhados produzidos pelo modelo.', y)
y = section('Controle e correção', 'O modo ANY exige chamadas, e allowedFunctionNames limita a etapa. O servidor também confere o nome antes de executar. Saídas finais inválidas voltam como erro ao modelo para correção, dentro do limite. As mensagens originais, IDs e assinaturas são preservados.', y)
paragraph('Arquivo central: server/services/planner.js<br/>Esquemas: server/tools/declarations.js • Regras: server/lib/validation.js', 48, y, size=9, color=MUTED)

y = start('4. Interface', 'Tela inicial e formulário', 'Captura real da tela inicial. Layout responsivo, controles rotulados e estados de interação.')
y = screenshot('01-inicio-desktop.png', 38, y, 519, 530)
y -= 17
paragraph('O formulário separa orçamento por pessoa e tamanho do grupo. A preferência orienta a IA. O exemplo demonstrativo está disponível por uma ação explícita e não substitui automaticamente uma falha de API.', 48, y, size=10, color=MUTED)

y = start('5. Resultado', 'Exemplo de consulta real', 'Captura de uma geração real via formulário em 27/10/2026, para Curitiba no dia seguinte.')
with Image.open(ROOT/'docs/screenshots/07-roteiro-real.png') as im:
    im.crop((0, 0, im.width, min(945, im.height))).save(TMP/'result-top.png')
with Image.open(TMP/'result-top.png') as im:
    rw=499; rh=rw*im.height/im.width
    c.drawImage(str(TMP/'result-top.png'),48,y-rh,rw,rh)
y -= rh+23
y = section('Leitura do resultado', 'A tela apresenta as paradas, os links dos locais, a previsão e a divisão dos gastos. O teste por script registrou R$ 95 por pessoa para um limite de R$ 100. A captura foi feita em outra consulta: os valores e as sugestões podem variar entre gerações.', y)
paragraph('Os títulos de locais podem aparecer em inglês quando a fonte alternativa é usada. A previsão veio da API; os preços e horários são estimativas. Nenhuma reserva ou confirmação de funcionamento é realizada.', 48, y, size=10, color=MUTED)

y = start('6. Interface', 'Chamadas de função e versão mobile', 'O painel de ferramentas torna o fluxo visível; o layout se adapta a telas pequenas.')
y = screenshot('08-function-calling-real.png', 48, y, 499, 180)
y -= 19
paragraph('Acima: chamadas reais executadas no backend. Os tempos medem as funções, sem incluir a espera pela geração do Gemini.',48,y,size=9,color=MUTED)
y -= 43
# Recorte fiel da captura mobile para manter os controles legíveis no PDF.
with Image.open(ROOT/'docs/screenshots/09-formulario-mobile.png') as im:
    im.save(TMP/'mobile-form.png')
c.drawImage(str(TMP/'mobile-form.png'),48,y-350,185,350)
yy = paragraph('Testado em 390 px',255,y,285,size=16,bold=True)
yy = paragraph('O formulário muda para uma coluna com campos agrupados. Os cartões do resultado também se empilham, sem rolagem horizontal.',255,yy-12,285,size=11,color=MUTED)
yy = paragraph('Estados contemplados',255,yy-24,285,size=12,bold=True)
yy = paragraph('• Carregando, com envio desabilitado.<br/>• Falha de conexão ou API.<br/>• Resultado real.<br/>• Exemplo identificado.<br/>• Confirmação do download TXT.',255,yy-10,285,size=10.5,color=MUTED)
paragraph('A ilustração da página inicial usa CSS e SVG. Não é um mapa navegável nem uma rota calculada.',255,yy-22,285,size=10,color=MUTED)

y = start('7. Implementação', 'Organização do código e testes', 'Arquivos pequenos por responsabilidade, sem uma única tela concentrando todas as regras.')
for title, text in [
    ('Interface', 'src/components: Header, Hero, PlannerForm, PlanResult, ToolTrace e AboutDialog. App.jsx compõe a página; usePlanner controla requisição, carregamento, erro e demonstração.'),
    ('Backend', 'server/index.js expõe as rotas. services separa Gemini, localização, clima e orquestração. tools declara esquemas. lib reúne HTTP, erros, validação de entrada e validação do roteiro.'),
    ('Testes de regras', 'Conferem soma do orçamento e grupo, IDs desconhecidos/repetidos, sobreposição de horários, orçamento zero, entrada inválida, mensagens functionCall/functionResponse, função desconhecida e códigos de clima.'),
    ('Teste integrado e visual', 'Build de produção concluído. APIs reais consultadas e geração Gemini concluída. Navegador sem erros JavaScript observados, sem overflow em 390 px, com download TXT, modal e painel de ferramentas verificados. Mensagem HTTP 429 testada por simulação.'),
    ('Proteções implementadas', 'Corpo JSON limitado a 8 KB, cinco pedidos por IP por minuto, três gerações simultâneas, timeout nas APIs, lista de funções permitidas e oito rodadas no máximo. Auditoria de dependências sem vulnerabilidades na validação registrada.')]:
    y=section(title,text,y)
paragraph('O modo demonstrativo não prova integração: por isso o material inclui capturas e testes de geração real. Os registros completos estão em docs/VALIDACAO.md.',48,y,size=10,color=MUTED)

y = start('8. Execução', 'Instalação e limitações', 'Node.js 22+, npm e acesso à internet para a geração real.')
y = section('Primeira execução em outra máquina', '1. Instale as dependências: npm install<br/>2. Copie .env.example para .env.<br/>3. Preencha GEMINI_API_KEY; o modelo padrão é gemini-3.5-flash.<br/>4. Execute npm run dev e abra http://localhost:5173.<br/>Nesta máquina, o .env já está configurado e não deve ser sobrescrito.',y)
y = section('Produção local e testes', 'npm run build gera o front-end; npm start serve tudo em localhost:3001.<br/>npm test executa testes sem consumir a API.<br/>npm run check:apis verifica as APIs e consome cota do Gemini.<br/>Os scripts de captura e PDF são ferramentas opcionais de documentação.',y)
y = section('Limites dos dados', 'A previsão é diária e pode mudar. A Wikipédia fornece artigos próximos, sem garantir interesse turístico, abertura ou acessibilidade. Cidades homônimas usam o primeiro resultado. Distância é até o centro consultado, não entre paradas. Não há cálculo de trânsito ou deslocamento.',y)
y = section('Limites da IA', 'Custos, horários e plano B são sugestões. A validação impede ultrapassar o orçamento estimado e usar IDs inexistentes nas paradas, mas não garante preço real nem viabilidade de toda recomendação textual. É necessário conferir canais oficiais.',y)
y = section('Quando uma API falhar', 'O app mostra o erro e permite tentar novamente. A Wikipédia em inglês pode substituir a consulta em português quando indisponível. Para explicar a interface sem internet, abra o exemplo e informe que seus dados são simulados.',y)
paragraph('O servidor aceita conexões locais. Publicação pública exigiria autenticação, limites persistentes, acompanhamento de custos e infraestrutura apropriada.',48,y,size=9.5,color=MUTED)

y = start('9. Decisões técnicas', 'Escolhas do projeto e referências', 'Resumo das escolhas de implementação. O guia de apresentação está em docs/APRESENTACAO.md.')
for title,text in [
    ('Uso de funções', 'A IA solicita uma função com dados estruturados. O servidor executa e devolve o resultado. A IA não acessa nossas APIs nem executa código por conta própria.'),
    ('Papel da IA', 'Ela combina preferências e informações externas em um roteiro explicado. Consultas, somas e validações continuam sendo feitas por código determinístico.'),
    ('Verificação da integração', 'O teste integrado executou as funções de localização, clima e busca antes de concluir o roteiro. O painel mostra as chamadas realizadas. O exemplo estático fica separado e identificado na interface.'),
    ('React web e ausência de banco de dados', 'Atende ao requisito de front-end com uma arquitetura menor. Não é necessário armazenar contas ou roteiros para demonstrar o problema proposto.'),
    ('Configuração da chave', 'Ela está no .env do servidor e não vai para o front-end nem para o Git. O repositório contém apenas .env.example, sem credencial.')]:
    y=section(title,text,y)
y=paragraph('Referências técnicas',48,y,size=12,bold=True)-10
for label,url in [
    ('Gemini - Function calling','https://ai.google.dev/gemini-api/docs/function-calling'),
    ('Open-Meteo - Geocoding','https://open-meteo.com/en/docs/geocoding-api'),
    ('Open-Meteo - Forecast','https://open-meteo.com/en/docs'),
    ('MediaWiki - Geosearch','https://www.mediawiki.org/wiki/API:Geosearch')]:
    y=paragraph(f'<link href="{escape(url)}" color="#486e39">{escape(label)}</link>',48,y,size=9)-6
paragraph('Fontes consultadas em 27/10/2026. Créditos: Open-Meteo (CC BY 4.0), GeoNames, Wikipédia, Lucide e Google Fonts. Consulte também docs/APRESENTACAO.md para ensaiar as respostas.',48,y-8,size=9,color=MUTED)
c.save()
print(f'PDF criado: {OUT} ({page} páginas)')
