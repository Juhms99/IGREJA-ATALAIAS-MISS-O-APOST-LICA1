
import React, { useState } from 'react';
import { Book, ChevronRight, Search, Bookmark } from 'lucide-react';

const Bible: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-amber-500 uppercase leading-none">Santa Bíblia</h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Almeida Revista e Corrigida</p>
        </div>
        <div className="w-12 h-12 bg-black text-amber-500 rounded-2xl flex items-center justify-center shadow-lg border border-amber-500/20">
          <Book size={24} />
        </div>
      </header>

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
            onClick={() => setSelectedBook(book.name)}
            className="flex items-center justify-between p-5 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm hover:border-amber-500 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/5 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-amber-500 transition-colors border border-transparent group-hover:border-amber-500/20">
                <Bookmark size={16} />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tight text-base">{book.name}</h4>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{book.chapters} Capítulos</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300 dark:text-white/10 group-hover:text-amber-500" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Bible;
