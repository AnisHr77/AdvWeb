import React from 'react';
import AdminLayout from './AdminLayout';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-800">System Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Configure conference parameters and administrative preferences.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* General Settings */}
        <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-6">General Configuration</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Conference Name</label>
                <input defaultValue="ISC 2026" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Abbreviation</label>
                <input defaultValue="ISC-26" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contact Email</label>
              <input defaultValue="admin@isc2026.org" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all" />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-6">Security & Access</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                <p className="text-xs text-slate-400">Add an extra layer of security to your account.</p>
              </div>
              <button className="w-10 h-6 bg-slate-200 rounded-full relative">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-50">
              <div>
                <p className="text-sm font-bold text-slate-800">Maintenance Mode</p>
                <p className="text-xs text-slate-400">Disable registration and submission forms temporarily.</p>
              </div>
              <button className="w-10 h-6 bg-slate-800 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-md hover:bg-slate-50 transition-all">
            Cancel Changes
          </button>
          <button className="px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-md hover:bg-slate-900 transition-all shadow-lg shadow-slate-200">
            Save Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
