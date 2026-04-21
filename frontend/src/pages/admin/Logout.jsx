import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Here you would clear session/tokens
    // For now, just redirect back to home
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
          <svg className="animate-spin text-slate-400" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Signing out...</h1>
        <p className="text-sm text-slate-400">Please wait while we secure your session.</p>
      </div>
    </div>
  );
};

export default Logout;
