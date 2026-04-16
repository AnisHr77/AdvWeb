import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
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
        <footer className="text-center text-xs text-gray-400 py-6 border-t border-gray-200">
          © 2025 AdvWeb Conference. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
