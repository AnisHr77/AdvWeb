import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Modal from '../../components/ui/Modal';

const mockRegistrations = [
  { id: 1, name: 'John Smith', email: 'john.smith@gmail.com', type: 'Full Delegate', country: 'United Kingdom', status: 'Confirmed', initials: 'JS', color: 'bg-blue-100 text-blue-600' },
  { id: 2, name: 'Elena Rodriguez', email: 'elena.r@university.es', type: 'Student', country: 'Spain', status: 'Pending', initials: 'ER', color: 'bg-amber-100 text-amber-600' },
  { id: 3, name: 'Chen Wei', email: 'wei.chen@tech.cn', type: 'Full Delegate', country: 'China', status: 'Confirmed', initials: 'CW', color: 'bg-emerald-100 text-emerald-600' },
  { id: 4, name: 'Amara Nwosu', email: 'amara.n@institute.ng', type: 'Presenter', country: 'Nigeria', status: 'Confirmed', initials: 'AN', color: 'bg-indigo-100 text-indigo-600' },
];

const statusColor = {
  'Confirmed': 'bg-slate-100 text-slate-700 border-slate-200',
  'Pending': 'bg-zinc-50 text-zinc-500 border-zinc-100',
};

const Registrations = () => {
  const [items] = useState(mockRegistrations);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Delegate Registrations</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Manage conference attendees and registration status.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-md hover:bg-slate-50 transition-all shadow-sm"
          >
            Export CSV
          </button>
          <button className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-md hover:bg-slate-900 transition-all shadow-lg shadow-slate-200">
            Manual Registration
          </button>
        </div>
      </div>

      <div className="bg-white rounded-md border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-slate-50/50">
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delegate</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Country</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{item.name}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{item.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{item.type}</span>
                </td>
                <td className="px-6 py-4 text-slate-500 font-medium">{item.country}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColor[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button 
                    onClick={() => { setSelectedUser(item); setIsDetailsModalOpen(true); }}
                    className="p-1.5 text-gray-300 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-all ml-auto block"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modals ── */}
      
      {/* Export Modal */}
      <Modal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        title="Export Registrations"
      >
        <div className="space-y-6">
          <p className="text-xs text-slate-500 leading-relaxed">Select the format and range for your registration data export.</p>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-slate-100 rounded-lg text-center hover:border-slate-800 transition-all group">
                <p className="font-bold text-slate-800 text-sm">CSV Format</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Best for Excel/Sheets</p>
              </button>
              <button className="p-4 border-2 border-slate-100 rounded-lg text-center hover:border-slate-800 transition-all group">
                <p className="font-bold text-slate-800 text-sm">PDF Report</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Ready to print</p>
              </button>
            </div>
            <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-900 transition-all text-xs uppercase tracking-widest shadow-lg shadow-slate-100">
              Download Export
            </button>
          </div>
        </div>
      </Modal>

      {/* Details Modal */}
      <Modal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        title="Delegate Details"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${selectedUser.color}`}>
                {selectedUser.initials}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg leading-tight">{selectedUser.name}</h4>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mt-0.5">{selectedUser.type}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-medium">
              <div className="space-y-1">
                <p className="text-slate-400 uppercase text-[9px] font-bold">Email Address</p>
                <p className="text-slate-800">{selectedUser.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 uppercase text-[9px] font-bold">Country</p>
                <p className="text-slate-800">{selectedUser.country}</p>
              </div>
            </div>
            <hr className="border-gray-100" />
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-slate-800 text-white text-[10px] font-bold rounded-md uppercase tracking-widest">Edit Profile</button>
              <button className="flex-1 py-2.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-md uppercase tracking-widest">Resend Confirmation</button>
            </div>
          </div>
        )}
      </Modal>

    </AdminLayout>
  );
};

export default Registrations;
