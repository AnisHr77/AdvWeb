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


/* ── Theme data ── */
const themes = [
  {
    title: 'Artificial Intelligence',
    description: 'Advancements in machine learning, neural networks, and ethical AI deployment.',
    bgIcon: '#E9F7F8',
    icon: <IconAI />,
  },
  {
    title: 'Renewable Energy',
    description: 'Sustainable technologies, green energy solutions, and climate change mitigation.',
    bgIcon: '#E9F7F8',
    icon: <IconEnergy />,
  },
  {
    title: 'Data Science',
    description: 'Big data analytics, predictive modeling, and statistical breakthroughs.',
    bgIcon: '#E9F7F8',
    icon: <IconData />,
  },
  {
    title: 'Cybersecurity',
    description: 'Next-generation cryptography, network security, and digital privacy.',
    bgIcon: '#E9F7F8',
    icon: <IconSecurity />,
  },
];

const featuredSpeakers = [
  {
    name: 'Dr. Sarah Jenkins',
    title: 'Prof. of Computer Science',
    institution: 'MIT',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    tag: 'Artificial Intelligence',
    note: 'Keynote: The Future of Neural Architectures',
    variant: 'simple'
  },
  {
    name: 'Dr. Kenji Tanaka',
    title: 'Director of Energy',
    institution: 'Kyoto Univ.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    note: 'Session: Solid-State Battery Innovations',
    variant: 'simple'
  },
  {
    name: 'Prof. Amina Diop',
    title: 'Lead Researcher',
    institution: 'Data Institute',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=400',
    note: 'Session: Predictive Analytics in Healthcare',
    variant: 'simple'
  },
  {
    name: 'Dr. Robert Hayes',
    title: 'Chief Cryptographer',
    institution: 'TechSecure',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    note: 'Workshop: Quantum-Resistant Encryption',
    variant: 'simple'
  }
];

const programActivities = [
  {
    time: '09:00 - 10:00',
    title: 'Opening Ceremony & Welcome Address',
    description: 'Official commencement of the conference and opening remarks by the organizing committee.',
    speaker: 'Organizing Committee',
    speakerImage: null,
  },
  {
    time: '10:15 - 11:30',
    title: 'Keynote: The Future of Neural Architectures',
    description: 'Exploring next-generation AI models and their implications for cognitive computing.',
    speaker: 'Dr. Sarah Jenkins',
    speakerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    time: '11:45 - 13:00',
    title: 'Panel: Ethical Implications of Big Data',
    description: 'A multidisciplinary panel discussing privacy, bias, and regulation in data science.',
    speaker: 'Prof. Amina Diop (Mod)',
    speakerImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400&h=400',
  },
  {
    time: '14:30 - 15:45',
    title: 'Solid-State Battery Innovations',
    description: 'Recent breakthroughs in material science for energy storage and sustainability.',
    speaker: 'Dr. Kenji Tanaka',
    speakerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
  }
];

const IconMicrophone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

/* ── Page ── */
const Home = () => (
  <>
    {/* ── Hero Section ── */}
    <Hero
      title={<>International Scientific<br />Conference 2026</>}
      description="Bridging the gap between global innovation, groundbreaking research, and international collaboration in the modern scientific era."
      image={heroImg}
      height="min-h-[calc(100vh-80px)]"
    >
      {/* date & location */}
      <div className="flex flex-wrap items-center gap-6 text-sm mb-8 text-white/90">
        <span className="flex items-center gap-2"><IconCalendar />October 14–16, 2026</span>
        <span className="flex items-center gap-2"><IconPin />Geneva, Switzerland</span>
      </div>

      {/* countdown */}
      <div className="mb-10"><Countdown /></div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/register"
          className="px-7 py-3.5 text-md text-white rounded-sm transition-colors font-semibold"
          style={{ backgroundColor: '#17A2B8' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#138496')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#17A2B8')}
        >
          Register Now
        </Link>
        <Link
          to="/submit-paper"
          className="px-7 py-3 text-md text-white rounded-sm transition-colors border font-semibold"
          style={{ backgroundColor: 'rgba(11,78,107,0.20)', borderColor: '#17A2B8' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(11,78,107,0.35)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(11,78,107,0.20)')}
        >
          Submit Paper
        </Link>
      </div>
    </Hero>

    {/* ── Key Scientific Themes Section ── */}
    <section className="bg-white py-20">
      <div className="app-container">
        {/* heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-main mb-5">Key Scientific Themes</h2>
          <p className="text-text-secondary/98 font-normal max-w-md mx-auto text-md leading-relaxed">
            Explore the core topics shaping the future of global research and technology.
          </p>
        </div>

        {/* cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {themes.map((t) => (
            <Card
              key={t.title}
              icon={t.icon}
              bgIcon={t.bgIcon}
              title={t.title}
              description={t.description}
            />
          ))}
        </div>
      </div>
    </section>

    {/* ── About the Conference Section ── */}
    <section className="py-24" style={{ backgroundColor: '#E9F7F8' }}>
      <div className="app-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-8" style={{ color: 'var(--primary-dark)' }}>About the Conference</h2>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
              <p>
                The International Scientific Conference 2026 brings together the
                world's leading academic scientists, researchers, and scholars
                to exchange and share their experiences and research results on
                all aspects of modern science.
              </p>
              <p>
                It provides a premier interdisciplinary platform for researchers,
                practitioners, and educators to present and discuss the most
                recent innovations, trends, and concerns as well as practical
                challenges encountered and solutions adopted.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3.5 mt-10 rounded-sm text-white font-bold transition-colors"
              style={{ backgroundColor: '#0B4F6C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0B4F6C98')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0B4F6C')}
            >
              Learn More About Us
            </Link>
          </div>


          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard value="150+" label="Global Speakers" />
            <StatCard value="45" label="Participating Countries" />
            <StatCard value="300+" label="Research Papers" />
            <StatCard value="5k+" label="Attendees Expected" />
          </div>
        </div>
      </div>
    </section>

    {/* ── Featured Speakers Section ── */}
    <section className="bg-white py-24">
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Featured Speakers</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Hear from industry leaders and distinguished academics from top institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredSpeakers.map((speaker, idx) => (
            <SpeakerCard key={idx} {...speaker} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/speakers"
            className="px-8 py-3 rounded-md font-bold transition-all text-[#0B4F6C] bg-[#E9F7F8] hover:bg-[#D9EFF1]"
          >
            View All Speakers
          </Link>
        </div>
      </div>
    </section>

    {/* ── Program Preview Section ── */}
    <section className="py-24" style={{ backgroundColor: 'var(--useful)' }}>
      <div className="app-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Program Preview</h2>
          <p className="text-gray-500 text-lg">Day 1: October 14, 2026 (Main Stage)</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 mb-20">
          {programActivities.map((activity, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-sm transition-all bg-white border-2 border-transparent shadow-sm hover:border-[#17A2B8] hover:shadow-xl hover:z-10"
            >
              {/* Time */}
              <div className="w-full md:w-40 flex-shrink-0 text-[#0B4F6C] font-bold text-lg">
                {activity.time}
              </div>

              {/* Info */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">{activity.title}</h3>
                <p className="text-gray-500 text-md leading-relaxed">{activity.description}</p>
              </div>

              {/* Speaker */}
              <div className="w-full md:w-56 flex items-center gap-3">
                {activity.speakerImage ? (
                  <img 
                    src={activity.speakerImage} 
                    alt={activity.speaker} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner flex-shrink-0">
                    <IconMicrophone />
                  </div>
                )}
                <span className="text-sm font-bold text-[#0B1F3A] leading-tight">
                  {activity.speaker}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/program"
            className="px-10 py-4 rounded-lg font-bold text-white transition-all shadow-lg hover:shadow-xl active:scale-95"
            style={{ backgroundColor: '#0B4F6C' }}
          >
            View Full Program
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Home;

