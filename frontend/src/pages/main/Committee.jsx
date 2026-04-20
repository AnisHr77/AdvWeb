import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconMail from '../../components/icons/Mail';
import IconLinkedin from '../../components/icons/Linkedin';
import IconSearch from '../../components/icons/Search';
import IconGlobe from '../../components/icons/Globe';
import IconPin from '../../components/icons/Pin';

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
    <div className="relative flex-shrink-0 w-full sm:w-44" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-md text-[#023047] text-xs font-semibold transition-all duration-200 hover:bg-gray-50 text-start`}
      >
        <span className="truncate">{value}</span>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white border border-gray-100 rounded-md shadow-sm animate-in fade-in zoom-in duration-200 origin-top">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-start text-xs transition-colors ${
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

const executiveLeadership = [
  {
    role: 'GENERAL CHAIR',
    name: 'Prof. Heinrich Muller',
    institution: 'ETH Zurich, Department of Physics',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    role: 'CO-CHAIR',
    name: 'Dr. Eleanor Vance',
    institution: 'Stanford University',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

const organizingMembers = [
  { role: 'PROGRAM CHAIR', name: 'Dr. Wei Chen', institution: 'Tsinghua University', country: 'China', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'PUBLICATIONS CHAIR', name: 'Dr. Priya Sharma', institution: 'Indian Institute of Science', country: 'India', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'FINANCE CHAIR', name: 'Prof. Marcus Thorne', institution: 'Oxford University', country: 'United Kingdom', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'LOCAL ARRANGEMENTS', name: 'Dr. Sofia Martinez', institution: 'University of Geneva', country: 'Switzerland', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'SPONSORSHIP CHAIR', name: 'Dr. Amir Hassan', institution: 'KAUST', country: 'Saudi Arabia', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'PUBLICITY CHAIR', name: 'Prof. Nia Adebayo', institution: 'University of Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'WEB CHAIR', name: "Dr. James O'Connor", institution: 'MIT', country: 'United States', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400&h=400' },
  { role: 'WORKSHOP CHAIR', name: 'Dr. Clara Schmidt', institution: 'Max Planck Institute', country: 'Germany', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400' }
];

const Committee = () => {
  const [activeTab, setActiveTab] = useState('Organizing Committee');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Organizing Committee', 'Scientific Committee', 'Advisory Board'];

  return (
    <div className="text-start bg-white min-h-screen">
      {/* Breadcrumbs - Left-aligned between navbar and hero */}
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span className="text-[#023047] font-semibold">Committee</span>
        </nav>
      </div>

      <div className="app-container">
        <div className="rounded-md overflow-hidden bg-white">
          <Hero
            title="Conference Committees"
            description="Meet the distinguished academic leaders, researchers, and organizers shaping the vision and rigor of the International Scientific Conference 2026."
            height="min-h-[35vh]"
            maxWidth="max-w-3xl mx-auto text-center"
            isLight={true}
            overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)"
          />
        </div>
      </div>

      <main className="app-container py-12">
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-[#6B7280] text-sm leading-relaxed">
            The success of ISC 2026 is driven by the dedication of our global committees. The Organizing Committee 
            ensures a seamless experience for all attendees, while the Scientific Committee upholds the highest 
            standards of academic excellence through rigorous peer review and program curation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-16 border-b border-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-semibold transition-all relative ${
                activeTab === tab 
                ? 'text-[#17A2B8]' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#17A2B8] rounded-full animate-in fade-in duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Search & Filters Row */}
        <div className="bg-[#FBFDFE] p-6 rounded-2xl mb-16 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search committee members..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-md text-[#023047] text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <FilterDropdown value="All Roles" options={['All Roles', 'Chair', 'Member']} onChange={() => {}} />
            <FilterDropdown value="Region" options={['Region', 'Europe', 'North America', 'Asia', 'Africa']} onChange={() => {}} />
          </div>
        </div>

        {/* Executive Leadership */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-[#023047] text-center mb-12">Executive Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveLeadership.map((member, idx) => (
              <div key={idx} className="p-8 bg-white rounded-md border border-[#17A2B8]/40 shadow-lg shadow-[#17A2B8]/5 hover:border-[#17A2B8] transition-all duration-300 group">
                <div className="flex items-center gap-8">
                  <div className="shrink-0 relative">
                    <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest mb-1 block">{member.role}</span>
                    <h3 className="text-xl font-semibold text-[#023047] mb-2">{member.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <IconPin size={14} className="text-gray-300" />
                      {member.institution}
                    </div>
                    <div className={`flex items-center gap-2 text-xs text-gray-500`}>
                      <IconGlobe size={14} className="text-gray-300" />
                      {member.country}
                    </div>
                    <div className="flex items-center gap-3 mt-4 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:text-[#17A2B8] transition-colors"><IconMail size={16} /></button>
                      <button className="p-1.5 hover:text-[#17A2B8] transition-colors"><IconLinkedin size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organizing Members */}
        <div>
          <h2 className="text-2xl font-semibold text-[#023047] text-center mb-12">Organizing Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {organizingMembers.map((member, idx) => (
              <div key={idx} className="p-8 bg-white rounded-md border border-gray-200 shadow-sm hover:border-[#17A2B8] transition-all duration-300 group text-center flex flex-col items-center">
                <img src={member.image} alt={member.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm mb-6" />
                <span className="text-[9px] font-semibold text-[#17A2B8] uppercase tracking-widest mb-2">{member.role}</span>
                <h3 className="text-base font-semibold text-[#023047] mb-1">{member.name}</h3>
                <div className="text-[10px] text-gray-500 mb-1 leading-tight">{member.institution}</div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1">
                  <IconGlobe size={10} className="text-gray-300" />
                  {member.country}
                </div>
                <div className="flex items-center justify-center gap-4 mt-6 opacity-30 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:text-[#17A2B8] transition-colors"><IconMail size={14} /></button>
                  <button className="p-1 hover:text-[#17A2B8] transition-colors"><IconLinkedin size={14} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 bg-white text-[#17A2B8] font-semibold rounded-md hover:bg-gray-50 transition-all shadow-md shadow-[#17A2B8]/5 border border-[#06B6D4]">
              Load other members
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Committee;
