
import React, { useState } from 'react';
import { HandHeart, Send, ShieldCheck, CheckCircle, Clock } from 'lucide-react';
import { MOCK_PRAYERS } from '../constants';
import { PrayerRequest, MemberRole, Member } from '../types';

interface PrayerProps {
  user: Member | null;
}

const PrayerRequests: React.FC<PrayerProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'public' | 'mine' | 'moderate'>(
    user?.role === MemberRole.PASTOR ? 'moderate' : 'public'
  );
  const [newRequest, setNewRequest] = useState('');
  const [requests, setRequests] = useState<PrayerRequest[]>(MOCK_PRAYERS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.trim()) return;
    const req: PrayerRequest = {
      id: Date.now().toString(),
      requesterName: user?.name || 'Anônimo',
      memberId: user?.id,
      request: newRequest,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setRequests([req, ...requests]);
    setNewRequest('');
    alert('Pedido enviado para análise pastoral.');
  };

  const moderateRequest = (id: string, status: 'approved' | 'rejected') => {
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  const isAdmin = user?.role === MemberRole.PASTOR;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-amber-500 uppercase leading-none">Pedidos de Oração</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Intercedendo uns pelos outros</p>
        </div>
        <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-500/20">
          <HandHeart size={24} />
        </div>
      </header>

      {/* Tabs - Gold Redesign */}
      <div className="flex bg-slate-100 dark:bg-black p-1 rounded-2xl border border-slate-200 dark:border-white/5">
        <button 
          onClick={() => setActiveTab('public')}
          className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'public' ? 'bg-amber-500 shadow-sm text-black' : 'text-slate-400'}`}
        >
          Público
        </button>
        <button 
          onClick={() => setActiveTab('mine')}
          className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'mine' ? 'bg-amber-500 shadow-sm text-black' : 'text-slate-400'}`}
        >
          Meus Pedidos
        </button>
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('moderate')}
            className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'moderate' ? 'bg-red-600 shadow-sm text-white' : 'text-slate-400'}`}
          >
            Moderar
          </button>
        )}
      </div>

      {activeTab === 'mine' && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-black p-6 rounded-[2.5rem] border border-slate-100 dark:border-amber-500/10 shadow-sm space-y-4">
          <h3 className="font-black text-slate-800 dark:text-amber-500 text-xs uppercase tracking-widest">Enviar Clamor</h3>
          <textarea 
            value={newRequest}
            onChange={(e) => setNewRequest(e.target.value)}
            placeholder="Pelo que você gostaria de oração hoje?"
            className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl p-4 text-sm focus:ring-1 focus:ring-amber-500 outline-none h-32 resize-none dark:text-white"
          />
          <button 
            type="submit"
            className="w-full bg-black dark:bg-amber-500 text-amber-500 dark:text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-lg flex items-center justify-center space-x-2 border border-amber-500/20"
          >
            <span>Enviar Pedido</span>
            <Send size={16} />
          </button>
        </form>
      )}

      <div className="space-y-4">
        {requests
          .filter(r => {
            if (activeTab === 'public') return r.status === 'approved';
            if (activeTab === 'mine') return r.memberId === user?.id;
            if (activeTab === 'moderate') return r.status === 'pending';
            return true;
          })
          .map((req) => (
            <div key={req.id} className="bg-white dark:bg-black p-5 rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm space-y-3 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-amber-500 pointer-events-none">
                <HandHeart size={60} />
              </div>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 dark:bg-white/5 flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <span className="text-[10px] font-black">{req.requesterName.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter">{req.requesterName}</h4>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{req.date}</span>
                  </div>
                </div>
                {req.status === 'pending' && (
                  <span className="flex items-center space-x-1 text-[8px] font-black uppercase text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                    <Clock size={10} />
                    <span>Em Análise</span>
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-2 border-amber-500/20 pl-4 py-1">
                "{req.request}"
              </p>
              
              {activeTab === 'moderate' && isAdmin && (
                <div className="flex space-x-2 pt-4 border-t border-slate-50 dark:border-white/5">
                  <button 
                    onClick={() => moderateRequest(req.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest"
                  >
                    Aprovar
                  </button>
                  <button 
                    onClick={() => moderateRequest(req.id, 'rejected')}
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest"
                  >
                    Recusar
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PrayerRequests;
