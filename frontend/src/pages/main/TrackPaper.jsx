import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconMail from '../../components/icons/Mail';
import IconDownload from '../../components/icons/Download';
import IconCalendar from '../../components/icons/Calendar';
import IconUser from '../../components/icons/User';
import { submissionAPI } from '../../services/api';

const steps = [
  { label: 'Submitted',      state: 'done' },
  { label: 'Under Review',   state: 'active' },
  { label: 'Reviewed',       state: 'pending' },
  { label: 'Final Decision', state: 'pending' },
];

const TrackPaper = () => {
  const [email,   setEmail]   = useState('');
  const [refId,   setRefId]   = useState('');
  const [loading, setLoading] = useState(false);
  const [paper,   setPaper]   = useState(null);
  const [error,   setError]   = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    setError('');
    setPaper(null);
    setLoading(true);
    try {
      const data = await submissionAPI.track(email, refId);
      setPaper(data);
    } catch (err) {
      setError(err.message || 'No submission found for the provided details.');
    } finally {
      setLoading(false);
    }
  };

  const paperSteps = paper?.steps || steps;

  return (
    <div className="text-start bg-white min-h-screen">
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="text-[#023047] font-semibold">Track Paper</span>
        </nav>
      </div>

      <div className="app-container">
        <Hero title="Track Your Paper Submission"
          description="Check the current status of your submitted research paper and stay updated on important dates."
          height="min-h-[28vh]" maxWidth="max-w-3xl" isLight={true}
          overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)" />
      </div>

      <main className="app-container py-16 space-y-8 max-w-4xl">
        {/* Search Card */}
        <div className="bg-white border border-gray-100 rounded-md shadow-sm p-8">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Corresponding Author Email</label>
              <div className="relative">
                <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="jane.doe@university.edu"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Reference ID</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                <input type="text" value={refId} onChange={e => setRefId(e.target.value)} required
                  placeholder="ISC-2026-0001"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="px-8 py-3 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20 whitespace-nowrap disabled:opacity-70 flex items-center gap-2">
              {loading
                ? <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Checking...</>
                : 'Check Status'}
            </button>
          </form>
          {error && <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>}
        </div>

        {/* Result Card */}
        {paper && (
          <div className="bg-white border border-gray-100 rounded-md shadow-sm p-8 space-y-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  # Reference ID: <span className="text-[#17A2B8]">{paper.refId}</span>
                </p>
                <h2 className="text-xl font-semibold text-[#17A2B8] leading-snug max-w-xl">{paper.title}</h2>
              </div>
              <span className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-[#E9F7F8] text-[#17A2B8] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#17A2B8]/20">
                {paper.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 bg-[#FBFDFE] rounded-md border border-gray-50">
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1.5"><IconCalendar size={14} /><span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Submission Date</span></div>
                <p className="text-sm font-semibold text-[#17A2B8]">{paper.submissionDate}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1.5"><span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Track</span></div>
                <p className="text-sm font-semibold text-[#17A2B8]">{paper.track}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-1.5"><IconUser size={14} /><span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Corresponding Author</span></div>
                <p className="text-sm font-semibold text-[#023047]">{paper.correspondingAuthor}</p>
              </div>
            </div>

            {paper.file && (
              <div>
                <div className="flex items-center gap-2 text-gray-300 mb-2"><span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">Uploaded File</span></div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-[#17A2B8] hover:underline">
                  <IconDownload size={14} />{paper.file}
                </a>
              </div>
            )}

            {/* Stepper */}
            <div>
              <h3 className="text-base font-semibold text-[#023047] mb-8">Review Progress</h3>
              <div className="flex items-start gap-0">
                {paperSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all ${
                        step.state === 'done'   ? 'bg-[#17A2B8] border-[#17A2B8] text-white' :
                        step.state === 'active' ? 'bg-white border-[#17A2B8] text-[#17A2B8]' :
                        'bg-white border-gray-200 text-gray-400'}`}>
                        {step.state === 'done' ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> : idx + 1}
                      </div>
                      <p className={`mt-3 text-xs font-semibold text-center ${step.state === 'done' ? 'text-[#023047]' : step.state === 'active' ? 'text-[#17A2B8]' : 'text-gray-400'}`}>{step.label}</p>
                      <p className={`text-[10px] text-center mt-0.5 ${step.state === 'active' ? 'text-[#17A2B8]' : 'text-gray-400'}`}>{step.sub}</p>
                    </div>
                    {idx < paperSteps.length - 1 && (
                      <div className={`flex-1 h-0.5 mt-5 mx-1 ${step.state === 'done' ? 'bg-[#17A2B8]' : 'bg-gray-200'}`} />
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
