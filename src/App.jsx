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
      <div className="min-h-screen flex flex-col items-center pb-20 relative bg-[#faf6ee] overflow-hidden">
        {/* Beautiful Floating Soft Organic Accent Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-[radial-gradient(circle,rgba(198,106,85,0.06)_0%,transparent_70%)] pointer-events-none rounded-full blur-[60px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] bg-[radial-gradient(circle,rgba(62,86,67,0.05)_0%,transparent_70%)] pointer-events-none rounded-full blur-[60px]"></div>
        <div className="absolute top-[35%] right-[-15%] w-[35vw] h-[35vw] bg-[radial-gradient(circle,rgba(212,163,89,0.04)_0%,transparent_70%)] pointer-events-none rounded-full blur-[60px]"></div>

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
