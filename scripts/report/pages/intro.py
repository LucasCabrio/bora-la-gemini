from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
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
