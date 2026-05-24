import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
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
      <div className="text-slate-400 text-base">
        שלום, <span className="font-semibold text-slate-100 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-inverse-primary)] bg-clip-text text-transparent">יובל</span>
      </div>
    </header>
  );
}
