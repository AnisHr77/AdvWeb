import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONFERENCE_DATE = new Date('2026-10-14T09:00:00');

const useCountdown = (targetDate) => {
  const getTimeLeft = () => {
    const diff = targetDate - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
};

/* ── static network SVG rendered on right side ── */
const NetworkBackground = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
    viewBox="0 0 900 500"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* connection lines */}
    {[
      [520,80,680,160],[680,160,800,90],[680,160,750,280],[750,280,860,310],
      [750,280,680,400],[680,400,800,440],[680,160,580,260],[580,260,680,400],
      [580,260,480,340],[480,340,580,430],[480,340,360,390],[580,260,620,140],
      [620,140,760,60],[800,90,860,160],[860,160,860,310],[520,80,620,140],
      [480,340,400,240],[400,240,520,80],[400,240,300,300],[300,300,360,390],
    ].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.6" />
    ))}
    {/* nodes */}
    {[
      [520,80,4],[680,160,6],[800,90,3],[750,280,5],[860,310,3],
      [680,400,4],[800,440,3],[580,260,5],[480,340,4],[580,430,3],
      [360,390,3],[620,140,4],[760,60,3],[860,160,3],[400,240,4],[300,300,3],
    ].map(([cx,cy,r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="#38bdf8" fillOpacity="0.85" />
    ))}
    {/* larger accent nodes */}
    {[[680,160],[750,280],[580,260]].map(([cx,cy], i) => (
      <circle key={`a${i}`} cx={cx} cy={cy} r={10}
        fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.3" />
    ))}
  </svg>
);

const CountdownBox = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center w-20 h-20 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
    <span className="text-2xl font-bold text-white leading-none">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-[10px] tracking-widest text-sky-300 mt-1 uppercase">{label}</span>
  </div>
);

const Home = () => {
  const { days, hours, mins, secs } = useCountdown(CONFERENCE_DATE);

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a2540 0%, #0d3d5c 50%, #0a4a6e 100%)' }}
    >
      {/* network SVG overlay */}
      <NetworkBackground />

      {/* gradient overlay — fade right side for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a2540]/90 via-[#0a2540]/60 to-transparent pointer-events-none" />

      {/* content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-24 w-full">
        <div className="max-w-2xl">

          {/* title */}
          <h1 className="text-4xl md:text-[3.2rem] font-extrabold text-white leading-tight mb-5">
            International Scientific<br />Conference 2026
          </h1>

          {/* subtitle */}
          <p className="text-base text-sky-100/80 leading-relaxed mb-7 max-w-lg">
            Bridging the gap between global innovation, groundbreaking research, and
            international collaboration in the modern scientific era.
          </p>

          {/* meta — date & location */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-sky-200 mb-8">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              October 14–16, 2026
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Geneva, Switzerland
            </span>
          </div>

          {/* countdown */}
          <div className="flex items-center gap-3 mb-10">
            <CountdownBox value={days} label="Days" />
            <CountdownBox value={hours} label="Hours" />
            <CountdownBox value={mins} label="Mins" />
            <CountdownBox value={secs} label="Secs" />
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="px-6 py-3 bg-sky-400 hover:bg-sky-300 text-[#0a2540] font-semibold rounded-lg transition-colors text-sm"
            >
              Register Now
            </Link>
            <Link
              to="/submit-paper"
              className="px-6 py-3 border border-white/40 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors text-sm backdrop-blur-sm"
            >
              Submit Paper
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;
