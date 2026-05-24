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
      <nav className="pointer-events-auto bg-[#fbf9f4] border border-[#e8e2d5] shadow-[0_12px_35px_rgba(112,110,104,0.12)] rounded-full px-4 sm:px-6 py-2.5 max-w-[460px] w-full flex justify-between items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 py-1.5 px-3 sm:px-4 transition-all duration-300 rounded-full relative min-w-[64px]",
                isActive 
                  ? "text-[var(--color-primary)] scale-105" 
                  : "text-[var(--color-on-surface-variant)]/80 hover:text-[var(--color-on-surface)] hover:bg-[#faf6ee]"
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-[var(--color-primary-container)] rounded-full border border-[var(--color-primary)]/10 -z-10" />
              )}
              <Icon size={18} className={cn("transition-transform duration-300", isActive && "scale-110")} />
              <span className={cn(
                "text-[10px] sm:text-xs font-bold tracking-wide font-sans",
                isActive ? "font-extrabold" : ""
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
