const number = { type: 'INTEGER' };
const text = { type: 'STRING' };
export const declarations = [
  { name: 'localizar_cidade', description: 'Obtém as coordenadas da cidade brasileira informada no formulário.', parameters: { type: 'OBJECT', properties: {} } },
  { name: 'consultar_clima', description: 'Consulta previsão real da cidade e do dia escolhidos, após localizar a cidade.', parameters: { type: 'OBJECT', properties: {} } },
  { name: 'buscar_locais', description: 'Busca locais com artigos na Wikipédia num raio de 10 km do centro da cidade localizada.', parameters: { type: 'OBJECT', properties: {} } },
  { name: 'concluir_roteiro', description: 'Entrega o roteiro baseado nos dados consultados. Todos os valores são estimativas por pessoa em reais inteiros.', parameters: { type: 'OBJECT', properties: {
    title: text, summary: text, weatherAdvice: text, backup: text,
    stops: { type: 'ARRAY', items: { type: 'OBJECT', properties: { placeId: number, time: { type: 'STRING', description: 'Horário sugerido HH:MM (24 horas).' }, duration: { type: 'INTEGER', description: 'Duração de 15 a 180 minutos.' }, activity: text, cost: number }, required: ['placeId', 'time', 'duration', 'activity', 'cost'] } },
    food: { type: 'INTEGER', description: 'Alimentação por pessoa.' }, transport: { type: 'INTEGER', description: 'Transporte por pessoa.' },
  }, required: ['title', 'summary', 'weatherAdvice', 'backup', 'stops', 'food', 'transport'] } },
];
