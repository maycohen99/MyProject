import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Report from './pages/Report';
import ActionCenter from './pages/ActionCenter';
import Login from './pages/Login';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    
    window.addEventListener('authStatusChanged', checkAuth);
    checkAuth();
    
    return () => window.removeEventListener('authStatusChanged', checkAuth);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center pb-20 relative bg-[#09090b] grid-bg overflow-hidden">
        {/* Stark Asymmetric High-Contrast Accents */}
        <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-[radial-gradient(circle,rgba(43,92,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(255,92,0,0.04)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="w-full max-w-[var(--spacing-container-max)] px-[var(--spacing-gutter)] relative z-10">
          {isLoggedIn ? (
            <>
              <Header />
              <main className="py-[var(--spacing-md)]">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/report" element={<Report />} />
                  <Route path="/action-center" element={<ActionCenter />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
        {isLoggedIn && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
