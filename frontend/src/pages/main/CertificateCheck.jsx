import { useState } from 'react';

const mockCertificates = {
  'CERT-2025-001': { name: 'Dr. Alice Martin', type: 'Speaker', event: 'AdvWeb 2025' },
  'CERT-2025-042': { name: 'Mohamed Yacine', type: 'Attendee', event: 'AdvWeb 2025' },
  'CERT-2025-100': { name: 'Prof. Karim Benali', type: 'Best Paper Award', event: 'AdvWeb 2025' },
};

const CertificateCheck = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    setSearched(true);
    setResult(mockCertificates[certId.toUpperCase()] || null);
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Certificate Check</h1>
      <p className="text-gray-500 mb-8">
        Verify the authenticity of an AdvWeb 2025 certificate by entering its ID.
      </p>
      <form onSubmit={handleCheck} className="flex gap-3">
        <input
          type="text"
          placeholder="e.g. CERT-2025-001"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          required
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Verify
        </button>
      </form>

      {searched && (
        <div className="mt-8">
          {result ? (
            <div className="border border-green-300 bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">✅</span>
                <h2 className="text-lg font-semibold text-green-800">Certificate Valid</h2>
              </div>
              <p className="text-gray-700"><span className="font-medium">Holder:</span> {result.name}</p>
              <p className="text-gray-700 mt-1"><span className="font-medium">Type:</span> {result.type}</p>
              <p className="text-gray-700 mt-1"><span className="font-medium">Event:</span> {result.event}</p>
            </div>
          ) : (
            <div className="border border-red-300 bg-red-50 rounded-xl p-6 flex items-center gap-3">
              <span className="text-2xl">❌</span>
              <p className="text-red-700">No certificate found for ID "<strong>{certId}</strong>".</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default CertificateCheck;
