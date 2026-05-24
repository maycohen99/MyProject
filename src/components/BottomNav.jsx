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
      <nav className="pointer-events-auto bg-[#141416] border-2 border-[#27272a] shadow-[4px_4px_0px_0px_#27272a] px-4 sm:px-6 py-2 max-w-[460px] w-full flex justify-between items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1.5 py-2 px-3 sm:px-4 transition-all duration-200 relative min-w-[64px] border-2 border-transparent",
                isActive 
                  ? "text-[var(--color-coral)] bg-black border-[#ff5c00]" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
            >
              <Icon size={18} className={cn("transition-transform duration-200", isActive && "scale-105")} />
              <span className={cn(
                "text-[10px] sm:text-xs font-extrabold tracking-wider uppercase font-display",
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
