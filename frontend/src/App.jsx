import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

// Pages
import Home from './pages/main/Home';
import Speakers from './pages/main/Speakers';
import SpeakerDetails from './pages/main/SpeakerDetails';
import Committee from './pages/main/Committee';
import Program from './pages/main/Program';
import Register from './pages/main/Register';
import SubmitPaper from './pages/main/SubmitPaper';
import TrackPaper from './pages/main/TrackPaper';
import CertificateCheck from './pages/main/CertificateCheck';
import About from './pages/main/About';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminSpeakers from './pages/admin/Speakers';
import AdminSubmissions from './pages/admin/Submissions';
import Agenda from './pages/admin/Agenda';
import Registrations from './pages/admin/Registrations';
import Certificates from './pages/admin/Certificates';
import Settings from './pages/admin/Settings';
import Logout from './pages/admin/Logout';

const registerFooterProps = {
  ctaBg: '#0B1F3A',
  ctaTitle: 'Present Your Research',
  ctaDescription: 'Have groundbreaking research to share? Submit your paper to be reviewed by our distinguished scientific committee and join the official program.',
  ctaButtons: [
    { to: '/submit-paper', label: 'Submit Paper', variant: 'primary' },
    { to: '/guidelines', label: 'Author Guidelines', variant: 'outline' },
  ],
};

const submitFooterProps = {
  ctaBg: '#0B1F3A',
  ctaTitle: 'Not Registered Yet?',
  ctaDescription: 'Authors of accepted papers must register for the conference to present their work and have it included in the official proceedings.',
  ctaButtons: [{ to: '/register', label: 'Register Now', variant: 'primary', icon: 'user' }],
};

const trackFooterProps = {
  ctaBg: '#0B1F3A',
  ctaTitle: 'Have more research to share?',
  ctaDescription: 'You can submit multiple papers under different tracks. Be sure to submit before the deadline on October 15, 2025.',
  ctaButtons: [
    { to: '/submit-paper', label: 'Submit Another Paper', variant: 'primary' },
    { to: '/register', label: 'Register Now', variant: 'outline' },
  ],
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

function Layout() {
  const location = useLocation();
  const isSpecialFooter = location.pathname === '/register' || location.pathname === '/about';
  const isSubmitFooter = location.pathname === '/submit-paper';
  const isTrackFooter = location.pathname === '/track-paper';
  const footerProps = isTrackFooter ? trackFooterProps : isSubmitFooter ? submitFooterProps : isSpecialFooter ? registerFooterProps : {};

  return (
    <div className="min-h-screen bg-bg-light flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/speakers/:id" element={<SpeakerDetails />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/about" element={<About />} />
          <Route path="/program" element={<Program />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit-paper" element={<SubmitPaper />} />
          <Route path="/track-paper" element={<TrackPaper />} />
          <Route path="/certificate" element={<CertificateCheck />} />
          <Route path="*" element={
            <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
              <h1 className="text-6xl font-bold text-indigo-600">404</h1>
              <p className="text-gray-500 mt-3 text-lg">Page not found.</p>
              <a href="/" className="mt-6 text-indigo-600 hover:underline">← Go Home</a>
            </main>
          }/>
        </Routes>
      </div>
      <Footer {...footerProps} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Admin Routes ── */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/speakers" element={<ProtectedRoute><AdminSpeakers /></ProtectedRoute>} />
        <Route path="/admin/submissions" element={<ProtectedRoute><AdminSubmissions /></ProtectedRoute>} />
        <Route path="/admin/agenda" element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
        <Route path="/admin/registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />
        <Route path="/admin/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/admin/logout" element={<Logout />} />
        
        {/* ── Public Routes ── */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
