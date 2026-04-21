import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const speakersData = [
  { id: 1, name: 'Dr. Jane Doe', institution: 'Stanford University', track: 'Renewable Energy', country: 'USA', status: 'Confirmed' },
  { id: 2, name: 'Prof. Chen Wei', institution: 'Tsinghua University', track: 'Quantum Computing', country: 'China', status: 'Confirmed' },
  { id: 3, name: 'Dr. Amara Nwosu', institution: 'Univ. of Lagos', track: 'Biotechnology', country: 'Nigeria', status: 'Pending' },
  { id: 4, name: 'Dr. Lucas Müller', institution: 'ETH Zurich', track: 'Data Science', country: 'Switzerland', status: 'Confirmed' },
  { id: 5, name: 'Prof. Sofia Reyes', institution: 'MIT', track: 'Artificial Intelligence', country: 'USA', status: 'Invited' },
];

const statusColor = {
  'Confirmed': 'bg-emerald-50 text-emerald-600',
  'Pending': 'bg-amber-50 text-amber-600',
  'Invited': 'bg-[#E9F7F8] text-[#17A2B8]',
};

const Speakers = () => {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? speakersData : speakersData.filter(s => s.status === filter);

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Conference Speakers</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Manage all conference speakers and their session details.</p>
        </div>
        <button className="px-5 py-2.5 bg-[#1D293D] text-white text-[11px] font-bold uppercase tracking-widest rounded-md hover:bg-[#151F2E] transition-all shadow-lg shadow-gray-200/50 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Speaker
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['All', 'Confirmed', 'Pending', 'Invited'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${filter === f ? 'bg-slate-800 text-white shadow-md' : 'bg-white border border-gray-100 text-slate-400 hover:text-slate-600 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-[#F8FAFC]">
              <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Speaker</th>
              <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Institution</th>
              <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Track</th>
              <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50/50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[10px] border border-slate-200/50">
                      {s.name.split(' ').map(n => n[0]).join('').replace('.', '')}
                    </div>
                    <div className="font-bold text-[#0B1F3A]">{s.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs font-medium">{s.institution}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100/50">{s.track}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                    s.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    s.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-slate-50 text-slate-500 border-slate-100'
                  }`}>{s.status}</span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-300 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-md transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Speakers;
