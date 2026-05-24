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
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 sm:px-6 py-12 relative">
      {/* Editorial Soft Background Blur Accent */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(198,106,85,0.06)_0%,transparent_70%)] pointer-events-none rounded-full blur-[40px]"></div>

      <div className="w-full max-w-[460px] bg-white border border-[var(--color-outline)] shadow-[0_25px_60px_-15px_rgba(112,110,104,0.15)] p-6 sm:p-10 rounded-[var(--radius-xl)] relative z-10 transition-all duration-300">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-[var(--color-primary-container)] text-[var(--color-primary)] p-4 rounded-2xl border border-[rgba(198,106,85,0.18)] mb-4">
            <LayoutDashboard size={28} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-secondary)] font-display">
            Tlush<span className="text-[var(--color-primary)] font-normal italic">Smart</span> AI
          </h1>
          <p className="text-[var(--color-on-surface-variant)] text-xs font-bold tracking-wider uppercase mt-1">מערכת חכמה לניתוח זכויות עובדים</p>
        </div>

        {error && (
          <div className="bg-[var(--color-error-container)] border border-[rgba(181,63,63,0.2)] text-[var(--color-error)] text-xs rounded-xl p-3 mb-6 text-center font-bold">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--color-secondary)]/90 mr-1.5">שם משתמש</label>
            <div className="relative">
              <input
                type="text"
                placeholder="הזן שם משתמש..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] placeholder-[var(--color-on-surface-variant)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] text-sm font-semibold transition-all text-right"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/70" size={16} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[var(--color-secondary)]/90 mr-1.5">סיסמה</label>
            <div className="relative">
              <input
                type="password"
                placeholder="הזן סיסמה..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-full bg-[var(--color-surface-container)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] placeholder-[var(--color-on-surface-variant)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] text-sm font-semibold transition-all text-right"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]/70" size={16} />
            </div>
          </div>

          <button
            type="submit"
            className="editorial-btn-primary w-full mt-2 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm tracking-wide cursor-pointer transition-all shadow-sm"
          >
            <span>התחברות</span>
            <ArrowLeft size={16} />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-[var(--color-outline)]"></div>
          <span className="px-3 text-[10px] text-[var(--color-on-surface-variant)]/60 font-bold tracking-widest uppercase">או</span>
          <div className="flex-1 border-t border-[var(--color-outline)]"></div>
        </div>

        {/* Quick Connect */}
        <button
          onClick={handleQuickLogin}
          className="editorial-btn-secondary w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm tracking-wide cursor-pointer transition-all shadow-sm"
        >
          <span>התחברות מהירה כמאי</span>
        </button>

      </div>
    </div>
  );
}
