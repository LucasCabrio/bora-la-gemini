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

ROOT = Path(__file__).resolve().parents[2]
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
