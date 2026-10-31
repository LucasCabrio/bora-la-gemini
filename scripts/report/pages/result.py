from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
    y = start('5. Resultado', 'Exemplo de consulta real', 'Captura de uma geração real via formulário em 27/10/2026, para Curitiba no dia seguinte.')
    with Image.open(ROOT/'docs/screenshots/07-roteiro-real.png') as im:
        im.crop((0, 0, im.width, min(945, im.height))).save(TMP/'result-top.png')
    with Image.open(TMP/'result-top.png') as im:
        rw=499; rh=rw*im.height/im.width
        c.drawImage(str(TMP/'result-top.png'),48,y-rh,rw,rh)
    y -= rh+23
    y = section('Leitura do resultado', 'A tela apresenta as paradas, os links dos locais, a previsão e a divisão dos gastos. O teste por script registrou R$ 95 por pessoa para um limite de R$ 100. A captura foi feita em outra consulta: os valores e as sugestões podem variar entre gerações.', y)
    paragraph('Os títulos de locais podem aparecer em inglês quando a fonte alternativa é usada. A previsão veio da API; os preços e horários são estimativas. Nenhuma reserva ou confirmação de funcionamento é realizada.', 48, y, size=10, color=MUTED)
