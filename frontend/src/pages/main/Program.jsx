import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconStar from '../../components/icons/Star';
import IconCoffee from '../../components/icons/Coffee';
import IconPin from '../../components/icons/Pin';
import IconDownload from '../../components/icons/Download';
import IconSearch from '../../components/icons/Search';

const FilterDropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0 w-full sm:w-48" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-md text-[#023047] text-sm font-semibold transition-all duration-200 hover:bg-gray-50 text-start`}
      >
        <span className="truncate">{value}</span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white rounded-md shadow-sm animate-in fade-in zoom-in duration-200 origin-top">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                value === option 
                ? 'bg-[#E9F7F8] text-[#17A2B8] font-semibold' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const scheduleData = [
  {
    day: 1,
    date: 'Oct 14, 2026',
    activities: [
      {
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        title: 'Welcome & Introduction to ISC 2026',
        description: "Opening remarks from the organizing committee, outlining the goals, major themes, and expected outcomes for this year's global gathering of scientific minds.",
        track: 'General',
        type: 'Opening Ceremony',
        location: 'Main Auditorium, Hall A',
        speakers: [{ name: 'Prof. Heinrich Muller', title: 'Conference Chair', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400' }],
        isLive: false,
        icon: IconStar
      },
      {
        startTime: '10:30 AM',
        endTime: '11:45 AM',
        title: 'The Future of Cognitive Neural Architectures in a Resource-Constrained World',
        description: 'An in-depth look at transitioning from brute-force computational scaling to biologically inspired, highly efficient neural networks that reduce carbon footprints.',
        track: 'Artificial Intelligence',
        type: 'Keynote',
        location: 'Main Auditorium, Hall A',
        speakers: [{ name: 'Dr. Sarah Jenkins', title: 'Prof. of Computer Science, MIT', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400' }],
        isLive: true,
        icon: null
      },
      {
        startTime: '11:45 AM',
        endTime: '12:30 PM',
        title: 'Networking Break & Poster Viewing',
        description: '',
        track: 'Networking',
        type: 'Break',
        location: 'Exhibition Hall B',
        speakers: [],
        isLive: false,
        icon: IconCoffee
      },
      {
        startTime: '12:30 PM',
        endTime: '02:00 PM',
        title: 'Accelerating the Global Transition to Solid-State Battery Technologies',
        description: 'A dynamic discussion among industry leaders and academic researchers on overcoming the manufacturing hurdles of next-generation energy storage.',
        track: 'Renewable Energy',
        type: 'Panel Discussion',
        location: 'Symposium Room 2',
        speakers: [
          { name: 'Dr. Robert Hayes', title: 'Lead Engineer, Tesla', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
          { name: 'Dr. Elena Rodriguez', title: 'Senior Scientist, CNRS', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400' }
        ],
        isLive: false,
        icon: null
      },
      {
        startTime: '02:30 PM',
        endTime: '04:30 PM',
        title: 'Hands-on: Privacy-Preserving Machine Learning with Federated Frameworks',
        description: 'Bring your laptop. Participants will build and train a federated learning model across distributed nodes while maintaining strict data privacy protocols.',
        track: 'Data Science',
        type: 'Interactive Workshop',
        location: 'Workshop Lab 4',
        speakers: [{ name: 'Dr. Vikram Sharma', title: 'Senior Fellow, IISc', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400' }],
        isLive: false,
        icon: null
      }
    ]
  },
  { day: 2, date: 'Oct 15, 2026', activities: [] },
  { day: 3, date: 'Oct 16, 2026', activities: [] }
];

const Program = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedType, setSelectedType] = useState('All Session Types');
  const [selectedLocation, setSelectedLocation] = useState('Location');

  const tracks = ['All Tracks', 'General', 'Artificial Intelligence', 'Networking', 'Renewable Energy', 'Data Science'];
  const sessionTypes = ['All Session Types', 'Opening Ceremony', 'Keynote', 'Break', 'Panel Discussion', 'Interactive Workshop'];
  const locations = ['Location', 'Main Auditorium, Hall A', 'Exhibition Hall B', 'Symposium Room 2', 'Workshop Lab 4'];

  const currentDayData = scheduleData.find(d => d.day === activeDay);

  const filteredActivities = useMemo(() => {
    if (!currentDayData) return [];
    return currentDayData.activities.filter(act => {
      const matchesTrack = selectedTrack === 'All Tracks' || act.track === selectedTrack;
      const matchesType = selectedType === 'All Session Types' || act.type === selectedType;
      const matchesLocation = selectedLocation === 'Location' || act.location === selectedLocation;
      return matchesTrack && matchesType && matchesLocation;
    });
  }, [activeDay, selectedTrack, selectedType, selectedLocation]);

  return (
    <div className="text-start bg-white min-h-screen">
      {/* Breadcrumbs - Left-aligned between navbar and hero */}
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span className="text-[#023047] font-semibold">Program</span>
        </nav>
      </div>

      <div className="app-container">
        <div className="rounded-2xl overflow-hidden bg-white">
          <Hero
            title="Conference Program"
            description="Explore the full schedule of sessions, keynotes, and panels across all three days of the International Scientific Conference 2026."
            height="min-h-[35vh]"
            maxWidth="max-w-3xl mx-auto text-center"
            isLight={true}
            overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)"
          />
        </div>
      </div>

      <main className="app-container py-12">
        {/* Day Selector */}
        <div className="flex flex-wrap gap-4 mb-10">
          {scheduleData.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`flex flex-col items-center justify-center w-40 py-4 rounded-xl transition-all ${
                activeDay === d.day 
                ? 'bg-[#17A2B8] text-white' 
                : 'bg-[#E9F7F8] text-[#023047] hover:bg-[#dcf3f4]'
              }`}
            >
              <span className="text-base font-semibold">Day {d.day}</span>
              <span className={`text-xs ${activeDay === d.day ? 'text-white/80' : 'text-gray-500'}`}>{d.date}</span>
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mr-2">Filter by:</span>
          <FilterDropdown 
            value={selectedTrack} 
            options={tracks} 
            onChange={setSelectedTrack} 
          />
          <FilterDropdown 
            value={selectedType} 
            options={sessionTypes} 
            onChange={setSelectedType} 
          />
          <FilterDropdown 
            value={selectedLocation} 
            options={locations} 
            onChange={setSelectedLocation} 
          />
        </div>

        <hr className="border-gray-100 mb-12" />

        {/* Schedule List */}
        <div className="space-y-12">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 lg:gap-16">
                {/* Time Column */}
                <div className="w-full md:w-32 pt-2 text-start md:text-end shrink-0">
                  <div className="text-xl font-semibold text-[#023047]">{activity.startTime}</div>
                  <div className="text-sm font-semibold text-gray-400">{activity.endTime}</div>
                </div>

                {/* Card Column */}
                <div className={`flex-grow p-8 rounded-3xl transition-all duration-300 border border-transparent hover:border-[#17A2B8] bg-white ${
                  activity.isLive 
                  ? 'shadow-xl shadow-[#17A2B8]/5 ring-1 ring-[#17A2B8]/10' 
                  : 'shadow-sm border-gray-50'
                }`}>
                  {/* Top Labels */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      {activity.isLive && (
                        <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-semibold uppercase tracking-widest rounded-full flex items-center gap-2 animate-pulse">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          Live Now
                        </span>
                      )}
                      <span className="px-4 py-1.5 bg-[#E9F7F8] text-[#17A2B8] text-[10px] font-semibold uppercase tracking-widest rounded-lg flex items-center gap-2">
                        {activity.icon && <activity.icon size={12} />}
                        {activity.type}
                      </span>
                    </div>
                    {activity.track && activity.track !== 'General' && activity.track !== 'Networking' && (
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-md">
                        {activity.track}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl lg:text-3xl font-semibold text-[#023047] mb-4 leading-tight">
                    {activity.title}
                  </h2>
                  
                  {activity.description && (
                    <p className="text-gray-500 text-sm lg:text-base leading-relaxed mb-8 max-w-4xl">
                      {activity.description}
                    </p>
                  )}

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-[#17A2B8] font-semibold text-sm">
                      <IconPin size={16} />
                      {activity.location}
                    </div>

                    {activity.speakers.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {activity.speakers.map((speaker, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-3 bg-[#E9F7F8] pl-2 pr-4 py-1.5 rounded-xl group transition-colors cursor-pointer">
                            <img src={speaker.image} alt={speaker.name} className="w-8 h-8 rounded-full object-cover border-2 border-white" />
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
              <div className="text-gray-300 mb-6">
                <IconSearch size={64} />
              </div>
              <h3 className="text-xl font-semibold text-[#023047] mb-2">No sessions found</h3>
              <p className="text-gray-500">Try selecting a different day or clearing your filters.</p>
              <button 
                onClick={() => {
                  setSelectedTrack('All Tracks');
                  setSelectedType('All Session Types');
                  setSelectedLocation('Location');
                }}
                className="mt-6 text-[#17A2B8] font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-4 bg-white rounded-xl text-[#023047] font-semibold hover:bg-gray-50 transition-all">
            <IconDownload size={20} />
            Download Full PDF Schedule
          </button>
        </div>
      </main>
    </div>
  );
};

export default Program;
