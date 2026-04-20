import React from 'react';
import { Link } from 'react-router-dom';
import IconTwitter from '../icons/Twitter';
import IconLinkedin from '../icons/Linkedin';
import IconYoutube from '../icons/Youtube';
import IconMail from '../icons/Mail';
import IconPhone from '../icons/Phone';
import IconPin from '../icons/Pin';
import IconLogo from '../icons/Logo';

const Footer = ({
  ctaTitle = "Ready to Join the Global Conversation?",
  ctaDescription = "Secure your spot today or submit your research to be featured among the world's leading scientific minds.",
  ctaBg = '#0B4F6C',
  ctaButtons = null,
  showCTA = true
}) => {
  const defaultButtons = (
    <>
      <Link
        to="/register"
        className="px-8 py-3.5 rounded-sm font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
        style={{ backgroundColor: '#17A2B8' }}
      >
        Register Now
      </Link>
      <Link
        to="/submit-paper"
        className="px-8 py-3.5 rounded-sm font-bold border border-white/30 transition-all hover:bg-white/10 active:scale-95"
      >
        Submit Paper
      </Link>
    </>
  );

  const renderButtons = ctaButtons
    ? ctaButtons.map((btn) => (
        <Link
          key={btn.to}
          to={btn.to}
          className={
            btn.variant === 'primary'
              ? 'px-10 py-4 bg-white text-[#0B1F3A] font-semibold rounded-sm hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl shadow-black/10 active:scale-95'
              : 'px-10 py-4 bg-transparent text-white border border-white/30 font-semibold rounded-sm hover:bg-white/5 transition-all active:scale-95'
          }
        >
          {btn.variant === 'primary' && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          )}
          {btn.label}
        </Link>
      ))
    : defaultButtons;

  return (
    <footer className="footer-wrap">
      {/* ── Top CTA Section ── */}
      {showCTA && (
        <section className="py-24 text-center text-white" style={{ backgroundColor: ctaBg }}>
          <div className="app-container">
            <h2 className="text-4xl font-semibold mb-6 tracking-tight">{ctaTitle}</h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              {ctaDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {renderButtons}
            </div>
          </div>
        </section>
      )}

      {/* ── Main Footer Section ── */}
      <div className="bg-[#0B1F3A] text-white/70 py-16">
        <div className="app-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                  <IconLogo />
                </div>
                <span className="text-xl font-bold tracking-tight">ISC 2026</span>
              </div>
              <p className="text-[15px] leading-relaxed max-w-xs">
                Advancing human knowledge through international collaboration, rigorous research, and open scientific discourse.
              </p>
              <div className="flex items-center gap-5">
                <a href="#" className="hover:text-white transition-colors"><IconTwitter /></a>
                <a href="#" className="hover:text-white transition-colors"><IconLinkedin /></a>
                <a href="#" className="hover:text-white transition-colors"><IconYoutube /></a>
              </div>
            </div>

            {/* Conference */}
            <div>
              <h4 className="text-white font-bold mb-8 text-md">Conference</h4>
              <ul className="space-y-4 text-[14px]">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/speakers" className="hover:text-white transition-colors">Key Speakers</Link></li>
                <li><Link to="/program" className="hover:text-white transition-colors">Program Schedule</Link></li>
                <li><Link to="/venue" className="hover:text-white transition-colors">Venue & Travel</Link></li>
                <li><Link to="/sponsorship" className="hover:text-white transition-colors">Sponsorship</Link></li>
              </ul>
            </div>

            {/* Participants */}
            <div>
              <h4 className="text-white font-bold mb-8 text-md">Participants</h4>
              <ul className="space-y-4 text-[14px]">
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><Link to="/submit-paper" className="hover:text-white transition-colors">Submit Paper</Link></li>
                <li><Link to="/guidelines" className="hover:text-white transition-colors">Author Guidelines</Link></li>
                <li><Link to="/dates" className="hover:text-white transition-colors">Important Dates</Link></li>
                <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-8 text-md">Contact</h4>
              <ul className="space-y-5 text-[14px]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 opacity-70"><IconMail /></span>
                  <span>contact@isc2026.org</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 opacity-70"><IconPhone /></span>
                  <span>+41 22 123 4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 opacity-70"><IconPin /></span>
                  <span className="leading-relaxed">Palexpo Exhibition Center<br />Geneva, Switzerland</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] opacity-60">
            <p>© 2026 International Scientific Conference. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
