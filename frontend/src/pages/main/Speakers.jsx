import React, { useState, useMemo } from 'react';
import Hero from '../../components/ui/Hero';
import SpeakerCard from '../../components/ui/SpeakerCard';
import heroImg from '../../assets/hero.jpg';
import IconSearch from '../../components/icons/Search';
import IconFlask from '../../components/icons/Flask';
import IconGlobe from '../../components/icons/Globe';

const mockSpeakersList = [
  {
    name: 'Dr. Alice Martin',
    title: 'Assistant Professor',
    institution: 'Stanford University',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Web Development',
    country: 'USA',
    bio: 'Specializing in high-performance web architectures and the integration of AI within the browser environment.',
    variant: 'detailed'
  },
  {
    name: 'Prof. Karim Benali',
    title: 'Systems Architect',
    institution: 'CNRS France',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Distributed Systems',
    country: 'France',
    bio: 'Leading researcher in large-scale distributed databases and fault-tolerant cloud infrastructure.',
    variant: 'detailed'
  },
  {
    name: 'Dr. Yuki Tanaka',
    title: 'Senior Engineer',
    institution: 'Keio University',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Performance',
    country: 'Japan',
    bio: 'Pioneer in WebAssembly optimization and its practical applications in modern scientific computing.',
    variant: 'detailed'
  },
  {
    name: 'Dr. Sara Osei',
    title: 'Cybersecurity Analyst',
    institution: 'Cyber Institute',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Cybersecurity',
    country: 'Canada',
    bio: 'Expert in cryptographic protocols and privacy-preserving technologies in global communication networks.',
    variant: 'detailed'
  },
  {
    name: 'Prof. Sofia Rodriguez',
    title: 'AI Lab Director',
    institution: 'Tech Madrid',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Artificial Intelligence',
    country: 'Spain',
    bio: 'Focusing on ethical AI implementation and neural network efficiency in embedded systems.',
    variant: 'detailed'
  },
  {
    name: 'Dr. Liam Chen',
    title: 'Lead Scientist',
    institution: 'BioData Labs',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Data Science',
    country: 'Singapore',
    bio: 'Pioneering work in large-scale genomic data analysis and predictive health modeling.',
    variant: 'detailed'
  }
];

const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-shrink-0 w-full sm:w-56" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 pl-4 pr-10 py-3 bg-[#E9F7F8] border ${isOpen ? 'border-[#17A2B8] ring-4 ring-[#17A2B8]/5' : 'border-gray-200'} rounded-md text-[#023047] text-sm font-medium transition-all duration-200 hover:border-[#17A2B8]/50 shadow-sm text-start`}
      >
        <div className="text-gray-400">
          <Icon size={18} />
        </div>
        <span className="truncate">{value}</span>
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 py-2 bg-white border border-gray-100 rounded-md shadow-xl animate-in fade-in zoom-in duration-200 origin-top">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-start text-sm transition-colors ${
                value === option 
                ? 'bg-[#dcf3f4] text-[#17A2B8] font-semibold' 
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

const Speakers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All Themes');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');

  const themes = ['All Themes', 'Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Web Development', 'Distributed Systems', 'Performance'];
  const countries = ['All Countries', 'USA', 'France', 'Japan', 'Canada', 'Spain', 'Singapore'];

  const filteredSpeakers = useMemo(() => {
    return mockSpeakersList.filter(speaker => {
      const matchesSearch = 
        speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speaker.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speaker.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTheme = selectedTheme === 'All Themes' || speaker.tag === selectedTheme;
      const matchesCountry = selectedCountry === 'All Countries' || speaker.country === selectedCountry;

      return matchesSearch && matchesTheme && matchesCountry;
    });
  }, [searchQuery, selectedTheme, selectedCountry]);

  return (
    <div className="text-start">
      <Hero
        title="Our Speakers"
        description="Meet our distinguished keynote and invited speakers for AdvWeb 2026."
        image={heroImg}
        height="min-h-[45vh]"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Speakers' }
        ]}
      />
      
      <main className="app-container py-12">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-10">
          {/* Search Box */}
          <div className="relative flex-grow w-full lg:w-auto">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search speakers by name or topic..."
              className="w-full pl-12 pr-4 py-3 bg-[#E9F7F8] border border-gray-200 rounded-md text-[#023047] placeholder-gray-400 focus:outline-none focus:border-[#17A2B8] focus:ring-4 focus:ring-[#17A2B8]/5 transition-all shadow-sm text-start"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <FilterDropdown 
              label="Theme"
              value={selectedTheme}
              options={themes}
              onChange={setSelectedTheme}
              icon={IconFlask}
            />
            <FilterDropdown 
              label="Country"
              value={selectedCountry}
              options={countries}
              onChange={setSelectedCountry}
              icon={IconGlobe}
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-black/5 mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSpeakers.map((speaker, idx) => (
            <SpeakerCard key={idx} {...speaker} />
          ))}
        </div>

        {filteredSpeakers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="text-gray-400 mb-4">
              <IconSearch size={48} />
            </div>
            <h3 className="text-lg font-bold text-[#023047] mb-2">No speakers found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedTheme('All Themes');
                setSelectedCountry('All Countries');
              }}
              className="mt-6 text-[#17A2B8] font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Speakers;
