import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../icons/Logo';
import ButtonSingle from './ButtonSingle';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/committee', label: 'Themes' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/program', label: 'Program' },
  { to: '/committee', label: 'About' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* inner row — uses same .app-container as every page */}
      <div className="app-container h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center"
            style={{ backgroundColor: '#0B4F6C' }}
          >
            <Logo width={20} height={20} fill="#ffffff" alt="ISC 2026 Logo" />
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: '#0B1F3A' }}>
            ISC 2026
          </span>
        </NavLink>

        {/* ── Desktop center nav ── */}
        <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-[0.9375rem] font-medium rounded-md transition-colors ${isActive
                  ? 'text-primary-dark font-semibold'
                  : 'text-text-secondary hover:text-primary-dark'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Right: CTA + Mobile toggle ── */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ButtonSingle label="Register Now" to="/register" />
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-text-muted hover:bg-bg-light transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-5 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium transition ${isActive
                  ? 'bg-primary-dark/10 text-primary-dark font-semibold'
                  : 'text-text-secondary hover:text-primary-dark hover:bg-bg-light'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="mt-3">
            <ButtonSingle
              label="Register Now"
              to="/register"
              className="w-full"
              onClick={() => setMenuOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
