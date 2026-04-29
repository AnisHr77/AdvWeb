import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';
import { adminSubmissionsAPI } from '../../services/api';

const statusColor = {
  'Under Review': 'bg-[#E9F7F8] text-[#17A2B8]',
  'Accepted':     'bg-emerald-50 text-emerald-600',
  'Rejected':     'bg-red-50 text-red-500',
};

const Submissions = () => {
  const [items,   setItems]   = useState([]);
  const [filter,  setFilter]  = useState('All');
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  const load = (status) => {
    setLoading(true);
    adminSubmissionsAPI.getAll(status && status !== 'All' ? { status } : {})
      .then(data => setItems(Array.isArray(data.items) ? data.items : []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(filter); }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      const updated = await adminSubmissionsAPI.updateStatus(id, status);
      setItems(prev => prev.map(s => s._id === id ? { ...s, status: updated.status } : s));
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission?')) return;
    try {
      await adminSubmissionsAPI.remove(id);
      setItems(prev => prev.filter(s => s._id !== id));
    } catch (err) { alert(err.message); }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#023047]">Submissions</h1>
          <p className="text-sm text-gray-400 mt-1">Review, accept, or reject submitted research papers.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="font-semibold text-[#023047]">{items.length}</span> total papers
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

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><svg className="animate-spin text-[#17A2B8]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-[#FBFDFE]">
                {['Ref ID', 'Title', 'Author', 'Track', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(s => (
                <tr key={s._id} className="hover:bg-[#FBFDFE] transition-colors group">
                  <td className="px-6 py-4 text-xs font-semibold text-[#17A2B8]">{s.refId}</td>
                  <td className="px-6 py-4 font-semibold text-[#023047] max-w-[220px] truncate">{s.title}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{s.primaryAuthor?.name}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-gray-400">{s.track}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${statusColor[s.status] || ''}`}>{s.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {s.status !== 'Accepted'  && <button onClick={() => handleStatus(s._id, 'Accepted')}  className="text-[10px] font-semibold text-emerald-500 hover:underline">Accept</button>}
                      {s.status !== 'Rejected'  && <button onClick={() => handleStatus(s._id, 'Rejected')}  className="text-[10px] font-semibold text-red-400 hover:underline">Reject</button>}
                      <button onClick={() => handleDelete(s._id)} className="text-[10px] font-semibold text-gray-300 hover:text-red-400">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default Submissions;
