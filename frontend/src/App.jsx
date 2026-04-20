import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

const registerFooterProps = {
  ctaBg: '#0B1F3A',
  ctaTitle: 'Present Your Research',
  ctaDescription: 'Have groundbreaking research to share? Submit your paper to be reviewed by our distinguished scientific committee and join the official program.',
  ctaButtons: [
    { to: '/submit-paper', label: 'Submit Paper', variant: 'primary' },
    { to: '/guidelines', label: 'Author Guidelines', variant: 'outline' },
  ],
};

function Layout() {
  const location = useLocation();
  const isRegister = location.pathname === '/register';
  const footerProps = isRegister ? registerFooterProps : {};

  return (
    <div className="min-h-screen bg-bg-light flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/speakers/:id" element={<SpeakerDetails />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/program" element={<Program />} />
          <Route path="/register" element={<Register />} />
          <Route path="/submit-paper" element={<SubmitPaper />} />
          <Route path="/track-paper" element={<TrackPaper />} />
          <Route path="/certificate" element={<CertificateCheck />} />
          <Route
            path="*"
            element={
              <main className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
                <h1 className="text-6xl font-bold text-indigo-600">404</h1>
                <p className="text-gray-500 mt-3 text-lg">Page not found.</p>
                <a href="/" className="mt-6 text-indigo-600 hover:underline">← Go Home</a>
              </main>
            }
          />
        </Routes>
      </div>
      <Footer {...footerProps} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
