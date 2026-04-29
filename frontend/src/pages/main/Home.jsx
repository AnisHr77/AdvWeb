import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg';
import Countdown from '../../components/ui/Countdown';
import Card from '../../components/ui/Card';
import IconAI from '../../components/icons/AI';
import IconEnergy from '../../components/icons/Energy';
import IconData from '../../components/icons/Data';
import IconSecurity from '../../components/icons/Security';
import IconCalendar from '../../components/icons/Calendar';
import IconPin from '../../components/icons/Pin';
import Hero from '../../components/ui/Hero';
import StatCard from '../../components/ui/StatCard';
import SpeakerCard from '../../components/ui/SpeakerCard';
import { speakerAPI, sessionAPI, statsAPI } from '../../services/api';

/* ── Theme data ── */
const themes = [
  { title: 'Artificial Intelligence', description: 'Advancements in machine learning, neural networks, and ethical AI deployment.', bgIcon: '#E9F7F8', icon: <IconAI /> },
  { title: 'Renewable Energy', description: 'Sustainable technologies, green energy solutions, and climate change mitigation.', bgIcon: '#E9F7F8', icon: <IconEnergy /> },
  { title: 'Data Science', description: 'Big data analytics, predictive modeling, and statistical breakthroughs.', bgIcon: '#E9F7F8', icon: <IconData /> },
  { title: 'Cybersecurity', description: 'Next-generation cryptography, network security, and digital privacy.', bgIcon: '#E9F7F8', icon: <IconSecurity /> },
];

const IconMicrophone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const Home = () => {
  const [stats, setStats] = useState({ speakers: '0', countries: '0', submissions: '0', attendeesExpected: '0' });
  const [featuredSpeakers, setFeaturedSpeakers] = useState([]);
  const [programActivities, setProgramActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, speakersData, sessionsData] = await Promise.all([
          statsAPI.getPublic(),
          speakerAPI.getAll({ featured: true, limit: 4 }),
          sessionAPI.getByDay(1, { limit: 4 })
        ]);
        
        setStats({
          speakers: statsData.speakers + '+',
          countries: statsData.countries,
          submissions: statsData.submissions + '+',
          attendeesExpected: (statsData.attendeesExpected / 1000).toFixed(0) + 'k+'
        });
        setFeaturedSpeakers(speakersData);
        setProgramActivities(sessionsData);
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ── Scroll Reveal Logic ──
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
    
    return () => elements.forEach(el => observer.unobserve(el));
  }, [loading, featuredSpeakers, programActivities]);

  return (
    <>
      <Hero
        title={<div className="reveal-visible transition-all duration-1000">International Scientific<br />Conference 2026</div>}
        description={<div className="reveal-visible transition-all duration-1000 delay-100">Bridging the gap between global innovation, groundbreaking research, and international collaboration in the modern scientific era.</div>}
        image={heroImg}
        height="min-h-[calc(100vh-80px)]"
      >
        <div className="flex flex-wrap items-center gap-6 text-sm mb-8 text-white/90 reveal-visible transition-all duration-1000 delay-200">
          <span className="flex items-center gap-2"><IconCalendar />October 14–16, 2026</span>
          <span className="flex items-center gap-2"><IconPin />Geneva, Switzerland</span>
        </div>
        <div className="mb-10 reveal-visible transition-all duration-1000 delay-300"><Countdown /></div>
        <div className="flex flex-wrap gap-4 reveal-visible transition-all duration-1000 delay-500">
          {!localStorage.getItem('conference_user') && (
            <Link to="/register" className="px-7 py-3.5 text-md text-white rounded-sm transition-all font-semibold bg-[#17A2B8] hover:bg-[#138496] hover:shadow-lg hover:-translate-y-0.5">Register Now</Link>
          )}
          <Link to="/submit-paper" className="px-7 py-3 text-md text-white rounded-sm transition-all border font-semibold bg-[rgba(11,78,107,0.20)] border-[#17A2B8] hover:bg-[rgba(11,78,107,0.35)] hover:border-white">Submit Paper</Link>
        </div>
      </Hero>

      <section className="bg-white py-20 overflow-hidden">
        <div className="app-container">
          <div className="text-center mb-12 reveal reveal-hidden">
            <h2 className="text-3xl font-bold text-text-main mb-5">Key Scientific Themes</h2>
            <p className="text-text-secondary/98 font-normal max-w-md mx-auto text-md leading-relaxed">Explore the core topics shaping the future of global research and technology.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((t, i) => (
              <div key={t.title} className={`reveal reveal-hidden stagger-${i + 1}`}>
                <Card icon={t.icon} bgIcon={t.bgIcon} title={t.title} description={t.description} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: '#E9F7F8' }}>
        <div className="app-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-xl reveal reveal-hidden">
              <h2 className="text-4xl font-bold mb-8" style={{ color: 'var(--primary-dark)' }}>About the Conference</h2>
              <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
                <p>The International Scientific Conference 2026 brings together the world's leading academic scientists, researchers, and scholars to exchange and share their experiences and research results on all aspects of modern science.</p>
                <p>It provides a premier interdisciplinary platform for researchers, practitioners, and educators to present and discuss the most recent innovations, trends, and concerns as well as practical challenges encountered and solutions adopted.</p>
              </div>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-3.5 mt-10 rounded-sm text-white font-bold transition-all bg-[#0B4F6C] hover:bg-[#0B3D54] hover:shadow-lg">Learn More About Us</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal reveal-hidden stagger-2">
              <StatCard value={stats.speakers} label="Global Speakers" />
              <StatCard value={stats.countries} label="Participating Countries" />
              <StatCard value={stats.submissions} label="Research Papers" />
              <StatCard value={stats.attendeesExpected} label="Attendees Expected" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="app-container">
          <div className="text-center mb-16 reveal reveal-hidden">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Featured Speakers</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Hear from industry leaders and distinguished academics from top institutions.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featuredSpeakers.length > 0 ? (
              featuredSpeakers.map((speaker, idx) => (
                <div key={idx} className={`reveal reveal-hidden stagger-${(idx % 4) + 1}`}>
                  <SpeakerCard {...speaker} variant="simple" />
                </div>
              ))
            ) : (
              !loading && <p className="col-span-full text-center text-gray-400">No featured speakers yet.</p>
            )}
          </div>
          <div className="flex justify-center reveal reveal-hidden delay-300">
            <Link to="/speakers" className="px-8 py-3 rounded-md font-bold transition-all text-[#0B4F6C] bg-[#E9F7F8] hover:bg-[#D9EFF1] hover:scale-105">View All Speakers</Link>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ backgroundColor: 'var(--useful)' }}>
        <div className="app-container">
          <div className="text-center mb-16 reveal reveal-hidden">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Program Preview</h2>
            <p className="text-gray-500 text-lg">Day 1: October 14, 2026 (Main Stage)</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4 mb-20">
            {programActivities.length > 0 ? (
              programActivities.map((activity, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-sm transition-all bg-white border-2 border-transparent shadow-sm hover:border-[#17A2B8] hover:shadow-xl hover:z-10 group reveal reveal-hidden">
                  <div className="w-full md:w-40 flex-shrink-0 text-[#0B4F6C] font-bold text-lg group-hover:scale-110 transition-transform">{activity.startTime || activity.time}</div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">{activity.title}</h3>
                    <p className="text-gray-500 text-md leading-relaxed">{activity.description}</p>
                  </div>
                  <div className="w-full md:w-56 flex items-center gap-3">
                    {activity.speakers?.[0]?.image ? (
                      <img src={activity.speakers[0]?.image} alt={activity.speakers[0]?.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0 group-hover:border-[#17A2B8]" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner flex-shrink-0"><IconMicrophone /></div>
                    )}
                    <span className="text-sm font-bold text-[#0B1F3A] leading-tight">{activity.speakers?.[0]?.name || activity.speaker || 'TBA'}</span>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p className="text-center text-gray-400">The program is currently being finalized.</p>
            )}
          </div>
          <div className="flex justify-center reveal reveal-hidden"><Link to="/program" className="px-10 py-4 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 bg-[#0B4F6C]" >View Full Program</Link></div>
        </div>
      </section>
    </>
  );
};

export default Home;
