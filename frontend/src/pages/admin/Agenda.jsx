import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';
import { adminSessionsAPI } from '../../services/api';

const Agenda = () => {
  const [items,           setItems]           = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [isAddModalOpen,  setIsAddModalOpen]  = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen,    setIsDeleteOpen]    = useState(false);
  const [selectedItem,    setSelectedItem]    = useState(null);
  const [saving,          setSaving]          = useState(false);
  const [addForm, setAddForm] = useState({ title: '', time: '', location: '', track: 'General', day: 1 });
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    adminSessionsAPI.getAll()
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    setSaving(true);
    try {
      const created = await adminSessionsAPI.create({ ...addForm, startTime: addForm.time });
      setItems(prev => [...prev, created]);
      setIsAddModalOpen(false);
      setAddForm({ title: '', time: '', location: '', track: 'General', day: 1 });
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleEdit = async () => {
    setSaving(true);
    try {
      const updated = await adminSessionsAPI.update(selectedItem._id, editForm);
      setItems(prev => prev.map(i => i._id === selectedItem._id ? updated : i));
      setIsEditModalOpen(false);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await adminSessionsAPI.remove(selectedItem._id);
      setItems(prev => prev.filter(i => i._id !== selectedItem._id));
      setIsDeleteOpen(false);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  return (
    <AdminLayout>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Conference Agenda</h1>
          <p className="text-base text-slate-400 mt-2 font-medium">Manage and schedule conference sessions and tracks.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3.5 bg-[#17A2B8] text-white text-xs font-semibold uppercase tracking-widest rounded-md hover:bg-[#138496] transition-all">
          Add New Session
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><svg className="animate-spin text-[#17A2B8]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
      ) : (
        <div className="bg-white rounded-md border border-gray-100 overflow-hidden">
          <table className="w-full text-base">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">
                {['Time', 'Session Title', 'Track', 'Location', 'Actions'].map(h => (
                  <th key={h} className={`px-6 py-5 text-xs font-semibold text-gray-400 uppercase tracking-widest ${h === 'Actions' ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50/50">
              {items.map(item => (
                <tr key={item._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap font-medium text-gray-400">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#17A2B8]" />{item.startTime || item.time}</div>
                  </td>
                  <td className="px-6 py-5 font-semibold text-[#0B1F3A]">{item.title}</td>
                  <td className="px-6 py-5"><span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded border border-gray-100/50">{item.track}</span></td>
                  <td className="px-6 py-5 text-gray-400 font-medium">{item.location}</td>
                  <td className="px-6 py-5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => { setSelectedItem(item); setEditForm({ title: item.title, track: item.track, startTime: item.startTime, location: item.location }); setIsEditModalOpen(true); }}
                        className="p-2 text-gray-300 hover:text-[#17A2B8] hover:bg-cyan-50 rounded-md transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button onClick={() => { setSelectedItem(item); setIsDeleteOpen(true); }}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Session">
        <div className="space-y-4">
          {[['Session Title', 'title', 'text', 'e.g. Quantum Computing Basics'], ['Time', 'time', 'time', ''], ['Location', 'location', 'text', 'Hall B']].map(([label, key, type, ph]) => (
            <div key={key} className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
              <input type={type} placeholder={ph} value={addForm[key] || ''} onChange={e => setAddForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all font-medium" />
            </div>
          ))}
          <button disabled={saving} onClick={handleAdd}
            className="w-full py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-900 transition-all text-xs uppercase tracking-widest disabled:opacity-70">
            {saving ? 'Creating…' : 'Create Session'}
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Session">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session Title</label>
            <input value={editForm.title || ''} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 font-medium" />
          </div>
          <button disabled={saving} onClick={handleEdit}
            className="w-full py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-900 transition-all text-xs uppercase tracking-widest disabled:opacity-70">
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Session">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Are you absolutely sure?</p>
            <p className="text-xs text-slate-400 mt-1">This will permanently delete <span className="font-bold text-slate-600">{selectedItem?.title}</span>.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-md hover:bg-slate-200 transition-all uppercase tracking-widest">Cancel</button>
            <button disabled={saving} onClick={handleDelete} className="flex-1 py-2.5 bg-red-500 text-white text-xs font-bold rounded-md hover:bg-red-600 transition-all uppercase tracking-widest shadow-lg shadow-red-100 disabled:opacity-70">
              {saving ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default Agenda;
