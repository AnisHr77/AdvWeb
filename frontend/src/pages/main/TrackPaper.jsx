import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconMail from '../../components/icons/Mail';
import IconDownload from '../../components/icons/Download';
import IconCalendar from '../../components/icons/Calendar';
import IconUser from '../../components/icons/User';

/* ─── Mock paper data ─── */
const mockPaper = {
  refId: 'ISC-2026-8492',
  title: 'Deep Learning Approaches for Renewable Energy Forecasting and Grid Optimization',
  status: 'UNDER REVIEW',
  submissionDate: 'October 12, 2025',
  track: 'Renewable Energy & Sustainability',
  correspondingAuthor: 'jane.doe@university.edu',
  file: 'Manuscript_v1.pdf',
};

const steps = [
  { label: 'Submitted', sub: 'Oct 12, 2025', state: 'done' },
  { label: 'Under Review', sub: 'In Progress', state: 'active' },
  { label: 'Reviewed', sub: 'Pending', state: 'pending' },
  { label: 'Final Decision', sub: 'Dec 1, 2025', state: 'pending' },
];

/* ─── Component ─── */
const TrackPaper = () => {
  const [email, setEmail] = useState('jane.doe@university.edu');
  const [refId, setRefId] = useState('ISC-2026-8492');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    setChecked(false);
    setPaper(null);
    setLoading(true);
    setTimeout(() => {
      setPaper(mockPaper);
      setChecked(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="text-start bg-white min-h-screen">

      {/* Breadcrumbs */}
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
          <span className="text-[#023047] font-semibold">Track Paper</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="app-container">
        <div className="rounded-md overflow-hidden bg-white">
          <Hero
            title="Track Your Paper Submission"
            description="Check the current status of your submitted research paper, view reviewer feedback, and stay updated on important dates."
            height="min-h-[28vh]"
            maxWidth="max-w-3xl"
            isLight={true}
            overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)"
          />
        </div>
      </div>

      <main className="app-container py-16 space-y-8 max-w-4xl">

        {/* ── Search Card ── */}
        <div className="bg-white border border-gray-100 rounded-md shadow-sm p-8">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4 items-end">
            {/* Email */}
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Corresponding Author Email</label>
              <div className="relative">
                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="jane.doe@university.edu"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all"
                />
              </div>
            </div>

            {/* Ref ID */}
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Paper Title or Reference ID</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                <input
                  type="text" value={refId} onChange={(e) => setRefId(e.target.value)} required
                  placeholder="ISC-2026-8492"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="px-8 py-3 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Checking...
                </>
              ) : 'Check Status'}
            </button>
          </form>
        </div>

        {/* ── Result Card ── */}
        {checked && paper && (
          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-8 space-y-8">

            {/* Title Row */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="text-gray-400">#</span> Reference ID:&nbsp;
                  <span className="text-[#17A2B8]">{paper.refId}</span>
                </p>
                <h2 className="text-xl font-semibold text-[#17A2B8] leading-snug max-w-xl">{paper.title}</h2>
              </div>
              <span className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#E9F7F8] text-[#17A2B8] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#17A2B8]/20 whitespace-nowrap">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#17A2B8]"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                {paper.status}
              </span>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-[#FBFDFE] rounded-md border border-gray-50">
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1.5">
                  <IconCalendar size={14} />
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Submission Date</span>
                </div>
                <p className="text-sm font-semibold text-[#17A2B8]">{paper.submissionDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Track / Theme</span>
                </div>
                <p className="text-sm font-semibold text-[#17A2B8]">{paper.track}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1.5">
                  <IconUser size={14} />
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Corresponding Author</span>
                </div>
                <p className="text-sm font-semibold text-[#023047]">{paper.correspondingAuthor}</p>
              </div>
            </div>

            {/* File */}
            <div>
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Uploaded File</span>
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17A2B8] hover:underline">
                <IconDownload size={14} />
                {paper.file}
              </a>
            </div>

            {/* ── Review Progress Stepper ── */}
            <div>
              <h3 className="text-base font-semibold text-[#023047] mb-8">Review Progress</h3>
              <div className="flex items-start gap-0">
                {steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    {/* Step */}
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      {/* Circle */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all ${
                        step.state === 'done'
                          ? 'bg-[#17A2B8] border-[#17A2B8] text-white'
                          : step.state === 'active'
                          ? 'bg-white border-[#17A2B8] text-[#17A2B8]'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}>
                        {step.state === 'done' ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : step.state === 'active' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#17A2B8]"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Label */}
                      <p className={`mt-3 text-xs font-semibold text-center ${
                        step.state === 'done' ? 'text-[#023047]'
                        : step.state === 'active' ? 'text-[#17A2B8]'
                        : 'text-gray-400'
                      }`}>{step.label}</p>
                      <p className={`text-[10px] text-center mt-0.5 ${step.state === 'active' ? 'text-[#17A2B8]' : 'text-gray-400'}`}>{step.sub}</p>
                    </div>

                    {/* Connector */}
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mt-5 mx-1 ${
                        steps[idx + 1].state === 'done' || step.state === 'done' && steps[idx + 1].state === 'active'
                          ? 'bg-[#17A2B8]'
                          : 'bg-gray-200'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default TrackPaper;
