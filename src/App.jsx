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
      <div className="min-h-screen flex flex-col items-center pb-20"> {/* pb-20 prevents content from being hidden by the bottom nav */}
        <div className="w-full max-w-[var(--spacing-container-max)] px-[var(--spacing-gutter)]">
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
