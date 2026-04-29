import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';
import { adminRegistrationsAPI } from '../../services/api';

const statusColor = {
  'Confirmed': 'bg-slate-100 text-slate-700 border-slate-200',
  'Pending':   'bg-zinc-50 text-zinc-500 border-zinc-100',
  'Cancelled': 'bg-red-50 text-red-400 border-red-100',
};

const initials = (name) => name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

const Registrations = () => {
  const [items,             setItems]             = useState([]);
  const [loading,           setLoading]           = useState(true);
  const [selectedUser,      setSelectedUser]      = useState(null);
  const [isDetailsOpen,     setIsDetailsOpen]     = useState(false);
  const [isExportOpen,      setIsExportOpen]      = useState(false);
  const [actionLoading,     setActionLoading]     = useState(false);

  const load = () => {
    setLoading(true);
    adminRegistrationsAPI.getAll()
      .then(data => setItems(Array.isArray(data.items) ? data.items : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id, status) => {
    setActionLoading(true);
    try {
      const updated = await adminRegistrationsAPI.update(id, { status });
      setItems(prev => prev.map(r => r._id === id ? { ...r, status: updated.status } : r));
      if (selectedUser?._id === id) setSelectedUser(prev => ({ ...prev, status: updated.status }));
    } catch (err) { alert(err.message); }
    finally { setActionLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this registration?')) return;
    try {
      await adminRegistrationsAPI.remove(id);
      setItems(prev => prev.filter(r => r._id !== id));
      setIsDetailsOpen(false);
    } catch (err) { alert(err.message); }
  };

  const handleResend = async (id) => {
    setActionLoading(true);
    try {
      const res = await adminRegistrationsAPI.resend(id);
      alert(res.message);
    } catch (err) { alert(err.message); }
    finally { setActionLoading(false); }
  };

  const handleExport = async (format) => {
    try {
      const res = await adminRegistrationsAPI.export(format);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `registrations.${format}`; a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert(err.message); }
    setIsExportOpen(false);
  };

  return (
    <AdminLayout>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Delegate Registrations</h1>
          <p className="text-base text-slate-400 mt-2 font-medium">Manage conference attendees and registration status.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsExportOpen(true)}
            className="px-6 py-3.5 bg-white border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-widest rounded-md hover:bg-slate-50 transition-all">
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><svg className="animate-spin text-[#17A2B8]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
      ) : (
        <div className="bg-white rounded-md border border-gray-100 overflow-hidden">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                {['Delegate', 'Type', 'Country', 'Status', 'Actions'].map(h => (
                  <th key={h} className={`px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-widest ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {items.map(item => (
                <tr key={item._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E9F7F8] flex items-center justify-center font-semibold text-sm text-[#17A2B8]">
                        {initials(item.fullName)}
                      </div>
                      <div>
                        <div className="font-semibold text-[#0B1F3A]">{item.fullName}</div>
                        <div className="text-xs text-slate-400 font-medium">{item.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-tight">{item.type}</td>
                  <td className="px-6 py-5 text-gray-400 font-medium">{item.country}</td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border ${statusColor[item.status] || ''}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button onClick={() => { setSelectedUser(item); setIsDetailsOpen(true); }}
                      className="p-2 text-gray-300 hover:text-[#17A2B8] hover:bg-cyan-50 rounded-md transition-all ml-auto block">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Delegate Details">
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#E9F7F8] flex items-center justify-center font-semibold text-lg text-[#17A2B8]">
                {initials(selectedUser.fullName)}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-lg leading-tight">{selectedUser.fullName}</h4>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-widest mt-0.5">{selectedUser.type}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-medium">
              <div><p className="text-slate-400 uppercase text-[9px] font-semibold">Email</p><p className="text-slate-800">{selectedUser.email}</p></div>
              <div><p className="text-slate-400 uppercase text-[9px] font-semibold">Country</p><p className="text-slate-800">{selectedUser.country}</p></div>
              <div><p className="text-slate-400 uppercase text-[9px] font-semibold">Institution</p><p className="text-slate-800">{selectedUser.institution}</p></div>
              <div><p className="text-slate-400 uppercase text-[9px] font-semibold">Status</p>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${statusColor[selectedUser.status] || ''}`}>{selectedUser.status}</span>
              </div>
            </div>
            <hr className="border-gray-100" />
            <div className="flex gap-3 flex-wrap">
              {selectedUser.status !== 'Confirmed' && (
                <button disabled={actionLoading} onClick={() => handleStatusChange(selectedUser._id, 'Confirmed')}
                  className="flex-1 py-2.5 bg-emerald-500 text-white text-[10px] font-semibold rounded-md uppercase tracking-widest disabled:opacity-70">Confirm</button>
              )}
              <button disabled={actionLoading} onClick={() => handleResend(selectedUser._id)}
                className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold rounded-md uppercase tracking-widest disabled:opacity-70">Resend Email</button>
              <button disabled={actionLoading} onClick={() => handleDelete(selectedUser._id)}
                className="py-2.5 px-4 bg-red-50 text-red-400 text-[10px] font-semibold rounded-md uppercase tracking-widest border border-red-100 disabled:opacity-70">Delete</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Export Modal */}
      <Modal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} title="Export Registrations">
        <div className="space-y-6">
          <p className="text-xs text-slate-500 leading-relaxed">Select the format for your registration data export.</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleExport('csv')} className="p-4 border-2 border-slate-100 rounded-lg text-center hover:border-slate-800 transition-all">
              <p className="font-semibold text-slate-800 text-sm">CSV Format</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Best for Excel/Sheets</p>
            </button>
            <button onClick={() => handleExport('pdf')} className="p-4 border-2 border-slate-100 rounded-lg text-center hover:border-slate-800 transition-all">
              <p className="font-semibold text-slate-800 text-sm">PDF Report</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Ready to print</p>
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Registrations;
