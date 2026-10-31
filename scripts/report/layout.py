from .context import c, W, H, GREEN, MUTED, BG, BODY, BOLD
from . import context
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

def paragraph(text, x, y, width=499, size=10.5, color=GREEN, bold=False, leading=None):
    style = ParagraphStyle('p', fontName=BOLD if bold else BODY, fontSize=size,
                           leading=leading or size*1.5, textColor=color, spaceAfter=0)
    p = Paragraph(text, style)
    _, height = p.wrap(width, 750)
    if y-height < 49:
        raise ValueError(f'Texto excede a página {context.page}: {text[:60]}')
    p.drawOn(c, x, y-height)
    return y-height

def start(label, title, subtitle=None):
    if context.page: c.showPage()
    context.page += 1
    c.setFillColor(BG); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(GREEN); c.setFont(BOLD, 12); c.drawString(48, H-39, 'bora lá.')
    c.setFont(BODY, 8); c.setFillColor(MUTED); c.drawRightString(W-48, H-38, 'PROJETO ACADÊMICO • 2026')
    c.setStrokeColor(HexColor('#dfe5d6')); c.line(48, 46, W-48, 46)
    c.setFont(BODY, 7.5); c.drawString(48, 31, 'Lucas Cabrio  |  Paulo Esteves')
    c.drawRightString(W-48, 31, f'{context.page:02d}')
    y = paragraph(label.upper(), 48, H-76, size=8, color=MUTED, bold=True)
    y = paragraph(title, 48, y-14, size=22, bold=True, leading=28)
    if subtitle: y = paragraph(subtitle, 48, y-13, size=10.5, color=MUTED)
    return y-23

def section(title, text, y):
    y = paragraph(title, 48, y, size=12, bold=True)
    return paragraph(text, 48, y-7, size=10.5, color=MUTED)-20
