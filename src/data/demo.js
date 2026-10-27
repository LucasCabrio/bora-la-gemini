const places = [
  { id: 1, name: 'Jardim Botânico de Curitiba', latitude: -25.442, longitude: -49.239, url: 'https://pt.wikipedia.org/wiki/Jardim_Bot%C3%A2nico_de_Curitiba' },
  { id: 2, name: 'Museu Oscar Niemeyer', latitude: -25.410, longitude: -49.267, url: 'https://pt.wikipedia.org/wiki/Museu_Oscar_Niemeyer' },
  { id: 3, name: 'Largo da Ordem', latitude: -25.426, longitude: -49.272, url: 'https://pt.wikipedia.org/wiki/Largo_da_Ordem' },
];
export const demo = {
  mode: 'demo', model: 'Exemplo ilustrativo',
  location: { name: 'Curitiba', state: 'Paraná' },
  request: { city: 'Curitiba', budget: 100, people: 2, day: 'amanha', interest: 'misturado', notes: '' },
  weather: { date: '2026-10-28', min: 16, max: 24, rain: 20, label: 'Entre nuvens', source: 'Dados simulados' },
  plan: {
    title: 'Um respiro verde, um pouco de arte.',
    summary: 'Uma tarde para descobrir Curitiba sem pressa: comece entre jardins, encontre a arquitetura e termine pelas ruas do centro histórico.',
    weatherAdvice: 'Neste exemplo, o dia tem temperaturas amenas e pouca chance de chuva. Leve água e um casaco leve para o fim da tarde.',
    backup: 'Se o tempo virar, troque a caminhada pelos jardins por uma visita ao museu, após confirmar funcionamento e ingresso. Em caso de tempestade, adie o passeio.',
    stops: [
      { placeId: 1, place: places[0], time: '13:00', duration: 60, cost: 0, activity: 'Caminhe pelos jardins e observe a estufa pelo lado de fora. Um começo tranquilo para conversar e fotografar.' },
      { placeId: 2, place: places[1], time: '14:40', duration: 90, cost: 30, activity: 'Reserve um tempo para a arquitetura e as exposições. O valor é uma estimativa; confirme o ingresso e os horários no site oficial.' },
      { placeId: 3, place: places[2], time: '16:40', duration: 45, cost: 0, activity: 'Finalize com uma caminhada pelo centro histórico. Faça uma pausa para um lanche dentro da reserva de alimentação.' },
    ], food: 25, transport: 20, total: 75, groupTotal: 150, remaining: 25,
  },
  trace: [
    { name: 'localizar_cidade', detail: 'Exemplo de localização: Curitiba, Paraná', ms: 0, status: 'ok' },
    { name: 'consultar_clima', detail: 'Previsão ilustrativa: 16 a 24 °C', ms: 0, status: 'ok' },
    { name: 'buscar_locais', detail: '3 locais selecionados manualmente para demonstração', ms: 0, status: 'ok' },
    { name: 'concluir_roteiro', detail: 'Exemplo de roteiro, sem chamada ao Gemini', ms: 0, status: 'ok' },
  ],
};
