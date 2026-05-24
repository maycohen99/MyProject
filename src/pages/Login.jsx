import { useState } from 'react';
import { Lock, User, LayoutDashboard, ArrowRight } from 'lucide-react';

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
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[var(--color-coral)] opacity-10 rounded-full blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md glass-panel rounded-[var(--radius-xl)] p-8 sm:p-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-gradient-to-br from-[rgba(0,240,255,0.15)] to-[rgba(157,78,221,0.15)] text-[var(--color-primary)] p-3 rounded-[var(--radius-md)] border border-[var(--color-primary)]/30 mb-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <LayoutDashboard size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-[var(--color-primary)] bg-clip-text text-transparent">
            TlushSmart AI
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">הפורטל החכם לבדיקת תלושי שכר וניתוח זכויות</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-[var(--color-error)] text-sm rounded-[var(--radius-md)] p-3 mb-6 text-center font-bold">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-300 mr-1">שם משתמש</label>
            <div className="relative">
              <input
                type="text"
                placeholder="הזן שם משתמש..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-4 pr-11 py-3.5 rounded-[var(--radius-md)] bg-black/30 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]/50 text-sm transition-all"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-300 mr-1">סיסמה</label>
            <div className="relative">
              <input
                type="password"
                placeholder="הזן סיסמה..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-11 py-3.5 rounded-[var(--radius-md)] bg-black/30 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]/50 text-sm transition-all"
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] text-slate-900 py-3.5 rounded-[var(--radius-md)] font-black text-sm hover:scale-[1.01] active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,240,255,0.25)] border border-white/10"
          >
            <span>התחברות</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/5"></div>
          <span className="px-3 text-xs text-slate-500 font-bold tracking-widest uppercase">או</span>
          <div className="flex-1 border-t border-white/5"></div>
        </div>

        {/* Quick Connect */}
        <button
          onClick={handleQuickLogin}
          className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3.5 rounded-[var(--radius-md)] font-bold text-sm hover:bg-white/10 hover:border-white/15 transition-all"
        >
          <span>התחברות מהירה כמאי</span>
        </button>

      </div>
    </div>
  );
}
