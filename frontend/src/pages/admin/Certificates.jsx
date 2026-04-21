import React, { useState } from 'react';
import AdminLayout from './AdminLayout';

const mockCertificates = [
  { id: 1, delegate: 'John Smith', type: 'Attendance', issuedDate: 'Oct 16, 2026', ref: 'ISC-ATT-2026-001' },
  { id: 2, delegate: 'Sarah Jenkins', type: 'Speaker', issuedDate: 'Oct 14, 2026', ref: 'ISC-SPK-2026-042' },
  { id: 3, delegate: 'Amara Nwosu', type: 'Presenter', issuedDate: 'Oct 15, 2026', ref: 'ISC-PRE-2026-105' },
];

const Certificates = () => {
  const [items] = useState(mockCertificates);

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Certificates Management</h1>
          <p className="text-sm text-slate-400 mt-1">Generate and distribute digital certificates to speakers and attendees.</p>
        </div>
        <button className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-md hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Batch Generate
        </button>
      </div>

      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-slate-50/50">
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delegate / Recipient</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reference ID</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issue Date</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-slate-800">{item.delegate}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded uppercase tracking-tight">{item.type}</span>
                </td>
                <td className="px-6 py-4 text-slate-400 font-mono text-xs">{item.ref}</td>
                <td className="px-6 py-4 text-slate-500">{item.issuedDate}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button className="p-1.5 text-gray-300 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-all ml-auto block">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Certificates;
