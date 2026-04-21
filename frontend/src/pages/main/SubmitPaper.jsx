import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconMail from '../../components/icons/Mail';
import IconBuilding from '../../components/icons/Building';
import IconUser from '../../components/icons/User';
import IconCalendar from '../../components/icons/Calendar';
import IconDownload from '../../components/icons/Download';

/* ─── Sidebar data ─── */
const importantDates = [
  { label: 'Submission Deadline:', date: 'October 15, 2025' },
  { label: 'Notification of Acceptance:', date: 'December 1, 2025' },
  { label: 'Camera-Ready Paper:', date: 'January 15, 2026' },
];

const formatReqs = [
  'All papers must be formatted according to the IEEE standard double-column template.',
  'Submissions should be between 6 to 8 pages in length, including references.',
  'Only PDF files are accepted.',
];

const tracks = [
  'Artificial Intelligence',
  'Renewable Energy',
  'Data Science',
  'Cybersecurity',
  'Biotechnology',
  'Quantum Computing',
];

/* ─── Component ─── */
const SubmitPaper = () => {
  const [step, setStep] = useState(1);
  const [keywords, setKeywords] = useState(['Neural Networks', 'Deep Learning']);
  const [kwInput, setKwInput] = useState('');
  const [abstract, setAbstract] = useState('');
  const [authors, setAuthors] = useState([
    { id: 1, type: 'Primary Author', name: 'Dr. Jane Doe', email: 'jane.doe@university.edu', institution: 'Stanford University' },
  ]);
  const [coAuthors, setCoAuthors] = useState([
    { id: 2, name: 'John Smith', email: 'john.smith@institute.org', institution: '' },
  ]);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const addKeyword = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && kwInput.trim()) {
      e.preventDefault();
      if (keywords.length < 5) setKeywords([...keywords, kwInput.trim()]);
      setKwInput('');
    }
  };

  const removeKeyword = (kw) => setKeywords(keywords.filter(k => k !== kw));

  const addCoAuthor = () => setCoAuthors([...coAuthors, { id: Date.now(), name: '', email: '', institution: '' }]);
  const removeCoAuthor = (id) => setCoAuthors(coAuthors.filter(a => a.id !== id));
  const updateCoAuthor = (id, field, value) =>
    setCoAuthors(coAuthors.map(a => a.id === id ? { ...a, [field]: value } : a));

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type === 'application/pdf') setFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-lg mx-auto px-6 py-32 text-center">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-[#E9F7F8] rounded-2xl flex items-center justify-center text-[#17A2B8]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6"/><path d="M9 17h3"/></svg>
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-[#023047] mb-3">Paper Submitted!</h1>
        <p className="text-[#6B7280] leading-relaxed">
          Your paper has been received. Track its status under{' '}
          <Link to="/track-paper" className="text-[#17A2B8] hover:underline font-semibold">Track Paper</Link>.
        </p>
        <Link to="/" className="mt-10 inline-block px-10 py-4 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20">
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <div className="text-start bg-white min-h-screen">

      {/* Breadcrumbs */}
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </span>
          <span className="text-[#023047] font-semibold">Submit Paper</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="app-container">
        <div className="rounded-md overflow-hidden bg-white">
          <Hero
            title="Submit Your Research Paper"
            description="Share your groundbreaking work with the global scientific community. Submissions are now open for the International Scientific Conference 2026."
            height="min-h-[28vh]"
            maxWidth="max-w-3xl"
            isLight={true}
            overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)"
          />
        </div>
      </div>

      <main className="app-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

          {/* ── Left: Form ── */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-md p-10 space-y-12">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#023047]">Paper Submission</h2>
                <p className="text-xs text-gray-400 mt-1">Please ensure all information is accurate before final submission. Fields marked with an asterisk (*) are required.</p>
              </div>
              <span className="px-3 py-1 bg-[#E9F7F8] text-[#17A2B8] text-[10px] font-semibold rounded-full uppercase tracking-widest">Draft mode</span>
            </div>

            {/* ─── Step 1: Paper Information ─── */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-8 h-8 rounded-md bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <h3 className="text-base font-semibold text-[#023047]">1. Paper Information</h3>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Paper Title <span className="text-red-400">*</span></label>
                <input required placeholder="Enter the full title of your research paper" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all" />
                <p className="text-[10px] text-gray-400">Keep your title concise yet descriptive</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Track / Theme <span className="text-red-400">*</span></label>
                <select required className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all appearance-none">
                  <option>Select scientific track</option>
                  {tracks.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Abstract <span className="text-red-400">*</span></label>
                <textarea
                  rows={8} required
                  placeholder="Provide a comprehensive abstract summarizing your research, methodology, and key findings..."
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value.slice(0, 300))}
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/30 transition-all resize-none leading-relaxed"
                />
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Minimum 150 words, maximum 300 words.</span>
                  <span>{abstract.length} / 300 words</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Keywords <span className="text-red-400">*</span></label>
                <div className="flex flex-wrap gap-2 border border-gray-200 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-[#17A2B8]/10 focus-within:border-[#17A2B8]/30 transition-all min-h-[48px] items-center">
                  {keywords.map(kw => (
                    <span key={kw} className="flex items-center gap-1.5 bg-[#E9F7F8] text-[#17A2B8] text-xs font-semibold px-3 py-1 rounded-full">
                      {kw}
                      <button type="button" onClick={() => removeKeyword(kw)} className="opacity-60 hover:opacity-100">×</button>
                    </span>
                  ))}
                  <input
                    value={kwInput} onChange={(e) => setKwInput(e.target.value)} onKeyDown={addKeyword}
                    placeholder="Add keyword and press enter..."
                    className="flex-1 text-sm min-w-[160px] outline-none placeholder-gray-300 bg-transparent"
                  />
                </div>
                <p className="text-[10px] text-gray-400">Add 3 to 5 keywords separated by commas or enter.</p>
              </div>
            </div>

            {/* ─── Step 2: Authors ─── */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-8 h-8 rounded-md bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]">
                  <IconUser size={16} />
                </div>
                <h3 className="text-base font-semibold text-[#023047]">2. Authors Information</h3>
              </div>

              {/* Primary Author */}
              <div className="border border-[#17A2B8]/20 rounded-md p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#17A2B8] text-white text-[10px] font-bold flex items-center justify-center">1</div>
                  <span className="text-sm font-semibold text-[#023047]">Primary Author</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Full Name <span className="text-red-400">*</span></label>
                    <input required placeholder="Dr. Jane Doe" defaultValue="Dr. Jane Doe" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Email Address <span className="text-red-400">*</span></label>
                    <input required type="email" placeholder="jane.doe@university.edu" defaultValue="jane.doe@university.edu" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Affiliation / Institution <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <IconBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
                    <input required placeholder="Stanford University" defaultValue="Stanford University" className="w-full pl-11 pr-4 border border-gray-200 rounded-md py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
                  </div>
                </div>
              </div>

              {/* Co-Authors */}
              {coAuthors.map((a, idx) => (
                <div key={a.id} className="border border-gray-100 rounded-md p-6 space-y-5 bg-[#FBFDFE]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-[10px] font-bold flex items-center justify-center">{idx + 2}</div>
                      <span className="text-sm font-semibold text-[#023047]">Co-Author</span>
                    </div>
                    <button type="button" onClick={() => removeCoAuthor(a.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Full Name</label>
                      <input placeholder="John Smith" value={a.name} onChange={(e) => updateCoAuthor(a.id, 'name', e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Email Address</label>
                      <input type="email" placeholder="john.smith@institute.org" value={a.email} onChange={(e) => updateCoAuthor(a.id, 'email', e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Affiliation / Institution</label>
                    <div className="relative">
                      <IconBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={15} />
                      <input placeholder="e.g., MIT" value={a.institution} onChange={(e) => updateCoAuthor(a.id, 'institution', e.target.value)} className="w-full pl-11 pr-4 border border-gray-200 rounded-md py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" onClick={addCoAuthor} className="flex items-center gap-2 text-sm font-semibold text-[#17A2B8] hover:underline transition-all">
                <span className="text-xl leading-none">⊕</span> Add Another Author
              </button>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Corresponding Author <span className="text-red-400">*</span></label>
                <select className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-[#023047] focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all appearance-none">
                  <option>Dr. Jane Doe (jane.doe@university.edu)</option>
                  {coAuthors.filter(a => a.name).map(a => <option key={a.id}>{a.name} ({a.email})</option>)}
                </select>
                <p className="text-[10px] text-gray-400">Select the primary contact for notifications regarding this submission.</p>
              </div>
            </div>

            {/* ─── Step 3: File Upload ─── */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-8 h-8 rounded-md bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                </div>
                <h3 className="text-base font-semibold text-[#023047]">3. File Upload</h3>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => fileRef.current.click()}
                className={`border-2 border-dashed rounded-md p-16 cursor-pointer transition-all text-center flex flex-col items-center gap-4 ${isDragging ? 'border-[#17A2B8] bg-[#E9F7F8]' : 'border-gray-200 bg-[#FBFDFE] hover:border-[#17A2B8]/40'}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                </div>
                {file ? (
                  <p className="text-sm font-semibold text-[#17A2B8]">{file.name}</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-[#023047]">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF format only. Maximum file size: 10MB</p>
                    <button type="button" className="text-xs font-semibold text-[#17A2B8] underline underline-offset-2">Browse Files</button>
                  </>
                )}
                <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </div>

              <div className="flex items-start gap-3 text-xs text-gray-400 leading-relaxed">
                <svg width="16" height="16" className="shrink-0 mt-0.5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>By submitting this paper, you agree that the manuscript is original, has not been published previously, and is not currently under consideration for publication elsewhere.</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button type="button" className="px-8 py-3 text-sm font-semibold text-[#023047] hover:text-[#17A2B8] transition-colors">
                  Save as Draft
                </button>
                <button type="submit" className="px-8 py-3 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20 flex items-center gap-2">
                  Submit Paper
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>
          </form>

          {/* ── Right: Sidebar ── */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {/* Submission Guidelines */}
            <div className="border border-gray-100 rounded-md p-8 shadow-sm">
              <h3 className="text-base font-semibold text-[#023047] mb-6">Submission Guidelines</h3>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-[#17A2B8] mb-4">
                  <IconCalendar size={16} />
                  <span className="text-xs font-semibold uppercase tracking-widest">Important Dates</span>
                </div>
                <ul className="space-y-4">
                  {importantDates.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-[#17A2B8] flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#17A2B8]" />
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400">{d.label}</p>
                        <p className="text-xs font-semibold text-[#023047]">{d.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[#17A2B8] mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M12 6v6"/><path d="M9 10a6 6 0 1 0 6 0"/></svg>
                  <span className="text-xs font-semibold uppercase tracking-widest">Format Requirements</span>
                </div>
                <ul className="space-y-3">
                  {formatReqs.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 mt-0.5 rounded-full border border-[#17A2B8]/40 flex items-center justify-center shrink-0">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#17A2B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{r}</p>
                    </li>
                  ))}
                </ul>
                <button type="button" className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#17A2B8] hover:underline">
                  <IconDownload size={14} /> Download Template
                </button>
              </div>

              <div className="pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[#17A2B8] mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  <span className="text-xs font-semibold uppercase tracking-widest">Review Process</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">All submissions will undergo a double-blind peer review process by at least three members of the scientific committee based on originality, significance, quality, and clarity.</p>
              </div>
            </div>

            {/* Need Assistance */}
            <div className="border border-[#17A2B8]/20 bg-[#E9F7F8] rounded-md p-6">
              <h4 className="text-sm font-semibold text-[#023047] mb-2">Need Assistance?</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">If you encounter any issues during the submission process, please contact our support team.</p>
              <a href="mailto:support@isc2026.org" className="flex items-center gap-2 text-xs font-semibold text-[#17A2B8] hover:underline">
                <IconMail size={14} /> support@isc2026.org
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default SubmitPaper;
