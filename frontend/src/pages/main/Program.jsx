const schedule = [
  { time: '09:00 – 09:30', event: 'Opening Ceremony', type: 'ceremony' },
  { time: '09:30 – 10:30', event: 'Keynote: AI in Web Development — Dr. Alice Martin', type: 'keynote' },
  { time: '10:30 – 11:00', event: 'Coffee Break', type: 'break' },
  { time: '11:00 – 12:30', event: 'Session 1: Cloud & Distributed Systems', type: 'session' },
  { time: '12:30 – 14:00', event: 'Lunch Break', type: 'break' },
  { time: '14:00 – 15:30', event: 'Session 2: Web Performance & Security', type: 'session' },
  { time: '15:30 – 16:00', event: 'Coffee Break', type: 'break' },
  { time: '16:00 – 17:00', event: 'Keynote: Cybersecurity Trends — Dr. Sara Osei', type: 'keynote' },
  { time: '17:00 – 17:30', event: 'Closing & Awards', type: 'ceremony' },
];

const typeColors = {
  keynote: 'bg-indigo-50 border-l-4 border-indigo-500',
  session: 'bg-white border-l-4 border-green-400',
  break: 'bg-gray-50 border-l-4 border-gray-300',
  ceremony: 'bg-amber-50 border-l-4 border-amber-400',
};

const Program = () => {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Program</h1>
      <p className="text-gray-500 mb-10">
        Full conference schedule for AdvWeb 2025 — Day 1.
      </p>
      <div className="space-y-3">
        {schedule.map((item) => (
          <div
            key={item.time}
            className={`p-4 rounded-lg ${typeColors[item.type]}`}
          >
            <span className="text-xs font-mono text-gray-400">{item.time}</span>
            <p className="text-gray-800 font-medium mt-1">{item.event}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Program;
