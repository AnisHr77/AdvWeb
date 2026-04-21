import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconAI from '../../components/icons/AI';
import IconEnergy from '../../components/icons/Energy';
import IconData from '../../components/icons/Data';
import IconSecurity from '../../components/icons/Security';
import IconFlask from '../../components/icons/Flask';
import IconGlobe from '../../components/icons/Globe';
import IconSearch from '../../components/icons/Search';
import IconStar from '../../components/icons/Star';

/* ─── Data ─── */
const themes = [
  { icon: <IconAI size={22} />, title: 'Artificial Intelligence', description: 'Exploring machine learning, neural networks, ethics in AI, and applications in automation and autonomous systems.' },
  { icon: <IconEnergy size={22} />, title: 'Renewable Energy', description: 'Advances in solar, wind, and alternative energy sources, focusing on sustainability and global grid optimisation.' },
  { icon: <IconData size={22} />, title: 'Data Science', description: 'Big data analytics, predictive modeling, data visualization, and the intersection of data with public policy.' },
  { icon: <IconSecurity size={22} />, title: 'Cybersecurity', description: 'Protecting digital infrastructure, cryptography, blockchain technologies, and privacy in the digital age.' },
  { icon: <IconFlask size={22} />, title: 'Biotechnology', description: 'Innovations in healthcare, genetic engineering, bioinformatics, and biomedical engineering applications.' },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="7" height="9" rx="1"/><rect x="15" y="3" width="7" height="5" rx="1"/>
        <rect x="15" y="12" width="7" height="9" rx="1"/><rect x="2" y="16" width="7" height="5" rx="1"/>
      </svg>
    ),
    title: 'Quantum Computing',
    description: 'Quantum algorithms, hardware developments, and the future implications of quantum supremacy on secure communications.'
  },
];

const stats = [
  { value: '150+', label: 'International Speakers' },
  { value: '65', label: 'Participating Countries' },
  { value: '800+', label: 'Submitted Papers' },
  { value: '42', label: 'Interactive Sessions' },
];

const reasons = [
  { icon: <IconGlobe size={20} />, title: 'Learn from Global Experts', description: 'Attend keynotes and masterclasses led by world-renowned scientists and industry leaders at the forefront of their fields.' },
  { icon: <IconSearch size={20} />, title: 'Discover Latest Research', description: 'Be the first to hear about groundbreaking studies and unreleased papers before they are published in major academic journals.' },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Build Your Academic Network',
    description: 'Connect with peers, potential mentors, and collaborators during dedicated networking sessions, gala dinners, and workshops.'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Present Your Own Work',
    description: 'Showcase your research to a highly relevant and engaged audience, receive constructive feedback, and boost your academic profile.'
  },
];

const timeline = [
  { date: 'January 15, 2026', title: 'Call for Papers Opens', description: 'The official submission portal opens. Authors can begin uploading their abstracts and full research papers.', side: 'left' },
  { date: 'April 30, 2026', title: 'Paper Submission Deadline', description: 'Final date to submit papers for the peer-review process. Late submissions will not be considered.', side: 'right' },
  { date: 'June 15, 2026', title: 'Acceptance Notification', description: 'Authors will be notified regarding the status of their submissions and provided with reviewer feedback.', side: 'left' },
  { date: 'July 1, 2026', title: 'Early Bird Registration Closes', description: 'Last day to secure discounted tickets for both presenters and general attendees.', side: 'right' },
  { date: 'October 13–15, 2026', title: 'Conference Dates', description: 'The main event takes place in Geneva, Switzerland. Four days of keynotes, sessions, and networking.', side: 'left' },
];

const partners = ['Global Tech Institute', 'European Science Org', 'Univ. of Research', 'Tech Innovators Ltd.', 'Academic Press'];

/* ─── Component ─── */
const About = () => (
  <div className="text-start bg-white min-h-screen">

    {/* Breadcrumbs */}
    <div className="app-container border-b border-gray-50/50">
      <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
        <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
        <span className="opacity-40">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </span>
        <span className="text-[#023047] font-semibold">About the Conference</span>
      </nav>
    </div>

    {/* Hero */}
    <div className="app-container">
      <div className="rounded-md overflow-hidden bg-white">
        <Hero
          title="About the Conference"
          description="A global platform for scientific exchange, innovation, and collaboration bringing together the brightest minds across multiple disciplines."
          height="min-h-[28vh]"
          maxWidth="max-w-3xl"
          isLight={true}
          overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)"
        />
      </div>
    </div>

    {/* ─── Intro Section ─── */}
    <section className="app-container py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-3xl font-semibold text-[#023047] mb-8 leading-snug">Fostering Global Scientific Advancement</h2>
          <div className="space-y-5 text-sm text-[#6B7280] leading-relaxed">
            <p>
              The International Scientific Conference (ISC) 2026 is a premier academic event designed to facilitate the exchange of ideas and present the latest discoveries in technology and applied sciences. Our goal is to bridge the gap between theoretical research and practical industry applications.
            </p>
            <p>
              By gathering leading researchers, esteemed academics, and visionary professionals from over 60 countries, we create an environment ripe for collaboration. Whether you're presenting groundbreaking research or attending to learn from international experts, ISC 2026 offers an unparalleled opportunity to engage with the global scientific community.
            </p>
          </div>
          <Link to="/committee" className="inline-flex items-center gap-2 mt-10 text-sm font-semibold text-[#17A2B8] hover:underline transition-all">
            View Committee Members
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
        <div className="rounded-md overflow-hidden shadow-lg shadow-[#023047]/5">
          <img
            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=900&h=620"
            alt="Conference gathering"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* ─── Mission & Vision Cards ─── */}
    <section className="app-container pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-10 border border-[#17A2B8]/20 rounded-md shadow-sm bg-white hover:border-[#17A2B8] transition-all duration-300">
          <div className="w-12 h-12 bg-[#E9F7F8] rounded-md flex items-center justify-center text-[#17A2B8] mb-6">
            <IconGlobe size={22} />
          </div>
          <h3 className="text-xl font-semibold text-[#023047] mb-3">Our Mission</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            To provide a dynamic and inclusive platform where researchers from diverse backgrounds can share their findings, challenge existing paradigms, and foster international collaborations that drive tangible scientific progress.
          </p>
        </div>
        <div className="p-10 border border-[#17A2B8]/20 rounded-md shadow-sm bg-white hover:border-[#17A2B8] transition-all duration-300">
          <div className="w-12 h-12 bg-[#E9F7F8] rounded-md flex items-center justify-center text-[#17A2B8] mb-6">
            <IconSearch size={22} />
          </div>
          <h3 className="text-xl font-semibold text-[#023047] mb-3">Our Vision</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            To be the world's leading interdisciplinary scientific forum that consistently catalyses innovative solutions to global challenges by seamlessly connecting academic research with industry implementation.
          </p>
        </div>
      </div>
    </section>

    {/* ─── Key Scientific Themes ─── */}
    <section className="py-24 bg-white">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#023047] mb-4">Key Scientific Themes</h2>
          <p className="text-sm text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            The conference covers a wide array of disciplines, focusing on areas with the highest potential for impact.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {themes.map((theme, idx) => (
            <div key={idx} className="p-8 border border-gray-100 rounded-md shadow-sm hover:border-[#17A2B8] transition-all duration-300 group">
              <div className="w-11 h-11 bg-[#E9F7F8] rounded-md flex items-center justify-center text-[#17A2B8] mb-6 group-hover:scale-110 transition-transform">
                {theme.icon}
              </div>
              <h3 className="text-base font-semibold text-[#023047] mb-2">{theme.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{theme.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Stats Bar ─── */}
    <section className="py-20 bg-[#0B1F3A]">
      <div className="app-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-5xl font-semibold text-[#17A2B8] mb-2">{stat.value}</div>
              <div className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Why Attend ─── */}
    <section className="py-24 bg-white">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-[#023047] mb-4">Why You Should Attend</h2>
          <p className="text-sm text-[#6B7280]">Join thousands of your peers for three days of intensive learning and networking.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reasons.map((r, idx) => (
            <div key={idx} className="flex gap-5 group">
              <div className="w-12 h-12 shrink-0 bg-[#E9F7F8] rounded-md flex items-center justify-center text-[#17A2B8] group-hover:scale-110 transition-transform">
                {r.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#023047] mb-1">{r.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Important Dates Timeline ─── */}
    <section className="py-24 bg-[#FBFDFE]">
      <div className="app-container">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-semibold text-[#023047] mb-4">Important Dates</h2>
          <p className="text-sm text-[#6B7280]">Mark your calendars for these crucial milestones leading up to the conference.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#17A2B8]/20" />

          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex items-start gap-8 ${item.side === 'right' ? 'flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`w-5/12 ${item.side === 'right' ? 'text-start' : 'text-end'}`}>
                  <span className="text-[10px] font-semibold text-[#17A2B8] uppercase tracking-widest block mb-1">{item.date}</span>
                  <h3 className="text-base font-semibold text-[#023047] mb-1">{item.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{item.description}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#17A2B8] rounded-sm rotate-45 top-1 shadow-md shadow-[#17A2B8]/30" />

                {/* Empty side */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ─── Organizing Partners ─── */}
    <section className="py-16 bg-white border-t border-gray-50">
      <div className="app-container">
        <h2 className="text-2xl font-semibold text-[#023047] text-center mb-12">Organizing Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map((partner, idx) => (
            <span key={idx} className="text-sm font-semibold text-[#6B7280] hover:text-[#17A2B8] transition-colors cursor-pointer">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
