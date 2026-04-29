import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminStatsAPI, adminSessionsAPI, adminSubmissionsAPI } from '../../services/api';

const statusColor = {
  'Under Review': 'bg-slate-50 text-slate-600 border border-slate-100',
  'Accepted':     'bg-zinc-100 text-zinc-700 border border-zinc-200',
  'Rejected':     'bg-gray-100 text-gray-500 border border-gray-200',
};

const tracks = ['General', 'Artificial Intelligence', 'Renewable Energy', 'Data Science', 'Cybersecurity', 'Biotechnology', 'Quantum Computing'];

const Dashboard = () => {
  const [stats,        setStats]        = useState(null);
  const [sessions,     setSessions]     = useState([]);
  const [submissions,  setSubmissions]  = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [sessionForm,  setSessionForm]  = useState({ title: '', track: '', date: '', time: '09:00 AM', speaker: '' });
  const [adding,       setAdding]       = useState(false);

  useEffect(() => {
    adminStatsAPI.get()
      .then(data => { setStats(data.stats); setSubmissions(data.recentSubmissions || []); })
      .catch(console.error)
      .finally(() => setLoadingStats(false));

    adminSessionsAPI.getAll()
      .then(data => setSessions(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleAddSession = async (e) => {
    e.preventDefault();
    if (!sessionForm.title || !sessionForm.track) return;
    setAdding(true);
    try {
      const created = await adminSessionsAPI.create({
        title: sessionForm.title,
        track: sessionForm.track,
        day: 1,
        startTime: sessionForm.time,
        date: sessionForm.date,
      });
      setSessions(prev => [...prev, created]);
      setSessionForm({ title: '', track: '', date: '', time: '09:00 AM', speaker: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const statCards = stats ? [
    { label: 'Total Speakers',      value: stats.totalSpeakers,      change: '—',  color: 'bg-cyan-500 text-white' },
    { label: 'Total Submissions',   value: stats.totalSubmissions,   change: '—',  color: 'bg-indigo-500 text-white' },
    { label: 'Total Registrations', value: stats.totalRegistrations, change: '—',  color: 'bg-emerald-500 text-white' },
    { label: 'Active Sessions',     value: stats.activeSessions,     change: '—',  color: 'bg-amber-500 text-white' },
  ] : [];

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-slate-800">Dashboard Overview</h1>
        <p className="text-base text-slate-400 mt-2 font-medium">Welcome back, here is what's happening with the conference today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {loadingStats
          ? Array(4).fill(0).map((_, i) => <div key={i} className="bg-white rounded-md border border-gray-100 p-6 h-32 animate-pulse bg-gray-50" />)
          : statCards.map((s, idx) => (
            <div key={idx} className="bg-white rounded-md border border-gray-100 p-6 flex items-start justify-between">
              <div className="flex flex-col flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">{s.label}</p>
                <p className="text-4xl font-semibold text-[#0B1F3A]">{s.value}</p>
                <p className="text-xs font-medium mt-4 text-gray-400">{s.change}</p>
              </div>
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
              </div>
            </div>
          ))
        }
      </div>

      {/* Sessions + Quick Add */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mb-10">
        <div className="bg-white rounded-md border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-tight">Agenda Sessions</h2>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{sessions.length} SESSIONS</span>
          </div>
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                {['Time', 'Session Title', 'Track', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-5 text-left text-xs font-semibold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {sessions.map((s, idx) => (
                <tr key={s._id || idx} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5 text-sm font-medium text-gray-400 whitespace-nowrap">{s.startTime || s.time}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-[#0B1F3A]">{s.title}</td>
                  <td className="px-6 py-5"><span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded border border-gray-100/50">{s.track}</span></td>
                  <td className="px-6 py-5">
                    <button className="text-gray-300 hover:text-[#17A2B8] transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-md border border-gray-100 p-10">
          <h2 className="text-base font-semibold text-slate-800 tracking-tight mb-10">Quick Add Session</h2>
          <form onSubmit={handleAddSession} className="space-y-8">
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-800">Session Title</label>
              <input required value={sessionForm.title} onChange={e => setSessionForm({ ...sessionForm, title: e.target.value })}
                placeholder="e.g. AI Ethics Panel"
                className="w-full border border-transparent bg-gray-50 rounded-md px-5 py-4 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#17A2B8]/20 transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-800">Track / Theme</label>
              <select required value={sessionForm.track} onChange={e => setSessionForm({ ...sessionForm, track: e.target.value })}
                className="w-full border border-transparent bg-gray-50 rounded-md px-5 py-4 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#17A2B8]/20 transition-all appearance-none font-medium">
                <option value="">Select Track...</option>
                {tracks.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-800">Date</label>
                <input type="text" placeholder="YYYY-MM-DD" value={sessionForm.date} onChange={e => setSessionForm({ ...sessionForm, date: e.target.value })}
                  className="w-full border border-transparent bg-gray-50 rounded-md pl-4 pr-4 py-3 text-xs text-gray-500 focus:outline-none transition-all font-medium" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-800">Time</label>
                <input type="text" placeholder="09:00 AM" value={sessionForm.time} onChange={e => setSessionForm({ ...sessionForm, time: e.target.value })}
                  className="w-full border border-transparent bg-gray-50 rounded-md pl-4 pr-4 py-3 text-xs text-gray-500 focus:outline-none transition-all font-medium" />
              </div>
            </div>
            <button type="submit" disabled={adding}
              className="w-full py-4 bg-[#17A2B8] text-white text-xs font-semibold rounded-md hover:bg-[#138496] transition-all active:scale-[0.98] uppercase tracking-widest disabled:opacity-70">
              {adding ? 'Adding…' : 'Add Session to Agenda'}
            </button>
          </form>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#023047]">Recent Submissions</h2>
          <a href="/admin/submissions" className="text-xs font-semibold text-[#17A2B8] hover:underline">View all →</a>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-[#FBFDFE]">
              {['Ref ID', 'Title', 'Author', 'Track', 'Status'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {submissions.map(s => (
              <tr key={s.id} className="hover:bg-[#FBFDFE] transition-colors">
                <td className="px-6 py-4 text-xs font-semibold text-[#17A2B8]">{s.id}</td>
                <td className="px-6 py-4 font-semibold text-[#023047] max-w-xs truncate">{s.title}</td>
                <td className="px-6 py-4 text-gray-500">{s.author}</td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-400">{s.track}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColor[s.status] || 'bg-gray-50 text-gray-400'}`}>{s.status}</span>
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
