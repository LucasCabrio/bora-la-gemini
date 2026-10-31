"""Recria o PDF usando as páginas de scripts/report/pages."""
from report import context
from report.pages import intro, architecture, functions, desktop, result, mobile, code, running, decisions

for page in [intro, architecture, functions, desktop, result, mobile, code, running, decisions]:
    page.render()
context.c.save()
print(f"PDF criado: {context.OUT} ({context.page} páginas)")
