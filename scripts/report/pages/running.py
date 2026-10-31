from ..context import c, ROOT, TMP, GREEN, LIME, MUTED
from ..layout import start, section, paragraph
from ..drawing import box, screenshot
from reportlab.lib.colors import white
from PIL import Image
from xml.sax.saxutils import escape

def render():
    y = start('8. Execução', 'Instalação e limitações', 'Node.js 22+, npm e acesso à internet para a geração real.')
    y = section('Primeira execução em outra máquina', '1. Instale as dependências: npm install<br/>2. Copie .env.example para .env.<br/>3. Preencha GEMINI_API_KEY; o modelo padrão é gemini-3.5-flash.<br/>4. Execute npm run dev e abra http://localhost:5173.<br/>Nesta máquina, o .env já está configurado e não deve ser sobrescrito.',y)
    y = section('Produção local e testes', 'npm run build gera o front-end; npm start serve tudo em localhost:3001.<br/>npm test executa testes sem consumir a API.<br/>npm run check:apis verifica as APIs e consome cota do Gemini.<br/>Os scripts de captura e PDF são ferramentas opcionais de documentação.',y)
    y = section('Limites dos dados', 'A previsão é diária e pode mudar. A Wikipédia fornece artigos próximos, sem garantir interesse turístico, abertura ou acessibilidade. Cidades homônimas usam o primeiro resultado. Distância é até o centro consultado, não entre paradas. Não há cálculo de trânsito ou deslocamento.',y)
    y = section('Limites da IA', 'Custos, horários e plano B são sugestões. A validação impede ultrapassar o orçamento estimado e usar IDs inexistentes nas paradas, mas não garante preço real nem viabilidade de toda recomendação textual. É necessário conferir canais oficiais.',y)
    y = section('Quando uma API falhar', 'O app mostra o erro e permite tentar novamente. A Wikipédia em inglês pode substituir a consulta em português quando indisponível. Para explicar a interface sem internet, abra o exemplo e informe que seus dados são simulados.',y)
    paragraph('O servidor aceita conexões locais. Publicação pública exigiria autenticação, limites persistentes, acompanhamento de custos e infraestrutura apropriada.',48,y,size=9.5,color=MUTED)
