import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Report from './pages/Report';
import ActionCenter from './pages/ActionCenter';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center pb-20 relative bg-[#07080d] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(157,78,221,0.12)_0%,rgba(7,8,13,0)_70%)] pointer-events-none rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,240,255,0.1)_0%,rgba(7,8,13,0)_70%)] pointer-events-none rounded-full blur-[80px]"></div>
        <div className="absolute top-[30%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,127,0.08)_0%,rgba(7,8,13,0)_70%)] pointer-events-none rounded-full blur-[80px]"></div>

        <div className="w-full max-w-[var(--spacing-container-max)] px-[var(--spacing-gutter)] relative z-10">
          <Header />
          <main className="py-[var(--spacing-md)]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/report" element={<Report />} />
              <Route path="/action-center" element={<ActionCenter />} />
            </Routes>
          </main>
        </div>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
