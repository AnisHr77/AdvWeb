import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconMail from '../../components/icons/Mail';
import IconBuilding from '../../components/icons/Building';
import IconUser from '../../components/icons/User';
import IconCalendar from '../../components/icons/Calendar';
import IconDownload from '../../components/icons/Download';
import { submissionAPI } from '../../services/api';

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

const tracksList = [
  'Artificial Intelligence',
  'Renewable Energy',
  'Data Science',
  'Cybersecurity',
  'Biotechnology',
  'Quantum Computing',
];

const SubmitPaper = () => {
  const [title, setTitle] = useState('');
  const [track, setTrack] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState(['Neural Networks', 'Deep Learning']);
  const [kwInput, setKwInput] = useState('');
  
  const [primaryAuthor, setPrimaryAuthor] = useState({ 
    name: 'Dr. Jane Doe', 
    email: 'jane.doe@university.edu', 
    institution: 'Stanford University' 
  });
  
  const [coAuthors, setCoAuthors] = useState([
    { id: 2, name: 'John Smith', email: 'john.smith@institute.org', institution: '' },
  ]);
  
  const [correspondingAuthor, setCorrespondingAuthor] = useState('jane.doe@university.edu');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  const prepareFormData = () => {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('track', track);
    fd.append('abstract', abstract);
    fd.append('keywords', JSON.stringify(keywords));
    fd.append('primaryAuthorName', primaryAuthor.name);
    fd.append('primaryAuthorEmail', primaryAuthor.email);
    fd.append('primaryAuthorInstitution', primaryAuthor.institution);
    fd.append('coAuthors', JSON.stringify(coAuthors.filter(a => a.name && a.email)));
    fd.append('correspondingAuthor', correspondingAuthor);
    if (file) fd.append('file', file);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setError('Please upload your paper PDF.');
    if (!track || track === 'Select scientific track') return setError('Please select a track.');
    
    setError('');
    setLoading(true);
    try {
      await submissionAPI.submit(prepareFormData());
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setError('');
    setLoading(true);
    try {
      await submissionAPI.saveDraft(prepareFormData());
      alert('Draft saved successfully!');
    } catch (err) {
      setError(err.message || 'Failed to save draft.');
    } finally {
      setLoading(false);
    }
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
        <p className="text-[#6B7280] leading-relaxed">Your paper has been received. Track its status under <Link to="/track-paper" className="text-[#17A2B8] hover:underline font-semibold">Track Paper</Link>.</p>
        <Link to="/" className="mt-10 inline-block px-10 py-4 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20">Return Home</Link>
      </main>
    );
  }

  return (
    <div className="text-start bg-white min-h-screen">
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="text-[#023047] font-semibold">Submit Paper</span>
        </nav>
      </div>

      <div className="app-container">
        <Hero title="Submit Your Research Paper" description="Share your groundbreaking work with the global scientific community. Submissions are now open for the International Scientific Conference 2026." height="min-h-[28vh]" maxWidth="max-w-3xl" isLight={true} overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)" />
      </div>

      <main className="app-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-100 shadow-sm rounded-md p-10 space-y-12">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#023047]">Paper Submission</h2>
                <p className="text-xs text-gray-400 mt-1">Please ensure all information is accurate before final submission. Fields marked with an asterisk (*) are required.</p>
              </div>
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 text-sm rounded-md border border-red-100 font-medium">{error}</div>}

            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                <div className="w-8 h-8 rounded-md bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                <h3 className="text-base font-semibold text-[#023047]">1. Paper Information</h3>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Paper Title <span className="text-red-400">*</span></label>
                <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter the full title of your research paper" className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Track / Theme <span className="text-red-400">*</span></label>
                <select required value={track} onChange={e => setTrack(e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-gray-500 focus:outline-none transition-all appearance-none">
                  <option value="">Select scientific track</option>
                  {tracksList.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Abstract <span className="text-red-400">*</span></label>
                <textarea rows={8} required placeholder="Provide a comprehensive abstract summarizing your research..." value={abstract} onChange={(e) => setAbstract(e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none transition-all resize-none leading-relaxed" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Keywords <span className="text-red-400">*</span></label>
                <div className="flex flex-wrap gap-2 border border-gray-200 rounded-md px-4 py-3 focus-within:ring-2 focus-within:ring-[#17A2B8]/10 transition-all min-h-[48px] items-center">
                  {keywords.map(kw => (
                    <span key={kw} className="flex items-center gap-1.5 bg-[#E9F7F8] text-[#17A2B8] text-xs font-semibold px-3 py-1 rounded-full">{kw}<button type="button" onClick={() => removeKeyword(kw)} className="opacity-60 hover:opacity-100">×</button></span>
                  ))}
                  <input value={kwInput} onChange={(e) => setKwInput(e.target.value)} onKeyDown={addKeyword} placeholder="Add keyword and press enter..." className="flex-1 text-sm outline-none bg-transparent" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50"><div className="w-8 h-8 rounded-md bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]"><IconUser size={16} /></div><h3 className="text-base font-semibold text-[#023047]">2. Authors Information</h3></div>
              <div className="border border-[#17A2B8]/20 rounded-md p-6 space-y-5">
                <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-[#17A2B8] text-white text-[10px] font-bold flex items-center justify-center">1</div><span className="text-sm font-semibold text-[#023047]">Primary Author</span></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Full Name <span className="text-red-400">*</span></label>
                    <input required value={primaryAuthor.name} onChange={e => setPrimaryAuthor({...primaryAuthor, name: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none transition-all" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Email Address <span className="text-red-400">*</span></label>
                    <input required type="email" value={primaryAuthor.email} onChange={e => setPrimaryAuthor({...primaryAuthor, email: e.target.value})} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest">Affiliation / Institution <span className="text-red-400">*</span></label>
                  <div className="relative"><IconBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={15} /><input required value={primaryAuthor.institution} onChange={e => setPrimaryAuthor({...primaryAuthor, institution: e.target.value})} className="w-full pl-11 border border-gray-200 rounded-md py-3 text-sm focus:outline-none transition-all" /></div>
                </div>
              </div>
              {coAuthors.map((a, idx) => (
                <div key={a.id} className="border border-gray-100 rounded-md p-6 space-y-5 bg-[#FBFDFE]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-[10px] font-bold flex items-center justify-center">{idx + 2}</div><span className="text-sm font-semibold text-[#023047]">Co-Author</span></div>
                    <button type="button" onClick={() => removeCoAuthor(a.id)} className="text-gray-300 hover:text-red-400 transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input placeholder="Full Name" value={a.name} onChange={(e) => updateCoAuthor(a.id, 'name', e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm" />
                    <input placeholder="Email Address" value={a.email} onChange={(e) => updateCoAuthor(a.id, 'email', e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addCoAuthor} className="text-sm font-semibold text-[#17A2B8] hover:underline transition-all">⊕ Add Another Author</button>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Corresponding Author <span className="text-red-400">*</span></label>
                <select value={correspondingAuthor} onChange={e => setCorrespondingAuthor(e.target.value)} className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-[#023047] appearance-none">
                  <option value={primaryAuthor.email}>{primaryAuthor.name} ({primaryAuthor.email})</option>
                  {coAuthors.filter(a => a.name).map(a => <option key={a.id} value={a.email}>{a.name} ({a.email})</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-50"><div className="w-8 h-8 rounded-md bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg></div><h3 className="text-base font-semibold text-[#023047]">3. File Upload</h3></div>
              <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onClick={() => fileRef.current.click()} className={`border-2 border-dashed rounded-md p-16 cursor-pointer transition-all text-center flex flex-col items-center gap-4 ${isDragging ? 'border-[#17A2B8] bg-[#E9F7F8]' : 'border-gray-200 bg-[#FBFDFE] hover:border-[#17A2B8]/40'}`}>
                <div className="w-16 h-16 rounded-2xl bg-[#E9F7F8] flex items-center justify-center text-[#17A2B8]"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                {file ? <p className="text-sm font-semibold text-[#17A2B8]">{file.name}</p> : <><p className="text-sm font-semibold text-[#023047]">Click to upload or drag and drop</p><p className="text-xs text-gray-400">PDF format only. Maximum file size: 10MB</p></>}
                <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <button type="button" disabled={loading} onClick={handleSaveDraft} className="px-8 py-3 text-sm font-semibold text-[#023047] hover:text-[#17A2B8] disabled:opacity-50">Save as Draft</button>
                <button type="submit" disabled={loading} className="px-8 py-3 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg flex items-center gap-2 disabled:opacity-70">
                  {loading ? 'Submitting...' : 'Submit Paper'}
                  {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>}
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="border border-gray-100 rounded-md p-8 shadow-sm">
              <h3 className="text-base font-semibold text-[#023047] mb-6">Submission Guidelines</h3>
              <div className="mb-6"><div className="flex items-center gap-2 text-[#17A2B8] mb-4"><IconCalendar size={16} /><span className="text-xs font-semibold uppercase tracking-widest">Important Dates</span></div>
                <ul className="space-y-4">{importantDates.map((d, i) => <li key={i} className="flex items-start gap-3"><div className="w-4 h-4 mt-0.5 rounded-full border-2 border-[#17A2B8] flex items-center justify-center shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-[#17A2B8]" /></div><div><p className="text-[11px] text-gray-400">{d.label}</p><p className="text-xs font-semibold text-[#023047]">{d.date}</p></div></li>)}</ul>
              </div>
              <div className="pt-6 border-t border-gray-50"><button type="button" className="flex items-center gap-2 text-xs font-semibold text-[#17A2B8] hover:underline"><IconDownload size={14} /> Download Template</button></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmitPaper;
