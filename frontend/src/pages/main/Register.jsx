import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/ui/Hero';
import IconMail from '../../components/icons/Mail';
import IconPhone from '../../components/icons/Phone';
import IconGlobe from '../../components/icons/Globe';
import IconFlask from '../../components/icons/Flask';
import IconStar from '../../components/icons/Star';
import IconUser from '../../components/icons/User';
import IconBuilding from '../../components/icons/Building';
import IconBriefcase from '../../components/icons/Briefcase';
import IconChat from '../../components/icons/Chat';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    country: 'Select Country',
    type: 'Select Type',
    requirements: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-lg mx-auto px-6 py-32 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-6xl mb-8 flex justify-center">✅</div>
        <h1 className="text-3xl font-semibold text-[#023047] mb-3">Registration Successful!</h1>
        <p className="text-[#6B7280] text-lg leading-relaxed">
          Thank you, <strong className="text-[#17A2B8]">{form.fullName}</strong>. A confirmation email and registration kit will be sent to <strong>{form.email}</strong> shortly.
        </p>
        <Link to="/" className="mt-10 inline-block px-10 py-4 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20">
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <div className="text-start bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="app-container border-b border-gray-50/50">
        <nav className="flex items-center justify-start gap-2 text-sm text-gray-400 py-6">
          <Link to="/" className="hover:text-[#023047] transition-colors">Home</Link>
          <span className="opacity-40">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span className="text-[#023047] font-semibold">Register</span>
        </nav>
      </div>

      <div className="app-container">
        <div className="rounded-md overflow-hidden bg-white">
          <Hero
            title="Register for the Conference"
            description="Join thousands of leading researchers, academic pioneers, and industry experts from around the world. Secure your attendance for ISC 2026 today."
            height="min-h-[35vh]"
            maxWidth="max-w-3xl mx-auto text-center"
            isLight={true}
            overlayColor="linear-gradient(180deg, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 100%)"
          />
        </div>
      </div>

      <main className="app-container py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side Info */}
          <div className="space-y-16 lg:pr-12">
            <div>
              <h2 className="text-3xl font-semibold text-[#023047] mb-6">Why Attend ISC 2026?</h2>
              <p className="text-[#6B7280] leading-relaxed mb-12 max-w-lg text-sm">
                The International Scientific Conference is the premier gathering for academic minds. Experience three days of intensive learning and networking.
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-5 group items-center">
                  <div className="w-14 h-14 shrink-0 bg-[#E9F7F8] rounded-xl flex items-center justify-center text-[#17A2B8] shadow-sm"><IconGlobe size={24} /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#023047] mb-0.5">Global Networking</h3>
                    <p className="text-xs text-gray-400">Collaborate with peers from top universities worldwide.</p>
                  </div>
                </div>
                <div className="flex gap-5 group items-center">
                  <div className="w-14 h-14 shrink-0 bg-[#E9F7F8] rounded-xl flex items-center justify-center text-[#17A2B8] shadow-sm"><IconFlask size={24} /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#023047] mb-0.5">Cutting-edge Research</h3>
                    <p className="text-xs text-gray-400">Gain access to exclusive pre-published papers.</p>
                  </div>
                </div>
                <div className="flex gap-5 group items-center">
                  <div className="w-14 h-14 shrink-0 bg-[#E9F7F8] rounded-xl flex items-center justify-center text-[#17A2B8] shadow-sm"><IconStar size={24} /></div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#023047] mb-0.5">World-class Speakers</h3>
                    <p className="text-xs text-gray-400">Award-winning scientists and renowned leaders.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-50 flex flex-wrap gap-12">
              <div><div className="text-5xl font-semibold text-[#17A2B8]">50+</div><div className="text-[10px] text-gray-400 uppercase tracking-widest">Countries</div></div>
              <div><div className="text-5xl font-semibold text-[#17A2B8]">120+</div><div className="text-[10px] text-gray-400 uppercase tracking-widest">Speakers</div></div>
              <div><div className="text-5xl font-semibold text-[#17A2B8]">400+</div><div className="text-[10px] text-gray-400 uppercase tracking-widest">Papers</div></div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-12 rounded-3xl shadow-2xl shadow-[#17A2B8]/10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-[#023047] mb-2">Participant Details</h2>
            <p className="text-gray-400 text-sm mb-10">Please fill in the information below to secure your spot.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Full Name <span className="text-red-400">*</span></label>
                  <div className="relative group">
                    <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                    <input
                      type="text" name="fullName" required placeholder="Dr. Jane Doe"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all"
                      value={form.fullName} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Email Address <span className="text-red-400">*</span></label>
                  <div className="relative group">
                    <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                    <input
                      type="email" name="email" required placeholder="jane.doe@university.edu"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all font-medium"
                      value={form.email} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Phone Number</label>
                  <div className="relative group">
                    <IconPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                    <input
                      type="text" name="phone" placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all font-medium"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Institution */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Institution <span className="text-red-400">*</span></label>
                  <div className="relative group">
                    <IconBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                    <input
                      type="text" name="institution" required placeholder="e.g., Stanford University"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all font-medium"
                      value={form.institution} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Country <span className="text-red-400">*</span></label>
                  <div className="relative group">
                    <IconGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                    <select
                      name="country" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm text-[#023047] focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all appearance-none font-medium"
                      value={form.country} onChange={handleChange}
                    >
                      <option disabled>Select Country</option>
                      <option>Switzerland</option>
                      <option>United States</option>
                      <option>China</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Type */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Type <span className="text-red-400">*</span></label>
                  <div className="relative group">
                    <IconBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                    <select
                      name="type" className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm text-[#023047] focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all appearance-none font-medium"
                      value={form.type} onChange={handleChange}
                    >
                      <option disabled>Select Type</option>
                      <option>Author</option>
                      <option>Attendee</option>
                      <option>Student</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2.5">
                <label className="block text-[10px] font-semibold text-[#023047] uppercase tracking-widest">Special Requirements (Optional)</label>
                <div className="relative group">
                  <IconChat className="absolute left-4 top-4 text-gray-300 group-focus-within:text-[#17A2B8] transition-colors" size={16} />
                  <textarea
                    name="requirements" rows="5" placeholder="Let us know if you have any dietary restrictions, accessibility needs, or other special requirements..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-md text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#17A2B8]/10 focus:border-[#17A2B8]/20 transition-all font-medium leading-relaxed"
                    value={form.requirements} onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded text-[#17A2B8] border-gray-300 focus:ring-[#17A2B8]/20 transition-all cursor-pointer" required id="consent" />
                <label htmlFor="consent" className="text-xs text-gray-400 leading-relaxed font-medium cursor-pointer">
                  I agree to the <Link to="/terms" className="text-[#17A2B8] hover:underline">Terms & Conditions</Link> and the <Link to="/privacy" className="text-[#17A2B8] hover:underline">Privacy Policy</Link>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-[#17A2B8] text-white font-semibold rounded-md hover:bg-[#138496] transition-all shadow-lg shadow-[#17A2B8]/20 active:scale-[0.98] flex items-center justify-center gap-3 text-md"
              >
                Complete Registration
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>

              <p className="text-center text-[11px] text-gray-400 font-medium">Your information is secure and encrypted.</p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
