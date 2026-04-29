import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconStar from '../../components/icons/Star';
import IconCoffee from '../../components/icons/Coffee';
import IconPin from '../../components/icons/Pin';
import IconDownload from '../../components/icons/Download';
import IconSearch from '../../components/icons/Search';
import { sessionAPI } from '../../services/api';

const FilterDropdown = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0 w-full sm:w-48" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-md text-[#023047] text-sm font-semibold transition-all hover:bg-gray-50 text-start`}>
        <span className="truncate">{value}</span>
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}><svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
      </button>
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white rounded-md shadow-sm origin-top">
          {options.map((option) => (
            <button key={option} onClick={() => { onChange(option); setIsOpen(false); }} className={`w-full px-4 py-2 text-start text-sm transition-colors ${value === option ? 'bg-[#E9F7F8] text-[#17A2B8] font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>{option}</button>
          ))}
        </div>
      )}
    </div>
  );
};

const Program = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedType, setSelectedType] = useState('All Session Types');
  const [selectedLocation, setSelectedLocation] = useState('Location');

  useEffect(() => {
    setLoading(true);
    sessionAPI.getByDay(activeDay)
      .then(data => setActivities(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeDay]);

  const tracks = useMemo(() => ['All Tracks', ...new Set(activities.map(a => a.track).filter(Boolean))], [activities]);
  const sessionTypes = useMemo(() => ['All Session Types', ...new Set(activities.map(a => a.type).filter(Boolean))], [activities]);
  const locations = useMemo(() => ['Location', ...new Set(activities.map(a => a.location).filter(Boolean))], [activities]);

  const filteredActivities = useMemo(() => {
    return activities.filter(act => {
      const matchesTrack = selectedTrack === 'All Tracks' || act.track === selectedTrack;
      const matchesType = selectedType === 'All Session Types' || act.type === selectedType;
      const matchesLocation = selectedLocation === 'Location' || act.location === selectedLocation;
      return matchesTrack && matchesType && matchesLocation;
    });
  }, [activities, selectedTrack, selectedType, selectedLocation]);

  const days = [
    { day: 1, date: 'Oct 14, 2026' },
    { day: 2, date: 'Oct 15, 2026' },
    { day: 3, date: 'Oct 16, 2026' },
  ];

  return (
    <div className="text-start bg-white min-h-screen">
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg></span>
          <span className="text-[#023047] font-semibold">Program</span>
        </nav>
      </div>

      <div className="app-container">
        <Hero title="Conference Program" description="Explore the full schedule of sessions, keynotes, and panels across all three days of the International Scientific Conference 2026." height="min-h-[35vh]" maxWidth="max-w-3xl mx-auto text-center" isLight={true} overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)" />
      </div>

      <main className="app-container py-12">
        <div className="flex flex-wrap gap-4 mb-10">
          {days.map((d) => (
            <button key={d.day} onClick={() => setActiveDay(d.day)} className={`flex flex-col items-center justify-center w-40 py-4 rounded-xl transition-all ${activeDay === d.day ? 'bg-[#17A2B8] text-white' : 'bg-[#E9F7F8] text-[#023047] hover:bg-[#dcf3f4]'}`}>
              <span className="text-base font-semibold">Day {d.day}</span>
              <span className={`text-xs ${activeDay === d.day ? 'text-white/80' : 'text-gray-500'}`}>{d.date}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mr-2">Filter by:</span>
          <FilterDropdown value={selectedTrack} options={tracks} onChange={setSelectedTrack} />
          <FilterDropdown value={selectedType} options={sessionTypes} onChange={setSelectedType} />
          <FilterDropdown value={selectedLocation} options={locations} onChange={setSelectedLocation} />
        </div>

        <hr className="border-gray-100 mb-12" />

        <div className="space-y-12">
          {loading ? (
            <div className="flex justify-center py-24"><svg className="animate-spin text-[#17A2B8]" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg></div>
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 lg:gap-16">
                <div className="w-full md:w-32 pt-2 text-start md:text-end shrink-0">
                  <div className="text-xl font-semibold text-[#023047]">{activity.startTime || activity.time}</div>
                  <div className="text-sm font-semibold text-gray-400">{activity.endTime}</div>
                </div>
                <div className={`flex-grow p-8 rounded-3xl transition-all border border-transparent hover:border-[#17A2B8] bg-white shadow-sm border-gray-50`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-[#E9F7F8] text-[#17A2B8] text-[10px] font-semibold uppercase tracking-widest rounded-lg flex items-center gap-2">
                      {activity.type === 'Break' ? <IconCoffee size={12} /> : <IconStar size={12} />}
                      {activity.type}
                    </span>
                    {activity.track && activity.track !== 'General' && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-md">{activity.track}</span>
                    )}
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-semibold text-[#023047] mb-4 leading-tight">{activity.title}</h2>
                  {activity.description && <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-8 max-w-4xl">{activity.description}</p>}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-[#17A2B8] font-semibold text-sm"><IconPin size={16} />{activity.location}</div>
                    {activity.speakers && activity.speakers.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {activity.speakers.filter(s => s).map((speaker, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3 bg-[#E9F7F8] pl-2 pr-4 py-1.5 rounded-xl">
                            {speaker.image && <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover border-2 border-white" />}
                            <div>
                              <div className="text-xs font-semibold text-[#023047]">{speaker.name}</div>
                              <div className="text-[10px] text-gray-500">{speaker.title}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-3xl">
              <IconSearch size={64} className="text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-[#023047] mb-2">No sessions found</h3>
              <button onClick={() => { setSelectedTrack('All Tracks'); setSelectedType('All Session Types'); setSelectedLocation('Location'); }} className="mt-6 text-[#17A2B8] font-semibold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Program;
