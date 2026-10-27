import { useState } from 'react';
import { MapPin, ArrowRight, LoaderCircle, Trees, Landmark, Shuffle, Sparkles } from 'lucide-react';
const interests = [{ id: 'misturado', name: 'Um pouco de tudo', Icon: Shuffle }, { id: 'natureza', name: 'Ar livre', Icon: Trees }, { id: 'cultura', name: 'Arte e cultura', Icon: Landmark }];
export default function PlannerForm({ onSubmit, loading, onDemo }) {
  const [form, setForm] = useState({ city: 'Curitiba', budget: 100, people: 2, day: 'amanha', interest: 'misturado', notes: '' });
  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  return <section id="planejar" className="planner-section"><div className="section-title"><div><span className="eyebrow">01 / O PONTO DE PARTIDA</span><h2>Qual é o plano de hoje?</h2></div><span className="small-muted">Você escolhe os limites. A gente conecta as ideias.</span></div>
    <form className="planner-card" onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      <fieldset disabled={loading} className="form-fields"><div className="form-grid">
        <label className="city-field">Em qual cidade?<span className="input-wrap"><MapPin size={18}/><input name="city" required minLength={2} maxLength={80} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Ex.: Curitiba"/></span><small>Cidades brasileiras · use somente o nome</small></label>
        <label>Quando?<select value={form.day} onChange={e => set('day', e.target.value)}><option value="hoje">Hoje</option><option value="amanha">Amanhã</option></select></label>
        <label>Orçamento por pessoa<span className="input-wrap"><span className="currency">R$</span><input aria-label="Orçamento por pessoa" type="number" required min={0} max={2000} step={1} value={form.budget} onChange={e => set('budget', e.target.value === '' ? '' : Number(e.target.value))}/></span></label>
        <label>Quantas pessoas?<select value={form.people} onChange={e => set('people', Number(e.target.value))}>{Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1} {i ? 'pessoas' : 'pessoa'}</option>)}</select></label>
      </div><div className="form-bottom"><div><span className="field-label">O que combina com você?</span><div className="interest-options">{interests.map(({ id, name, Icon }) => <button type="button" key={id} aria-pressed={form.interest === id} className={`interest ${form.interest === id ? 'selected' : ''}`} onClick={() => set('interest', id)}><Icon size={16}/>{name}</button>)}</div></div><label className="notes-field">Algum detalhe? <span className="optional">opcional</span><input placeholder="Ex.: prefiro caminhar e conhecer lugares tranquilos" value={form.notes} maxLength={350} onChange={e => set('notes', e.target.value)}/></label></div>
      <div className="form-actions"><span><Sparkles size={16}/> Planejado com Gemini. Conectado à cidade.</span><button type="submit" className="primary-button">{loading ? <><LoaderCircle className="spin" size={18}/> Montando seu roteiro…</> : <>Encontrar meu próximo rolê <ArrowRight size={18}/></>}</button></div></fieldset>
    </form><div className="under-form"><span>Sem cadastro. Sem complicação. Só boas ideias.</span><button disabled={loading} onClick={onDemo}>Só quero explorar um exemplo <ArrowRight size={14}/></button></div>
  </section>;
}
