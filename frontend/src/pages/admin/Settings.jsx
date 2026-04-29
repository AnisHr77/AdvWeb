import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { adminSettingsAPI } from '../../services/api';

const Settings = () => {
  const [form, setForm] = useState({
    conferenceName: '', abbreviation: '', contactEmail: '',
    twoFactorEnabled: false, maintenanceMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    adminSettingsAPI.get()
      .then(data => setForm({
        conferenceName:   data.conferenceName   || '',
        abbreviation:     data.abbreviation     || '',
        contactEmail:     data.contactEmail     || '',
        twoFactorEnabled: data.twoFactorEnabled || false,
        maintenanceMode:  data.maintenanceMode  || false,
      }))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await adminSettingsAPI.update(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { alert(err.message); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-24"><svg className="animate-spin text-[#17A2B8]" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">System Settings</h1>
        <p className="text-base text-slate-400 mt-2 font-medium">Configure conference parameters and administrative preferences.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        <div className="bg-white rounded-md border border-gray-100 shadow-sm p-10">
          <h2 className="text-base font-bold text-slate-800 tracking-tight mb-8">General Configuration</h2>
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conference Name</label>
                <input value={form.conferenceName} onChange={e => setForm(f => ({ ...f, conferenceName: e.target.value }))}
                  className="w-full border border-gray-200 rounded-md px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Abbreviation</label>
                <input value={form.abbreviation} onChange={e => setForm(f => ({ ...f, abbreviation: e.target.value }))}
                  className="w-full border border-gray-200 rounded-md px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all font-medium" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Email</label>
              <input type="email" value={form.contactEmail} onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                className="w-full border border-gray-200 rounded-md px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all font-medium" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md border border-gray-100 shadow-sm p-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-6">Security &amp; Access</h2>
          <div className="space-y-6">
            {[
              { key: 'twoFactorEnabled', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account.' },
              { key: 'maintenanceMode',  label: 'Maintenance Mode',          desc: 'Disable registration and submission forms temporarily.' },
            ].map(({ key, label, desc }) => (
              <div key={key} className={`flex items-center justify-between py-2 ${key !== 'twoFactorEnabled' ? 'border-t border-gray-50' : ''}`}>
                <div>
                  <p className="text-sm font-bold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
                <button onClick={() => setForm(f => ({ ...f, [key]: !f[key] }))}
                  className={`w-10 h-6 rounded-full relative transition-colors ${form[key] ? 'bg-[#17A2B8]' : 'bg-slate-200'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${form[key] ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          {saved && <span className="flex items-center text-sm text-emerald-500 font-semibold">✓ Settings saved!</span>}
          <button onClick={handleSave} disabled={saving}
            className="px-8 py-3.5 bg-[#17A2B8] text-white text-sm font-bold uppercase tracking-widest rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-cyan-100 disabled:opacity-70">
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
