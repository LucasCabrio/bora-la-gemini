import { ArrowUpRight, Compass } from 'lucide-react';
export default function Header({ onAbout }) {
  return <header className="header"><a className="brand" href="#"><span className="brand-icon"><Compass size={25}/></span>bora lá<span className="brand-dot">.</span></a><nav aria-label="Navegação principal"><a href="#planejar">Planejar um rolê</a><button className="nav-about" onClick={onAbout}>Como funciona <ArrowUpRight size={15}/></button></nav><span className="header-note"><span/> Menos pesquisa. Mais passeio.</span></header>;
}
