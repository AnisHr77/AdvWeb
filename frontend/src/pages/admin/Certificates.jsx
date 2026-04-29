import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';
import { adminCertificatesAPI, adminRegistrationsAPI } from '../../services/api';

const Certificates = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchType, setBatchType] = useState('Attendance');
  const [generating, setGenerating] = useState(false);

  const load = () => {
    setLoading(true);
    adminCertificatesAPI.getAll()
      .then(data => setItems(Array.isArray(data.items) ? data.items : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleBatchGenerate = async () => {
    setGenerating(true);
    try {
      // Get confirmed registrations to generate certificates for
      const regs = await adminRegistrationsAPI.getAll({ status: 'Confirmed' });
      const recipients = regs.items.map(r => ({ name: r.fullName, email: r.email }));
      
      if (recipients.length === 0) throw new Error('No confirmed delegates found to generate certificates for.');

      await adminCertificatesAPI.batchGenerate(batchType, recipients);
      alert(`Successfully generated ${recipients.length} certificates!`);
      load();
      setIsBatchModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await adminCertificatesAPI.remove(id);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { alert(err.message); }
  };

  const handleDownload = async (id, ref) => {
    try {
      const res = await adminCertificatesAPI.download(id);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `Cert-${ref}.pdf`; a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert('Download failed: ' + err.message); }
  };

  return (
    <AdminLayout>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Certificates Management</h1>
          <p className="text-base text-slate-400 mt-2 font-medium">Generate and distribute digital certificates to speakers and attendees.</p>
        </div>
        <button onClick={() => setIsBatchModalOpen(true)} className="px-6 py-3.5 bg-[#17A2B8] text-white text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-cyan-100 flex items-center gap-2">
          Batch Generate
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><svg className="animate-spin text-[#17A2B8]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
      ) : (
        <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Delegate / Recipient</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Reference ID</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Issue Date</th>
                <th className="px-6 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5 font-bold text-[#0B1F3A]">{item.delegateName || item.recipientName}</td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100/50 px-3 py-1.5 rounded uppercase tracking-widest">{item.type}</span>
                  </td>
                  <td className="px-6 py-5 text-gray-400 font-mono text-xs font-medium">{item.refId || item.id}</td>
                  <td className="px-6 py-5 text-gray-400 font-medium">{new Date(item.issuedAt || item.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleDownload(item._id, item.refId)} className="p-2 text-gray-300 hover:text-[#17A2B8] hover:bg-cyan-50 rounded-md transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-md transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Batch Modal */}
      <Modal isOpen={isBatchModalOpen} onClose={() => setIsBatchModalOpen(false)} title="Batch Generate Certificates">
        <div className="space-y-6">
          <p className="text-sm text-slate-500">This will generate certificates for all <span className="font-bold text-[#17A2B8]">Confirmed</span> delegates in the system.</p>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Certificate Type</label>
            <select value={batchType} onChange={e => setBatchType(e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm">
              <option value="Attendance">Attendance Certificate</option>
              <option value="Participation">Participation Certificate</option>
              <option value="Speaker">Speaker Certificate</option>
            </select>
          </div>
          <button disabled={generating} onClick={handleBatchGenerate} className="w-full py-4 bg-[#17A2B8] text-white font-bold rounded-md uppercase tracking-widest text-xs disabled:opacity-70">
            {generating ? 'Generating...' : 'Start Generation'}
          </button>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Certificates;
