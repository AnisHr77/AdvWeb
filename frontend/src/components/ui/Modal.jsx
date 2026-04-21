import React, { useEffect } from 'react';

/**
 * Professional Modal Component
 * 
 * Props:
 * @param {boolean} isOpen - Controls visibility
 * @param {function} onClose - Function to call on close
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content
 * @param {string} maxWidth - Tailwind max-width class
 */
const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full ${maxWidth} bg-white rounded-xl shadow-2xl shadow-slate-200/50 overflow-hidden transform animate-in zoom-in-95 duration-200`}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
