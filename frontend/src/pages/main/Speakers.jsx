import { Link } from 'react-router-dom';

const mockSpeakers = [
  { id: 1, name: 'Dr. Alice Martin', topic: 'AI in Web Development', country: 'USA' },
  { id: 2, name: 'Prof. Karim Benali', topic: 'Distributed Systems', country: 'France' },
  { id: 3, name: 'Dr. Yuki Tanaka', topic: 'WebAssembly & Performance', country: 'Japan' },
  { id: 4, name: 'Dr. Sara Osei', topic: 'Cybersecurity Trends', country: 'Ghana' },
];

const Speakers = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Speakers</h1>
      <p className="text-gray-500 mb-10">
        Meet our distinguished keynote and invited speakers for AdvWeb 2025.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mockSpeakers.map((speaker) => (
          <Link
            key={speaker.id}
            to={`/speakers/${speaker.id}`}
            className="block p-6 border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 transition"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">
              {speaker.name.charAt(0)}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{speaker.name}</h2>
            <p className="text-sm text-indigo-600 mt-1">{speaker.topic}</p>
            <p className="text-sm text-gray-400 mt-1">{speaker.country}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Speakers;
