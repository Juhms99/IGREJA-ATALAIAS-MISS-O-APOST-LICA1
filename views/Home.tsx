
import React, { useState, useEffect } from 'react';
import { Megaphone, Calendar, Radio, Users, Heart, Cake, Sparkles, IdCard, Camera, ArrowRight, ShieldCheck } from 'lucide-react';
import { MOCK_NOTICES, MOCK_EVENTS, MOCK_MEMBERS, MOCK_CULT_PHOTOS } from '../constants';
import { getDailyVerse } from '../services/geminiService';

interface HomeProps {
  onNavigate: (tab: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [verse, setVerse] = useState<any>(null);
  const [loadingVerse, setLoadingVerse] = useState(true);

  useEffect(() => {
    const fetchVerse = async () => {
      const data = await getDailyVerse();
      setVerse(data);
      setLoadingVerse(false);
    };
    fetchVerse();
  }, []);

  const birthdayPeople = MOCK_MEMBERS.filter(m => {
    const today = new Date();
    const bMonth = parseInt(m.birthDate.split('-')[1]);
    return bMonth === (today.getMonth() + 1);
  });

  return (
    <div className="space-y-6">
      {/* Featured Verse */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black to-slate-900 border border-amber-500/30 rounded-3xl p-6 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-20 text-amber-500">
          <Sparkles size={100} />
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500 mb-2 flex items-center">
          <Sparkles size={14} className="mr-2" />
          Palavra do Dia
        </h2>
        {loadingVerse ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <p className="text-xl font-serif leading-tight italic text-amber-100">"{verse?.verse}"</p>
            <p className="text-sm font-bold mt-2 text-amber-400">— {verse?.reference}</p>
            <p className="text-[11px] mt-3 opacity-60 border-t border-amber-500/10 pt-3">{verse?.reflection}</p>
          </>
        )}
      </div>

      {/* Quick Access ID Card */}
      <button 
        onClick={() => onNavigate('idcard')}
        className="w-full bg-black border border-amber-500/20 p-5 rounded-3xl flex items-center justify-between shadow-lg group hover:border-amber-500 transition-all"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
            <IdCard size={24} />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Cartão de Membro</h4>
            <p className="text-[10px] text-amber-400/60 font-bold uppercase tracking-widest">Acesso à Credencial Digital</p>
          </div>
        </div>
        <ArrowRight size={20} className="text-amber-500/30 group-hover:text-amber-500 transition-colors" />
      </button>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('live')}
          className="flex items-center justify-center space-x-2 bg-red-600 text-white p-4 rounded-2xl font-bold shadow-lg hover:bg-red-700 transition-all active:scale-95"
        >
          <Radio size={20} className="animate-pulse" />
          <span className="uppercase text-[10px] tracking-widest font-black">Ao Vivo</span>
        </button>
        <button 
          onClick={() => onNavigate('donations')}
          className="flex items-center justify-center space-x-2 bg-amber-500 text-black p-4 rounded-2xl font-bold shadow-lg hover:bg-amber-600 transition-all active:scale-95"
        >
          <Heart size={20} fill="black" />
          <span className="uppercase text-[10px] tracking-widest font-black">Ofertar</span>
        </button>
      </div>

      {/* Birthdays Section */}
      {birthdayPeople.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter flex items-center">
              <Cake size={18} className="mr-2" />
              Aniversariantes
            </h3>
            <span className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest">Este Mês</span>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {birthdayPeople.map((member) => (
              <div key={member.id} className="min-w-[120px] flex flex-col items-center space-y-2 bg-white dark:bg-black p-4 rounded-[2.5rem] border border-slate-100 dark:border-amber-500/10 shadow-sm">
                <div className="relative">
                  <img 
                    src={member.photoUrl} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/30"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-1 rounded-full border-2 border-black">
                    <Cake size={10} />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-[10px] font-black text-slate-800 dark:text-white uppercase truncate w-24">{member.name.split(' ')[0]}</h4>
                  <p className="text-[8px] text-amber-500 font-bold uppercase">{member.birthDate.split('-')[2]}/{member.birthDate.split('-')[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cult Photos Gallery */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter flex items-center">
            <Camera size={18} className="mr-2" />
            Fotos do Culto
          </h3>
          <button className="text-[10px] font-black text-amber-500/50 uppercase tracking-widest">Galeria</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_CULT_PHOTOS.map((photo) => (
            <div key={photo.id} className="min-w-[240px] h-40 relative rounded-3xl overflow-hidden shadow-xl border border-white/5 group">
              <img 
                src={photo.url} 
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-lg">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notices */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter flex items-center">
            <Megaphone size={18} className="mr-2" />
            Avisos
          </h3>
        </div>
        <div className="space-y-3">
          {MOCK_NOTICES.map((notice) => (
            <div key={notice.id} className="bg-white dark:bg-black p-5 rounded-[2rem] border border-slate-100 dark:border-amber-500/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                  notice.category === 'Urgente' ? 'bg-red-100 text-red-600 dark:bg-red-900/40' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {notice.category}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">{notice.date}</span>
              </div>
              <h4 className="font-bold text-slate-800 dark:text-white">{notice.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">{notice.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter flex items-center">
            <Calendar size={18} className="mr-2" />
            Agenda
          </h3>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {MOCK_EVENTS.map((event) => (
            <div key={event.id} className="min-w-[200px] bg-black dark:bg-amber-500 p-5 rounded-[2rem] text-white dark:text-black flex-shrink-0 shadow-xl border border-amber-500/20">
              <div className="flex flex-col">
                <span className="text-amber-500 dark:text-black/60 font-black uppercase text-[10px] tracking-widest">{event.date}</span>
                <span className="text-slate-400 dark:text-black/50 text-xs font-bold mb-3">{event.time}</span>
                <h4 className="font-black text-base leading-tight uppercase tracking-tight">{event.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
