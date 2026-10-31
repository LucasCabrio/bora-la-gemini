from .context import ROOT, c, MUTED
from .layout import paragraph
from reportlab.lib.colors import HexColor
from PIL import Image

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
