from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
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
