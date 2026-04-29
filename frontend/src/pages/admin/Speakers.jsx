import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';
import { adminSpeakersAPI } from '../../services/api';

const statusColor = {
  'Confirmed': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
  'Invited': 'bg-slate-50 text-slate-500 border-slate-100',
};

const Speakers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', title: '', institution: '', bio: '', tag: '', country: '', image: '', featured: false, status: 'Confirmed'
  });

  const load = () => {
    setLoading(true);
    adminSpeakersAPI.getAll()
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = filter === 'All' ? items : items.filter(s => s.status === filter);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const created = await adminSpeakersAPI.create(formData);
      setItems(prev => [...prev, created]);
      setIsAddModalOpen(false);
      setFormData({ name: '', title: '', institution: '', bio: '', tag: '', country: '', image: '', featured: false, status: 'Confirmed' });
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const updated = await adminSpeakersAPI.update(selectedItem._id, formData);
      setItems(prev => prev.map(i => i._id === selectedItem._id ? updated : i));
      setIsEditModalOpen(false);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this speaker?')) return;
    try {
      await adminSpeakersAPI.remove(id);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch (err) { alert(err.message); }
  };

  const openEdit = (s) => {
    setSelectedItem(s);
    setFormData({ ...s });
    setIsEditModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Conference Speakers</h1>
          <p className="text-base text-slate-400 mt-2 font-medium">Manage all conference speakers and their session details.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="px-6 py-3.5 bg-[#17A2B8] text-white text-sm font-bold uppercase tracking-widest rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-cyan-100 flex items-center gap-2">
          Add Speaker
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['All', 'Confirmed', 'Pending', 'Invited'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md transition-all ${filter === f ? 'bg-slate-800 text-white' : 'bg-white border border-gray-100 text-slate-400 hover:bg-gray-50'}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><svg className="animate-spin text-[#17A2B8]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
      ) : (
        <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Speaker</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Institution</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Track</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {filtered.map(s => (
                <tr key={s._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {s.image ? <img src={s.image} className="w-8 h-8 rounded-full object-cover border" alt={s.name} /> : 
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">{s.name[0]}</div>
                      }
                      <div className="font-bold text-[#0B1F3A]">{s.name} {s.featured && '⭐'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs font-medium">{s.institution}</td>
                  <td className="px-6 py-4"><span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100/50">{s.tag || s.track}</span></td>
                  <td className="px-6 py-4"><span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusColor[s.status] || ''}`}>{s.status}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(s)} className="p-1.5 text-gray-300 hover:text-slate-600 transition-all"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                      <button onClick={() => handleDelete(s._id)} className="p-1.5 text-gray-300 hover:text-red-400 transition-all"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Speaker Modal (Add/Edit) */}
      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isAddModalOpen ? "Add Speaker" : "Edit Speaker"}>
        <div className="space-y-4">
          <input placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm" />
          <input placeholder="Institution" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm" />
          <input placeholder="Country" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm" />
          <input placeholder="Track/Tag" value={formData.tag} onChange={e => setFormData({...formData, tag: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm" />
          <input placeholder="Image URL" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm" />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} id="feat" />
            <label htmlFor="feat" className="text-sm">Featured Speaker</label>
          </div>
          <button disabled={saving} onClick={isAddModalOpen ? handleCreate : handleUpdate} className="w-full py-3 bg-[#17A2B8] text-white font-bold rounded-md uppercase tracking-widest text-xs">
            {saving ? 'Saving...' : 'Save Speaker'}
          </button>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Speakers;
