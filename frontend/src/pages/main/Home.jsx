import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.jpg';
import Countdown from '../../components/ui/Countdown';

const Home = () => (
  <section
    className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden"
    style={{
      backgroundImage: `url(${heroImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* gradient overlay — #093B57 → #093B55 */}
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(135deg, rgba(9,59,87,0.82) 0%, rgba(9,59,85,0.85) 100%)',
      }}
    />




    {/* content */}
    <div className="relative z-10 app-container py-24 w-full">
      <div className="max-w-2xl">

        <h1 className="text-4xl md:text-[3.2rem] font-bold text-white leading-tight mb-7">
          International Scientific<br />Conference 2026
        </h1>

        <p className="text-base leading-relaxed mb-7 max-w-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Bridging the gap between global innovation, groundbreaking research, and
          international collaboration in the modern scientific era.
        </p>

        {/* date & location */}
        <div className="flex flex-wrap items-center gap-6 text-sm mb-8" style={{ color: 'rgba(255,255,255,0.88)' }}>
          <span className="flex items-center gap-2">
            <CalendarIcon />
            October 14–16, 2026
          </span>
          <span className="flex items-center gap-2">
            <PinIcon />
            Geneva, Switzerland
          </span>
        </div>

        {/* countdown */}
        <div className="mb-10">
          <Countdown />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link
            to="/register"
            className="px-7 py-3.5 text-md  text-white rounded-sm transition-colors"
            style={{ backgroundColor: '#17A2B8' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#138496')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#17A2B8')}
          >
            Register Now
          </Link>
          <Link
            to="/submit-paper"
            className="px-7 py-3 text-md  text-white rounded-sm transition-colors border"
            style={{ backgroundColor: 'rgba(11,78,107,0.20)', borderColor: '#17A2B8' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(11,78,107,0.35)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(11,78,107,0.20)')}
          >
            Submit Paper
          </Link>
        </div>

      </div>
    </div>
  </section>
);

/* ── Inline tiny helpers to keep JSX readable ── */
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const NetworkSVG = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
    viewBox="0 0 900 500"
    preserveAspectRatio="xMidYMid slice"
  >
    {[
      [520, 80, 680, 160], [680, 160, 800, 90], [680, 160, 750, 280], [750, 280, 860, 310],
      [750, 280, 680, 400], [680, 400, 800, 440], [680, 160, 580, 260], [580, 260, 680, 400],
      [580, 260, 480, 340], [480, 340, 580, 430], [480, 340, 360, 390], [580, 260, 620, 140],
      [620, 140, 760, 60], [800, 90, 860, 160], [860, 160, 860, 310], [520, 80, 620, 140],
      [480, 340, 400, 240], [400, 240, 520, 80], [400, 240, 300, 300], [300, 300, 360, 390],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#06B6D4" strokeWidth="0.8" strokeOpacity="0.7" />
    ))}
    {[
      [520, 80, 4], [680, 160, 6], [800, 90, 3], [750, 280, 5], [860, 310, 3],
      [680, 400, 4], [800, 440, 3], [580, 260, 5], [480, 340, 4], [580, 430, 3],
      [360, 390, 3], [620, 140, 4], [760, 60, 3], [860, 160, 3], [400, 240, 4], [300, 300, 3],
    ].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="#06B6D4" fillOpacity="0.85" />
    ))}
    {[[680, 160], [750, 280], [580, 260]].map(([cx, cy], i) => (
      <circle key={`a${i}`} cx={cx} cy={cy} r={10} fill="none" stroke="#06B6D4" strokeWidth="1" strokeOpacity="0.3" />
    ))}
  </svg>
);

export default Home;
