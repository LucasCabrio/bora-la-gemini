from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
    y = start('4. Interface', 'Tela inicial e formulário', 'Captura real da tela inicial. Layout responsivo, controles rotulados e estados de interação.')
    y = screenshot('01-inicio-desktop.png', 38, y, 519, 530)
    y -= 17
    paragraph('O formulário separa orçamento por pessoa e tamanho do grupo. A preferência orienta a IA. O exemplo demonstrativo está disponível por uma ação explícita e não substitui automaticamente uma falha de API.', 48, y, size=10, color=MUTED)
