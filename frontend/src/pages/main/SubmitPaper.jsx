import { useState } from 'react';

const SubmitPaper = () => {
  const [form, setForm] = useState({ title: '', authors: '', abstract: '', track: 'web', file: null });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const val = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">📄</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paper Submitted!</h1>
        <p className="text-gray-500">Your paper "<strong>{form.title}</strong>" has been received. Track it under <a href="/track-paper" className="text-indigo-600 hover:underline">Track Paper</a>.</p>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Submit Paper</h1>
      <p className="text-gray-500 mb-8">Submit your research paper for AdvWeb 2025 review.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: 'Paper Title', name: 'title', type: 'text', placeholder: 'Enter full paper title' },
          { label: 'Author(s)', name: 'authors', type: 'text', placeholder: 'Jane Doe, John Smith' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              required
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
          <textarea
            name="abstract"
            required
            rows={4}
            placeholder="Brief summary of your paper..."
            value={form.abstract}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Track</label>
          <select
            name="track"
            value={form.track}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="web">Web Technologies</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="security">Cybersecurity</option>
            <option value="distributed">Distributed Systems</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
          <input
            type="file"
            name="file"
            accept=".pdf"
            required
            onChange={handleChange}
            className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Submit Paper
        </button>
      </form>
    </main>
  );
};

export default SubmitPaper;
