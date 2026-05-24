import { useState } from 'react';
import { Lock, User, LayoutDashboard, ArrowLeft } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('נא להזין שם משתמש');
      return;
    }
    setError('');
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', userName.trim());
    window.dispatchEvent(new Event('authStatusChanged'));
    if (onLoginSuccess) onLoginSuccess(userName.trim());
  };

  const handleQuickLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'מאי');
    window.dispatchEvent(new Event('authStatusChanged'));
    if (onLoginSuccess) onLoginSuccess('מאי');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-4 py-12">
      {/* Avant-Garde Background Glow Accent */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[radial-gradient(circle,rgba(43,92,255,0.06)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#141416] border-2 border-[#27272a] shadow-[6px_6px_0px_0px_#27272a] p-8 sm:p-10 rounded-none relative z-10">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-[var(--color-primary)] text-white p-3 rounded-none border-2 border-black shadow-[3px_3px_0px_#d0c4ff] mb-4">
            <LayoutDashboard size={28} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase font-display">
            Tlush<span className="text-[var(--color-primary)]">Smart</span> AI
          </h1>
          <p className="text-slate-400 text-xs mt-2 font-bold tracking-wider uppercase">מערכת חכמה לניתוח זכויות עובדים</p>
        </div>

        {error && (
          <div className="bg-black border-2 border-[var(--color-error)] text-[var(--color-error)] text-xs rounded-none p-3 mb-6 text-center font-black uppercase tracking-wider">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mr-1">שם משתמש</label>
            <div className="relative">
              <input
                type="text"
                placeholder="הזן שם משתמש..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-4 pr-11 py-3.5 rounded-none bg-black border-2 border-[#27272a] text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-primary)] text-sm font-bold transition-all"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mr-1">סיסמה</label>
            <div className="relative">
              <input
                type="password"
                placeholder="הזן סיסמה..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-3.5 rounded-none bg-black border-2 border-[#27272a] text-white placeholder-slate-600 focus:outline-none focus:border-[var(--color-primary)] text-sm font-bold transition-all"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            </div>
          </div>

          <button
            type="submit"
            className="avant-btn-cobalt w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-none font-black text-xs uppercase tracking-widest"
          >
            <span>התחברות</span>
            <ArrowLeft size={16} />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t-2 border-[#27272a]"></div>
          <span className="px-3 text-[10px] text-slate-500 font-black tracking-widest uppercase">או</span>
          <div className="flex-1 border-t-2 border-[#27272a]"></div>
        </div>

        {/* Quick Connect */}
        <button
          onClick={handleQuickLogin}
          className="avant-btn-tangerine w-full flex items-center justify-center gap-2 py-3.5 rounded-none font-black text-xs uppercase tracking-widest"
        >
          <span>התחברות מהירה כמאי</span>
        </button>

      </div>
    </div>
  );
}
