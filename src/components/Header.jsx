import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-6 mb-4">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-[var(--color-primary)] hover:opacity-80 transition-opacity">
          <div className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] p-2 rounded-[var(--radius-md)]">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold font-display m-0">TlushSmart</h1>
        </Link>
      </div>
      <div className="text-[var(--color-on-surface-variant)] text-lg">
        שלום, <span className="font-semibold text-[var(--color-on-surface)]">יובל</span>
      </div>
    </header>
  );
}
