import { useState } from 'react';

const mockPapers = {
  'ADV-001': { title: 'Deep Learning for Web Accessibility', status: 'Under Review', track: 'AI' },
  'ADV-002': { title: 'Scalable WebSocket Architectures', status: 'Accepted', track: 'Web Technologies' },
  'ADV-003': { title: 'Zero-Trust Security in SPAs', status: 'Rejected', track: 'Cybersecurity' },
};

const statusStyles = {
  'Under Review': 'bg-amber-100 text-amber-700',
  'Accepted': 'bg-green-100 text-green-700',
  'Rejected': 'bg-red-100 text-red-600',
};

const TrackPaper = () => {
  const [paperId, setPaperId] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    setResult(mockPapers[paperId.toUpperCase()] || null);
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Track Paper</h1>
      <p className="text-gray-500 mb-8">Enter your submission ID to check the status of your paper.</p>
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          placeholder="e.g. ADV-001"
          value={paperId}
          onChange={(e) => setPaperId(e.target.value)}
          required
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Track
        </button>
      </form>

      {searched && (
        <div className="mt-8">
          {result ? (
            <div className="border border-gray-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900">{result.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Track: {result.track}</p>
              <span className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[result.status]}`}>
                {result.status}
              </span>
            </div>
          ) : (
            <p className="text-red-500 text-sm mt-4">No paper found with ID "<strong>{paperId}</strong>".</p>
          )}
        </div>
      )}
    </main>
  );
};

export default TrackPaper;
