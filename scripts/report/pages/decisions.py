from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
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
