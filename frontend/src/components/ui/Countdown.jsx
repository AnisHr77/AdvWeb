import { useState, useEffect } from 'react';

const DEFAULT_DATE = new Date('2026-10-14T09:00:00');

/* ── Hook ── */
export const useCountdown = (targetDate = DEFAULT_DATE) => {
  const calc = () => {
    const diff = targetDate - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
};

/* ── Single box ── */
const Box = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center w-24 h-24 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
    <span className="text-3xl font-bold text-white leading-none">
      {String(value).padStart(2, '0')}
    </span>
    <span
      className="text-[12px] tracking-widest mt-2 uppercase"
      style={{ color: 'rgba(255,255,255,0.5)' }}
    >
      {label}
    </span>
  </div>
);

/* ── Default export: full countdown row ── */
const Countdown = ({ targetDate = DEFAULT_DATE }) => {
  const { days, hours, mins, secs } = useCountdown(targetDate);
  return (
    <div className="flex items-center gap-6">
      <Box value={days} label="Days" />
      <Box value={hours} label="Hours" />
      <Box value={mins} label="Mins" />
      <Box value={secs} label="Secs" />
    </div>
  );
};

export default Countdown;
