
import React, { useState } from 'react';
import { Book, Music, Search } from 'lucide-react';
import Bible from './Bible';
import Harpa from './Harpa';

const HolyResources: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'bible' | 'harpa'>('bible');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Unificado */}
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-amber-500 uppercase leading-none">
            {activeSubTab === 'bible' ? 'Santa Bíblia' : 'Harpa Cristã'}
          </h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
            {activeSubTab === 'bible' ? 'Almeida Revista e Corrigida' : 'Louvores e Adoração'}
          </p>
        </div>
        <div className="w-12 h-12 bg-black text-amber-500 rounded-2xl flex items-center justify-center shadow-lg border border-amber-500/20">
          {activeSubTab === 'bible' ? <Book size={24} /> : <Music size={24} />}
        </div>
      </header>

      {/* Seletor de Abas Superiores - Estilo Luxo */}
      <div className="flex bg-slate-100 dark:bg-black p-1.5 rounded-[2rem] border border-slate-200 dark:border-amber-500/10 shadow-inner">
        <button 
          onClick={() => setActiveSubTab('bible')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
            activeSubTab === 'bible' 
              ? 'bg-amber-500 text-black shadow-xl scale-[1.02]' 
              : 'text-slate-400 hover:text-amber-500/60'
          }`}
        >
          <Book size={16} />
          <span>Bíblia</span>
        </button>
        <button 
          onClick={() => setActiveSubTab('harpa')}
          className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
            activeSubTab === 'harpa' 
              ? 'bg-amber-500 text-black shadow-xl scale-[1.02]' 
              : 'text-slate-400 hover:text-amber-500/60'
          }`}
        >
          <Music size={16} />
          <span>Harpa</span>
        </button>
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="transition-all duration-300">
        {activeSubTab === 'bible' ? (
          <div className="animate-in slide-in-from-left-4 duration-300">
            {/* Versão simplificada da Bíblia (reutilizando a lógica existente, mas sem o header duplicado) */}
            <BibleContentOnly />
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <HarpaContentOnly />
          </div>
        )}
      </div>
    </div>
  );
};

// Componentes internos para evitar repetição de headers
const BibleContentOnly: React.FC = () => {
  const books = [
    { name: 'Gênesis', chapters: 50 },
    { name: 'Êxodo', chapters: 40 },
    { name: 'Salmos', chapters: 150 },
    { name: 'Mateus', chapters: 28 },
    { name: 'João', chapters: 21 },
    { name: 'Atos', chapters: 28 },
    { name: 'Apocalipse', chapters: 22 }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40" size={18} />
        <input 
          type="text" 
          placeholder="Buscar livro ou versículo..." 
          className="w-full bg-white dark:bg-black border border-slate-100 dark:border-amber-500/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm dark:text-white"
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {books.map((book) => (
          <button 
            key={book.name}
            className="flex items-center justify-between p-5 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm hover:border-amber-500 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/5 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors border border-transparent group-hover:border-amber-500/20">
                <Book size={16} />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tight text-base">{book.name}</h4>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{book.chapters} Capítulos</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

import { MOCK_HYMNS } from '../constants';
import { Heart } from 'lucide-react';

const HarpaContentOnly: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredHymns = MOCK_HYMNS.filter(h => 
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.number.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40" size={18} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Número ou nome do hino..." 
          className="w-full bg-white dark:bg-black border border-slate-100 dark:border-amber-500/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm dark:text-white"
        />
      </div>
      <div className="space-y-3">
        {filteredHymns.map((hymn) => (
          <div key={hymn.number} className="p-5 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm flex items-center space-x-4 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex flex-col items-center justify-center text-amber-500 font-black border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <span className="text-[8px] uppercase tracking-tighter opacity-50 font-bold">Nº</span>
              <span className="text-lg leading-none">{hymn.number}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-slate-800 dark:text-amber-100 uppercase tracking-tight text-base">{hymn.title}</h4>
              <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">"{hymn.lyrics}"</p>
            </div>
            <button className="text-slate-200 dark:text-white/10 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolyResources;
