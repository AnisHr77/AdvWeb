import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';

const mockAgenda = [
  { id: 1, time: '09:00 AM', title: 'Opening Ceremony', track: 'General', speaker: 'Heinrich Muller', location: 'Hall A' },
  { id: 2, time: '10:30 AM', title: 'AI for Good', track: 'Artificial Intelligence', speaker: 'Sarah Jenkins', location: 'Hall A' },
  { id: 3, time: '01:00 PM', title: 'Green Energy Future', track: 'Renewable Energy', speaker: 'Kenji Tanaka', location: 'Room 2' },
  { id: 4, time: '02:30 PM', title: 'Data Privacy Workshop', track: 'Data Science', speaker: 'Amina Diop', location: 'Lab 4' },
];

const Agenda = () => {
  const [items, setItems] = useState(mockAgenda);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = () => {
    setItems(items.filter(i => i.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Conference Agenda</h1>
          <p className="text-sm text-slate-400 mt-1">Manage and schedule conference sessions and tracks.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-md hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
        >
          Add New Session
        </button>
      </div>

      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-slate-50/50">
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Session Title</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Speaker</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Track</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    {item.time}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-800">{item.title}</td>
                <td className="px-6 py-4 text-slate-500">{item.speaker}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">{item.track}</span>
                </td>
                <td className="px-6 py-4 text-slate-400">{item.location}</td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => { setSelectedItem(item); setIsEditModalOpen(true); }}
                      className="p-1.5 text-gray-300 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button 
                      onClick={() => { setSelectedItem(item); setIsDeleteModalOpen(true); }}
                      className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-md transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modals ── */}
      
      {/* Add Modal */}
      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Session"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session Title</label>
            <input placeholder="e.g. Quantum Computing Basics" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all font-medium" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time</label>
              <input type="time" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all font-medium" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</label>
              <input placeholder="Hall B" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all font-medium" />
            </div>
          </div>
          <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-900 transition-all text-xs uppercase tracking-widest shadow-lg shadow-slate-100">
            Create Session
          </button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Session"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Session Title</label>
            <input defaultValue={selectedItem?.title} className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all font-medium" />
          </div>
          <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-900 transition-all text-xs uppercase tracking-widest">
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        title="Delete Session"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Are you absolutely sure?</p>
            <p className="text-xs text-slate-400 mt-1">This will permanently delete <span className="font-bold text-slate-600">{selectedItem?.title}</span>.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-md hover:bg-slate-200 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              onClick={handleDelete}
              className="flex-1 py-2.5 bg-red-500 text-white text-xs font-bold rounded-md hover:bg-red-600 transition-all uppercase tracking-widest shadow-lg shadow-red-100"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

    </AdminLayout>
  );
};

export default Agenda;
