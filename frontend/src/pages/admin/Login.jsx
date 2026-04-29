import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.login(email.trim(), password.trim());
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_admin', JSON.stringify(data.admin));
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#E9F7F8] rounded-2xl flex items-center justify-center text-[#17A2B8] mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Portal</h1>
          <p className="text-sm text-slate-400 mt-2">Sign in to manage the conference systems.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/20 focus:bg-white focus:border-[#17A2B8]/20 transition-all font-medium" 
              placeholder="admin@isc2026.org" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/20 focus:bg-white focus:border-[#17A2B8]/20 transition-all font-medium"
              placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-[#17A2B8] text-white font-bold rounded-xl hover:bg-[#138496] transition-all shadow-lg shadow-cyan-100 uppercase tracking-widest text-xs disabled:opacity-70">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-300 font-medium uppercase tracking-tight">ISC 2026 Administrative System v1.0</p>
      </div>
    </div>
  );
};

export default Login;
