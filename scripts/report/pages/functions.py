from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
    y = start('3. Integração com Gemini', 'Implementação do function calling', 'O servidor envia as funções disponíveis ao modelo e executa as chamadas retornadas.')
    for title, text in [
        ('01  localizar_cidade()', 'O Gemini solicita a localização. O servidor usa a cidade já validada do formulário e consulta o Geocoding. As coordenadas retornadas alimentam as próximas funções.'),
        ('02  consultar_clima()', 'Com a cidade resolvida, o servidor consulta mínima, máxima e probabilidade de chuva para hoje ou amanhã, considerando o fuso retornado.'),
        ('03  buscar_locais()', 'A busca retorna IDs, nomes, coordenadas e links da Wikipédia. O código prioriza títulos de parques, museus, praças e outros espaços culturais.'),
        ('04  concluir_roteiro({...})', 'A IA envia os argumentos estruturados do roteiro: título, resumo, recomendações, plano B, paradas, horários e custos. Essa função encerra o fluxo quando a validação passa.')]:
        y = section(title, text, y)
    y = section('Por que as primeiras funções não recebem argumentos?', 'Cidade e dia já estão no contexto validado do pedido. Reutilizá-los evita coordenadas inventadas. A função final recebe argumentos detalhados produzidos pelo modelo.', y)
    y = section('Controle e correção', 'O modo ANY exige chamadas, e allowedFunctionNames limita a etapa. O servidor também confere o nome antes de executar. Saídas finais inválidas voltam como erro ao modelo para correção, dentro do limite. As mensagens originais, IDs e assinaturas são preservados.', y)
    paragraph('Arquivo central: server/services/planner.js<br/>Esquemas: server/tools/declarations.js • Regras: server/lib/validation.js', 48, y, size=9, color=MUTED)
