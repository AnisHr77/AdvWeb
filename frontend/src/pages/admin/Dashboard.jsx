import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

/* ─── Mock Data ─── */
const stats = [
  {
    label: 'Total Speakers', value: '154', change: '+12 this month', trend: 'up',
    color: 'bg-[#0E5161] text-white',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    label: 'Total Submissions', value: '823', change: '+58 this week', trend: 'up',
    color: 'bg-[#6366F1]/10 text-[#6366F1]',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>,
  },
  {
    label: 'Total Registrations', value: '1,204', change: '+204 this month', trend: 'up',
    color: 'bg-[#22C55E] text-white',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  },
  {
    label: 'Active Sessions', value: '42', change: '— No change', trend: 'neutral',
    color: 'bg-[#FBBF24] text-white',
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  },
];

const agendaItems = [
  { time: '09:00 - 10:00', title: 'Opening Keynote: Future of Science', track: 'General' },
  { time: '10:30 - 12:00', title: 'AI Ethics Panel', track: 'Artificial Intelligence' },
  { time: '13:00 - 14:30', title: 'Next-Gen Renewable Energy', track: 'Renewable Energy' },
  { time: '15:00 - 16:00', title: 'Cybersecurity in Academic Research', track: 'Cybersecurity' },
];

const tracks = ['General', 'Artificial Intelligence', 'Renewable Energy', 'Data Science', 'Cybersecurity', 'Biotechnology', 'Quantum Computing'];

const recentSubmissions = [
  { id: 'ISC-8492', title: 'Deep Learning for Grid Optimization', author: 'Dr. Jane Doe', track: 'Renewable Energy', status: 'Under Review' },
  { id: 'ISC-8491', title: 'Quantum Algorithms for Cryptography', author: 'Prof. Chen Wei', track: 'Quantum Computing', status: 'Accepted' },
  { id: 'ISC-8490', title: 'Federated Learning in Healthcare', author: 'Dr. Amara Nwosu', track: 'Biotechnology', status: 'Under Review' },
  { id: 'ISC-8489', title: 'Smart Grid Infrastructure Analysis', author: 'Dr. Lucas Müller', track: 'Renewable Energy', status: 'Rejected' },
];

const statusColor = {
  'Under Review': 'bg-slate-50 text-slate-600 border border-slate-100',
  'Accepted': 'bg-zinc-100 text-zinc-700 border border-zinc-200',
  'Rejected': 'bg-gray-100 text-gray-500 border border-gray-200',
};

/* ─── Dashboard ─── */
const Dashboard = () => {
  const [sessionForm, setSessionForm] = useState({ title: '', track: '', date: '', time: '09:00 AM', speaker: '' });
  const [sessions, setSessions] = useState(agendaItems);

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!sessionForm.title || !sessionForm.track) return;
    setSessions([...sessions, {
      time: sessionForm.time,
      title: sessionForm.title,
      track: sessionForm.track,
    }]);
    setSessionForm({ title: '', track: '', date: '', time: '09:00 AM', speaker: '' });
  };

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">Dashboard Overview</h1>
        <p className="text-sm text-slate-400 mt-1 font-medium">Welcome back, here is what's happening with the conference today.</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white rounded-md border border-gray-100 shadow-sm p-6 flex items-start justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-3">{s.label}</p>
              <p className="text-3xl font-bold text-[#0B1F3A]">{s.value}</p>
              {s.change.includes('No change') ? (
                <p className="text-[10px] font-medium mt-3 text-gray-400">
                  — {s.change.split('— ')[1]}
                </p>
              ) : (
                <p className="text-[10px] font-medium mt-3 text-gray-400 whitespace-nowrap">
                  {s.change}
                </p>
              )}
            </div>
            <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${s.color}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Two Column Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mb-10">
        {/* Agenda Sessions Table */}
        <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Agenda Sessions</h2>
            <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{sessions.length} SESSIONS</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Time</th>
                <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Session Title</th>
                <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Track</th>
                <th className="px-6 py-4 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {sessions.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium text-gray-400 whitespace-nowrap">{s.time}</td>
                  <td className="px-6 py-4 text-xs font-bold text-[#0B1F3A]">{s.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100/50">{s.track}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-300 hover:text-gray-600 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Add Session Form */}
        <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight mb-8">Quick Add Session</h2>
          <form onSubmit={handleAddSession} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-800">Session Title</label>
              <input
                required value={sessionForm.title} onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                placeholder="e.g. AI Ethics Panel"
                className="w-full border border-transparent bg-gray-50 rounded-md px-4 py-3 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-800">Track / Theme</label>
              <select
                required value={sessionForm.track} onChange={(e) => setSessionForm({ ...sessionForm, track: e.target.value })}
                className="w-full border border-transparent bg-gray-50 rounded-md px-4 py-3 text-xs text-gray-500 focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all appearance-none font-medium"
              >
                <option value="">Select Track...</option>
                {tracks.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-800">Date</label>
                <div className="relative">
                  <input
                    type="text" placeholder="YYYY-MM-DD" value={sessionForm.date} onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                    className="w-full border border-transparent bg-gray-50 rounded-md pl-4 pr-10 py-3 text-xs text-gray-500 focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-800">Time</label>
                <div className="relative">
                  <input
                    type="text" placeholder="09:00 AM" value={sessionForm.time} onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
                    className="w-full border border-transparent bg-gray-50 rounded-md pl-4 pr-10 py-3 text-xs text-gray-500 focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all font-medium"
                  />
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-800">Speaker (Optional)</label>
              <div className="relative">
                <input
                  placeholder="Search speakers..." value={sessionForm.speaker} onChange={(e) => setSessionForm({ ...sessionForm, speaker: e.target.value })}
                  className="w-full border border-transparent bg-gray-50 rounded-md px-4 py-3 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all font-medium appearance-none"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            <button type="submit" className="w-full py-3.5 bg-[#0B1F3A] text-white text-[10px] font-bold rounded-md hover:bg-[#051933] transition-all active:scale-[0.98] shadow-lg shadow-gray-200/50 uppercase tracking-widest">
              Add Session to Agenda
            </button>
          </form>
        </div>
      </div>

      {/* ── Recent Submissions ── */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#023047]">Recent Submissions</h2>
          <a href="/admin/submissions" className="text-xs font-semibold text-[#17A2B8] hover:underline">View all →</a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-[#FBFDFE]">
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Ref ID</th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Title</th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Author</th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Track</th>
              <th className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recentSubmissions.map((s) => (
              <tr key={s.id} className="hover:bg-[#FBFDFE] transition-colors">
                <td className="px-6 py-4 text-xs font-semibold text-[#17A2B8]">{s.id}</td>
                <td className="px-6 py-4 font-semibold text-[#023047] max-w-xs truncate">{s.title}</td>
                <td className="px-6 py-4 text-gray-500">{s.author}</td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-400">{s.track}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColor[s.status]}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
