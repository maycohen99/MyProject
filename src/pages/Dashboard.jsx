import { Link } from 'react-router-dom';
import { Plus, FileText, ChevronLeft } from 'lucide-react';
import Card from '../components/Card';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const recentScans = [
    { id: 1, date: '10 מרץ 2024', name: 'תלוש פברואר 2024', status: 'ok', statusText: 'תקין' },
    { id: 2, date: '12 פבר 2024', name: 'תלוש ינואר 2024', status: 'error', statusText: 'שגיאה נמצאה' },
    { id: 3, date: '05 ינו 2024', name: 'תלוש דצמבר 2023', status: 'ok', statusText: 'תקין' },
    { id: 4, date: '10 דצמ 2023', name: 'תלוש נובמבר 2023', status: 'error', statusText: 'שגיאה נמצאה' },
    { id: 5, date: '08 נוב 2023', name: 'תלוש אוקטובר 2023', status: 'ok', statusText: 'תקין' },
    { id: 6, date: '10 אוק 2023', name: 'תלוש ספטמבר 2023', status: 'ok', statusText: 'תקין' },
    { id: 7, date: '05 ספט 2023', name: 'תלוש אוגוסט 2023', status: 'error', statusText: 'שגיאה נמצאה' },
  ];

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)] relative min-h-[70vh]">
      
      {/* Summary Card */}
      <section>
        <div className="relative border border-[var(--color-outline)] bg-white p-8 text-center rounded-[var(--radius-xl)] shadow-ambient overflow-hidden">
          {/* Subtle decorative blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-container)] rounded-full -mr-10 -mt-10 blur-2xl"></div>
          
          <h2 className="text-[var(--color-on-surface-variant)] text-xs font-bold tracking-widest uppercase mb-2">סך החזרים פוטנציאליים</h2>
          <div className="text-[var(--color-secondary)] text-6xl font-black font-display tracking-tight flex justify-center items-baseline gap-1 select-none">
            <span className="text-[var(--color-primary)] font-normal italic text-4xl font-display">₪</span>
            <span className="font-extrabold">2,340</span>
          </div>
          <p className="text-[10px] text-[var(--color-primary)] font-extrabold tracking-widest uppercase mt-3.5">ניתוח פעיל מבוסס AI</p>
        </div>
      </section>

      {/* Scan History */}
      <section>
        <div className="flex justify-between items-end mb-[var(--spacing-md)] border-b border-[var(--color-outline)] pb-3">
          <h2 className="text-xl font-extrabold text-[var(--color-secondary)] font-display tracking-tight">סריקות אחרונות</h2>
          <Link to="/report" className="text-[var(--color-primary)] hover:text-[var(--color-coral)] text-xs font-extrabold tracking-widest uppercase flex items-center gap-0.5 transition-colors font-sans">
            הצג הכל <ChevronLeft size={14} />
          </Link>
        </div>
        
        <div className="flex flex-col gap-[var(--spacing-sm)]">
          {recentScans.map(scan => (
            <Card key={scan.id} className="editorial-card-interactive flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-[var(--color-primary-container)] p-3 rounded-xl border border-[rgba(198,106,85,0.1)] text-[var(--color-primary)]">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-on-surface)] text-base">{scan.name}</h3>
                  <p className="text-xs text-[var(--color-on-surface-variant)]/80 font-semibold mt-0.5">{scan.date}</p>
                </div>
              </div>
              <StatusBadge status={scan.status} text={scan.statusText} />
            </Card>
          ))}
        </div>
      </section>

      {/* FAB */}
      <div className="fixed bottom-24 left-6 sm:left-8 z-40">
        <Link 
          to="/upload" 
          className="editorial-btn-primary flex items-center gap-2 px-5 py-3.5 rounded-full"
        >
          <span className="font-bold text-xs tracking-wider">סריקה חדשה</span>
          <Plus size={16} />
        </Link>
      </div>

    </div>
  );
}
