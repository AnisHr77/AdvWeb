import { useState } from 'react';
import { certificateAPI } from '../../services/api';

const CertificateCheck = () => {
  const [certId,   setCertId]   = useState('');
  const [result,   setResult]   = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    setSearched(false);
    setResult(null);
    setError('');
    setLoading(true);
    try {
      const data = await certificateAPI.verify(certId);
      setResult(data);
      setSearched(true);
    } catch (err) {
      setSearched(true);
      setError(err.message || 'Certificate not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Certificate Check</h1>
      <p className="text-gray-500 mb-8">Verify the authenticity of an ISC 2026 certificate by entering its ID.</p>

      <form onSubmit={handleCheck} className="flex gap-3">
        <input type="text" placeholder="e.g. ISC-ATT-2026-001"
          value={certId} onChange={e => setCertId(e.target.value)} required
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/40" />
        <button type="submit" disabled={loading}
          className="bg-[#17A2B8] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-[#138496] transition disabled:opacity-70">
          {loading ? 'Checking…' : 'Verify'}
        </button>
      </form>

      {searched && (
        <div className="mt-8">
          {result && !error ? (
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
