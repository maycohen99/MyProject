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
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-surface-container-lowest)] border-t border-[var(--color-outline-variant)] shadow-[0_-4px_20px_rgba(45,51,74,0.05)] z-50 px-2 sm:px-6">
      <div className="flex justify-between items-center max-w-[var(--spacing-container-max)] mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-4 min-w-[70px] transition-colors rounded-xl",
                isActive 
                  ? "text-[var(--color-coral)]" 
                  : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)]"
              )}
            >
              <Icon size={24} className={cn("transition-transform", isActive && "scale-110")} />
              <span className={cn(
                "text-xs font-medium",
                isActive ? "font-bold" : ""
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
