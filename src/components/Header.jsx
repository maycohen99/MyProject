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
    <header className="flex justify-between items-center py-6 mb-4 border-b-2 border-[#27272a]">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group transition-transform hover:-translate-y-0.5 duration-200">
          <div className="bg-[var(--color-primary)] text-white p-2 rounded-none border-2 border-black shadow-[2px_2px_0px_#d0c4ff] group-hover:shadow-[3px_3px_0px_#ff5c00] transition-all">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter m-0 text-white uppercase font-display">
            Tlush<span className="text-[var(--color-primary)]">Smart</span>
          </h1>
        </Link>
      </div>
      <div className="text-slate-300 text-sm font-bold flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5">
          <span className="uppercase text-slate-500 text-xs tracking-widest font-black">USER /</span>
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className="bg-black border-2 border-[var(--color-primary)] text-white rounded-none px-2 py-0.5 text-xs focus:outline-none w-24 text-center font-bold"
                autoFocus
              />
            </div>
          ) : (
            <span 
              onClick={() => setIsEditing(true)}
              className="text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-primary)] transition-colors underline decoration-2 decoration-[var(--color-coral)] font-bold flex items-center gap-1 group/name"
              title="לחץ כדי לשנות שם"
            >
              {name}
              <Edit2 size={10} className="text-slate-500 opacity-0 group-hover/name:opacity-100 transition-opacity ml-1 inline-block" />
            </span>
          )}
        </div>
        <div className="w-0.5 h-3.5 bg-[#27272a]"></div>
        <button 
          onClick={handleLogout}
          className="text-slate-500 hover:text-[var(--color-coral)] transition-colors p-1.5 border-2 border-transparent hover:border-[#27272a] bg-transparent flex items-center justify-center rounded-none"
          title="התנתקות מהמערכת"
        >
          <LogOut size={14} />
        </button>
      </div>
    </header>
  );
}
