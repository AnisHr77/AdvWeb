import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../../components/ui/Hero';
import SpeakerCard from '../../components/ui/SpeakerCard';
import heroImg from '../../assets/hero.jpg';
import IconSearch from '../../components/icons/Search';
import IconFlask from '../../components/icons/Flask';
import IconGlobe from '../../components/icons/Globe';
import { speakerAPI } from '../../services/api';

const FilterDropdown = ({ value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div className="relative flex-shrink-0 w-full sm:w-56" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 pl-4 pr-10 py-3 bg-slate-50 border ${isOpen ? 'border-[#17A2B8]' : 'border-transparent'} rounded-md text-slate-800 text-sm font-semibold transition-all hover:bg-white hover:border-slate-200 text-start`}>
        <div className="text-gray-400"><Icon size={18} /></div>
        <span className="truncate">{value}</span>
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white border border-gray-100 rounded-md shadow-xl">
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full px-4 py-2 text-start text-sm transition-colors ${value === opt ? 'bg-[#dcf3f4] text-[#17A2B8] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Speakers = () => {
  const [allSpeakers, setAllSpeakers] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme,   setSelectedTheme]   = useState('All Themes');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');

  useEffect(() => {
    speakerAPI.getAll()
      .then(data => setAllSpeakers(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const themes    = ['All Themes', ...new Set(allSpeakers.map(s => s.tag || s.track).filter(Boolean))];
  const countries = ['All Countries', ...new Set(allSpeakers.map(s => s.country).filter(Boolean))];

  const keynotes = useMemo(() => allSpeakers.filter(s => s.type === 'keynote'), [allSpeakers]);
  const invited  = useMemo(() => allSpeakers.filter(s => s.type !== 'keynote'), [allSpeakers]);

  const filtered = useMemo(() => invited.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchSearch  = !q || s.name?.toLowerCase().includes(q) || s.tag?.toLowerCase().includes(q) || s.title?.toLowerCase().includes(q);
    const matchTheme   = selectedTheme   === 'All Themes'    || s.tag === selectedTheme;
    const matchCountry = selectedCountry === 'All Countries' || s.country === selectedCountry;
    return matchSearch && matchTheme && matchCountry;
  }), [invited, searchQuery, selectedTheme, selectedCountry]);

  return (
    <div className="text-start">
      <Hero title="Our Speakers" description="Meet our distinguished keynote and invited speakers for ISC 2026."
        image={heroImg} height="min-h-[45vh]"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Speakers' }]} />

      <main className="relative">
        <div className="absolute inset-0 bg-[#F8FAFC] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#E9F7F8] to-transparent pointer-events-none" />
        <div className="app-container relative py-16">

          {loading ? (
            <div className="flex justify-center py-24">
              <svg className="animate-spin text-[#17A2B8]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            </div>
          ) : (
            <>
              {/* Keynote Section */}
              {keynotes.length > 0 && (
                <div className="mb-20">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-px flex-grow bg-slate-200" />
                    <h2 className="text-sm font-semibold text-[#17A2B8] uppercase tracking-widest px-4 py-1.5 bg-cyan-50 rounded-full border border-cyan-100">Keynote Speakers</h2>
                    <div className="h-px flex-grow bg-slate-200" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {keynotes.map((speaker, idx) => (
                      <div key={idx} className="bg-white rounded-md border border-slate-100 p-2 group hover:border-[#17A2B8] transition-all">
                        <div className="flex flex-col md:flex-row gap-8">
                          <div className="w-full md:w-64 aspect-square overflow-hidden rounded-md shrink-0">
                            <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="py-4 pr-6 flex flex-col justify-center">
                            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#17A2B8] px-2 py-0.5 bg-cyan-50 rounded border border-cyan-100 w-max mb-3">{speaker.tag}</span>
                            <h3 className="text-3xl font-semibold text-slate-800 mb-2">{speaker.name}</h3>
                            <p className="text-base text-[#17A2B8] mb-4">{speaker.title}, {speaker.institution}</p>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6">{speaker.bio}</p>
                            <button className="w-max px-6 py-2.5 bg-slate-800 text-white text-xs font-semibold uppercase tracking-widest rounded-md hover:bg-slate-900 transition-all">View Keynote Details</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="bg-white border border-slate-100 rounded-md p-6 mb-12 flex flex-col lg:flex-row items-center gap-6">
                <div className="relative flex-grow w-full lg:w-auto">
                  <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Find a speaker..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-transparent rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#17A2B8] transition-all text-sm" />
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <FilterDropdown value={selectedTheme}   options={themes}    onChange={setSelectedTheme}   icon={IconFlask} />
                  <FilterDropdown value={selectedCountry} options={countries} onChange={setSelectedCountry} icon={IconGlobe} />
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
                  Invited Speakers <span className="text-slate-200 mx-2">—</span> <span className="text-slate-800">{filtered.length} FOUND</span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filtered.map((speaker, idx) => <SpeakerCard key={speaker._id || idx} {...speaker} variant="detailed" />)}
              </div>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-md border border-dashed border-slate-200">
                  <div className="text-slate-200 mb-6"><IconSearch size={64} /></div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No speakers match your criteria</h3>
                  <p className="text-slate-400 text-sm">Try using different keywords or filters.</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedTheme('All Themes'); setSelectedCountry('All Countries'); }}
                    className="mt-8 px-6 py-3 border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-widest rounded-md hover:bg-slate-50 transition-all">
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Speakers;
