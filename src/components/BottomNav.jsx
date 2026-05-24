import { Link, useLocation } from 'react-router-dom';
import { Home, UploadCloud, FileText, Briefcase } from 'lucide-react';
import { cn } from '../utils/cn';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'ראשי', icon: Home },
    { path: '/upload', label: 'סריקה', icon: UploadCloud },
    { path: '/report', label: 'דוח', icon: FileText },
    { path: '/action-center', label: 'פעולה', icon: Briefcase },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto bg-[rgba(15,19,33,0.75)] backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-full px-4 sm:px-6 py-2.5 max-w-[480px] w-full flex justify-between items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 sm:px-4 transition-all duration-300 rounded-full relative min-w-[64px]",
                isActive 
                  ? "text-[var(--color-primary)] scale-105" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-[rgba(0,240,255,0.12)] to-[rgba(157,78,221,0.12)] rounded-full border border-[var(--color-primary)]/20 -z-10" />
              )}
              <Icon size={20} className={cn("transition-transform duration-300", isActive && "scale-110")} />
              <span className={cn(
                "text-[10px] sm:text-xs font-semibold tracking-wide",
                isActive ? "font-bold" : ""
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
