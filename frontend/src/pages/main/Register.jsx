import { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', affiliation: '', type: 'author' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registration Received!</h1>
        <p className="text-gray-500">Thank you, <strong>{form.name}</strong>. A confirmation will be sent to <strong>{form.email}</strong>.</p>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Register</h1>
      <p className="text-gray-500 mb-8">Register to attend AdvWeb 2025.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Dr. Jane Doe' },
          { label: 'Email Address', name: 'email', type: 'email', placeholder: 'jane@university.edu' },
          { label: 'Affiliation', name: 'affiliation', type: 'text', placeholder: 'University / Company' },
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Participant Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="author">Author</option>
            <option value="attendee">Attendee</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Submit Registration
        </button>
      </form>
    </main>
  );
};

export default Register;
