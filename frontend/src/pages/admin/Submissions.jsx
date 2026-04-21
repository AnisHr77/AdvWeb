import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const submissionsData = [
  { id: 'ISC-8492', title: 'Deep Learning for Grid Optimization', author: 'Dr. Jane Doe', track: 'Renewable Energy', date: 'Oct 12, 2025', status: 'Under Review' },
  { id: 'ISC-8491', title: 'Quantum Algorithms for Cryptography', author: 'Prof. Chen Wei', track: 'Quantum Computing', date: 'Oct 11, 2025', status: 'Accepted' },
  { id: 'ISC-8490', title: 'Federated Learning in Healthcare', author: 'Dr. Amara Nwosu', track: 'Biotechnology', date: 'Oct 10, 2025', status: 'Under Review' },
  { id: 'ISC-8489', title: 'Smart Grid Infrastructure Analysis', author: 'Dr. Lucas Müller', track: 'Renewable Energy', date: 'Oct 09, 2025', status: 'Rejected' },
  { id: 'ISC-8488', title: 'Bias in Neural Language Models', author: 'Prof. Sofia Reyes', track: 'Artificial Intelligence', date: 'Oct 08, 2025', status: 'Accepted' },
];

const statusColor = {
  'Under Review': 'bg-[#E9F7F8] text-[#17A2B8]',
  'Accepted': 'bg-emerald-50 text-emerald-600',
  'Rejected': 'bg-red-50 text-red-500',
};

const Submissions = () => {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? submissionsData : submissionsData.filter(s => s.status === filter);

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#023047]">Submissions</h1>
          <p className="text-sm text-gray-400 mt-1">Review, accept, or reject submitted research papers.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="font-semibold text-[#023047]">{submissionsData.length}</span> total papers
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['All', 'Under Review', 'Accepted', 'Rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${filter === f ? 'bg-[#17A2B8] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#17A2B8]/40'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-[#FBFDFE]">
              {['Ref ID', 'Title', 'Author', 'Track', 'Submitted', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-[#FBFDFE] transition-colors group">
                <td className="px-6 py-4 text-xs font-semibold text-[#17A2B8]">{s.id}</td>
                <td className="px-6 py-4 font-semibold text-[#023047] max-w-[220px] truncate">{s.title}</td>
                <td className="px-6 py-4 text-gray-500 text-xs">{s.author}</td>
                <td className="px-6 py-4 text-xs font-semibold text-gray-400">{s.track}</td>
                <td className="px-6 py-4 text-xs text-gray-400">{s.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColor[s.status]}`}>{s.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-[10px] font-semibold text-emerald-500 hover:underline">Accept</button>
                    <button className="text-[10px] font-semibold text-red-400 hover:underline">Reject</button>
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

export default Submissions;
