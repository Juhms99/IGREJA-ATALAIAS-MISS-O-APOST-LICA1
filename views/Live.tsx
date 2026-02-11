
import React, { useState } from 'react';
import { Send, Users, Radio, MessageSquare } from 'lucide-react';

const Live: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { id: 1, user: 'Ir. João', text: 'Paz do Senhor!' },
    { id: 2, user: 'Missionária Maria', text: 'Amém! Glória a Deus por este culto.' },
    { id: 3, user: 'Diác. Carlos', text: 'Culto abençoado!' }
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChat([...chat, { id: Date.now(), user: 'Você', text: message }]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-red-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold animate-pulse uppercase">
            <Radio size={10} className="mr-1" />
            Ao Vivo
          </div>
          <h2 className="text-lg font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter">Culto de Celebração</h2>
        </div>
        <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold bg-black px-3 py-1 rounded-full border border-amber-500/20">
          <Users size={12} />
          <span>124</span>
        </div>
      </div>

      {/* Video Player Placeholder */}
      <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-amber-500/10">
        <img 
          src="https://picsum.photos/seed/church-altar/800/450" 
          className="w-full h-full object-cover opacity-40" 
          alt="Transmissão ao vivo" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-amber-500/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-500/30 transition-all border border-amber-500/30 text-amber-500">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-current border-b-[12px] border-b-transparent ml-2"></div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">Tempo Real • AMA</span>
        </div>
      </div>

      {/* Chat Section - Black/Gold Redesign */}
      <div className="flex-1 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-slate-50 dark:border-white/5 flex items-center">
          <MessageSquare size={16} className="text-amber-500 mr-2" />
          <h3 className="font-black text-slate-800 dark:text-amber-500 uppercase text-xs tracking-widest">Chat da Igreja</h3>
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[300px]">
          {chat.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.user === 'Você' ? 'items-end' : 'items-start'}`}>
              <span className="text-[9px] font-black mb-1 uppercase tracking-widest text-slate-400">
                {msg.user}
              </span>
              <div className={`p-3 rounded-2xl text-sm max-w-[85%] ${
                msg.user === 'Você' 
                  ? 'bg-amber-500 text-black rounded-tr-none font-medium' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-4 border-t border-slate-50 dark:border-white/5 flex items-center space-x-2">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Interaja com os irmãos..." 
            className="flex-1 bg-slate-50 dark:bg-white/5 border-none rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-amber-500 dark:text-white"
          />
          <button 
            type="submit"
            className="bg-amber-500 text-black p-3 rounded-2xl shadow-lg shadow-amber-500/10 hover:bg-amber-600 active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Live;
