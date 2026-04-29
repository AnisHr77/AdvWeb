import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Logo from '../icons/Logo';
import ButtonSingle from './ButtonSingle';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/speakers', label: 'Speakers' },
  { to: '/program', label: 'Program' },
  { to: '/committee', label: 'Committee' },
  { to: '/about', label: 'About' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('conference_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
    
    const handleStorage = () => {
      const u = localStorage.getItem('conference_user');
      setUser(u ? JSON.parse(u) : null);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    window.addEventListener('storage', handleStorage);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('conference_user');
    setUser(null);
    setUserDropdownOpen(false);
    navigate('/');
  };

  const UserMenu = () => (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
        className="flex items-center group focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#17A2B8] font-bold shadow-sm transition-all group-hover:border-[#17A2B8]/40 group-hover:shadow-md">
          {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
        </div>
      </button>

      {userDropdownOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 animate-scale-up z-50">
          <div className="px-5 py-4 border-b border-gray-50 mb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
            <p className="text-sm font-bold text-[#0B1F3A] truncate">{user?.fullName}</p>
            <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
          </div>
          
          <Link to="/certificate" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-[#E9F7F8] hover:text-[#17A2B8] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            My Certificate
          </Link>
          
          <Link to="/track-paper" onClick={() => setUserDropdownOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-[#E9F7F8] hover:text-[#17A2B8] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Track Submission
          </Link>

          <div className="mt-2 pt-2 border-t border-gray-50 px-2">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="app-container h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ backgroundColor: '#0B4F6C' }}>
            <Logo width={20} height={20} fill="#ffffff" alt="ISC 2026 Logo" />
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: '#0B1F3A' }}>ISC 2026</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ to, label }) => (
            <NavLink key={label} to={to} end={to === '/'} className={({ isActive }) => `px-4 py-2 text-[0.9375rem] font-medium rounded-md transition-colors ${isActive ? 'text-primary-dark font-semibold' : 'text-text-secondary hover:text-primary-dark'}`}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            {user ? <UserMenu /> : <ButtonSingle label="Register Now" to="/register" />}
          </div>

          <button className="md:hidden p-2 rounded-lg text-text-muted hover:bg-bg-light transition" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-5 py-4 flex flex-col gap-1">
          {user && (
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-4">
              <div className="w-12 h-12 rounded-full bg-[#17A2B8] text-white flex items-center justify-center font-bold text-lg">{user.fullName[0].toUpperCase()}</div>
              <div>
                <p className="text-sm font-bold text-[#0B1F3A]">{user.fullName}</p>
                <button onClick={handleLogout} className="text-xs font-semibold text-red-500">Sign Out</button>
              </div>
            </div>
          )}
          {navLinks.map(({ to, label }) => (
            <NavLink key={label} to={to} end={to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => `px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium transition ${isActive ? 'bg-primary-dark/10 text-primary-dark font-semibold' : 'text-text-secondary hover:text-primary-dark hover:bg-bg-light'}`}>
              {label}
            </NavLink>
          ))}
          {!user && (
            <div className="mt-3">
              <ButtonSingle label="Register Now" to="/register" className="w-full" onClick={() => setMenuOpen(false)} />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
