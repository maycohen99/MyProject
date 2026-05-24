import { useState, useEffect } from 'react';
import { LayoutDashboard, Edit2, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [name, setName] = useState('מאי');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('מאי');

  useEffect(() => {
    const handleNameChange = () => {
      const savedName = localStorage.getItem('userName');
      if (savedName) {
        setName(savedName);
        setTempName(savedName);
      }
    };
    window.addEventListener('userNameChanged', handleNameChange);
    handleNameChange();
    return () => window.removeEventListener('userNameChanged', handleNameChange);
  }, []);

  const handleSave = () => {
    if (tempName.trim()) {
      setName(tempName);
      localStorage.setItem('userName', tempName);
      window.dispatchEvent(new Event('userNameChanged'));
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.dispatchEvent(new Event('authStatusChanged'));
  };

  return (
    <header className="flex justify-between items-center py-6 mb-4 border-b border-[var(--color-outline)]">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group transition-opacity">
          <div className="bg-[var(--color-primary-container)] text-[var(--color-primary)] p-2.5 rounded-xl border border-[rgba(198,106,85,0.2)] group-hover:scale-105 transition-transform duration-300">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight m-0 text-[var(--color-secondary)] font-display">
            Tlush<span className="text-[var(--color-primary)] font-normal italic">Smart</span>
          </h1>
        </Link>
      </div>
      <div className="text-[var(--color-on-surface-variant)] text-sm font-medium flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5">
          <span>שלום,</span>
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className="bg-white border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] rounded-md px-2 py-0.5 text-xs focus:outline-none focus:border-[var(--color-primary)] w-24 text-center font-bold"
                autoFocus
              />
            </div>
          ) : (
            <span 
              onClick={() => setIsEditing(true)}
              className="text-[var(--color-primary)] font-bold cursor-pointer hover:text-[var(--color-coral)] transition-colors underline decoration-1 decoration-[var(--color-primary)]/40 hover:decoration-[var(--color-coral)]/40 flex items-center gap-1 group/name"
              title="לחץ כדי לשנות שם"
            >
              {name}
              <Edit2 size={10} className="text-[var(--color-on-surface-variant)] opacity-0 group-hover/name:opacity-100 transition-opacity ml-1 inline-block" />
            </span>
          )}
        </div>
        <div className="w-px h-3.5 bg-[var(--color-outline-variant)]/60"></div>
        <button 
          onClick={handleLogout}
          className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-coral)] transition-colors p-1.5 hover:bg-[var(--color-primary-container)] rounded-full flex items-center justify-center"
          title="התנתקות מהמערכת"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
