from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
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
