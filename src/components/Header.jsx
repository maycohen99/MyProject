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
    <header className="flex justify-between items-center py-6 mb-4 border-b border-white/5">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5 group transition-opacity">
          <div className="bg-gradient-to-br from-[rgba(0,240,255,0.15)] to-[rgba(157,78,221,0.15)] text-[var(--color-primary)] p-2.5 rounded-[var(--radius-md)] border border-[var(--color-primary)]/30 group-hover:border-[var(--color-primary)]/80 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
            <LayoutDashboard size={22} className="group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <h1 className="text-2xl font-black font-display m-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-inverse-primary)] bg-clip-text text-transparent tracking-tight">
            TlushSmart
          </h1>
        </Link>
      </div>
      <div className="text-slate-400 text-base flex items-center gap-3 select-none">
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
                className="bg-black/40 border border-[var(--color-primary)]/30 text-white rounded px-2 py-0.5 text-sm focus:outline-none focus:border-[var(--color-primary)] w-24 text-center font-bold"
                autoFocus
              />
            </div>
          ) : (
            <span 
              onClick={() => setIsEditing(true)}
              className="font-bold text-slate-100 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-inverse-primary)] bg-clip-text text-transparent cursor-pointer hover:opacity-85 transition-all flex items-center gap-1 group/name"
              title="לחץ כדי לשנות שם"
            >
              {name}
              <Edit2 size={12} className="text-slate-500 opacity-0 group-hover/name:opacity-100 transition-opacity ml-1 inline-block" />
            </span>
          )}
        </div>
        <div className="w-px h-4 bg-white/10"></div>
        <button 
          onClick={handleLogout}
          className="text-slate-500 hover:text-[var(--color-error)] transition-colors p-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 flex items-center justify-center"
          title="התנתקות מהמערכת"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
