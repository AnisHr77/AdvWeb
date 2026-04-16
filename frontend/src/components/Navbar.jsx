import { NavLink } from 'react-router-dom';
import { useState } from 'react';

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-md bg-[#1a3a4a] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="text-[#1a3a4a] font-bold text-lg tracking-tight">ISC 2026</span>
        </NavLink>

        {/* Desktop center nav */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-[#1a3a4a] font-semibold'
                    : 'text-gray-500 hover:text-[#1a3a4a]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/register"
            className="hidden md:inline-flex items-center px-5 py-2 bg-[#1a3a4a] text-white text-sm font-semibold rounded-lg hover:bg-[#14303e] transition-colors"
          >
            Register Now
          </NavLink>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
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

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#1a3a4a]/10 text-[#1a3a4a] font-semibold'
                    : 'text-gray-500 hover:text-[#1a3a4a] hover:bg-gray-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-3 px-4 py-2.5 bg-[#1a3a4a] text-white text-sm font-semibold rounded-lg text-center hover:bg-[#14303e] transition"
          >
            Register Now
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
