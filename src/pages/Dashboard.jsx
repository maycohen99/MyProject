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
        <div className="relative rounded-[var(--radius-xl)] p-8 text-center overflow-hidden border border-white/10 bg-gradient-to-br from-[rgba(13,16,27,0.8)] to-[rgba(26,32,53,0.4)] backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.05)]">
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[var(--color-coral)] opacity-25 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[var(--color-primary)] opacity-20 rounded-full blur-3xl animate-pulse"></div>
          
          <h2 className="text-slate-400 text-base mb-2 font-medium tracking-wide">סך החזרים פוטנציאליים</h2>
          <div className="text-white text-6xl font-black font-display tracking-tight flex justify-center items-baseline gap-1">
            <span className="bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-secondary)] bg-clip-text text-transparent text-4xl font-extrabold select-none">₪</span>
            <span className="bg-gradient-to-r from-white via-slate-100 to-[var(--color-primary)] bg-clip-text text-transparent">2,340</span>
          </div>
          <p className="text-[10px] text-[var(--color-primary)] font-bold tracking-widest uppercase mt-3">ניתוח פעיל מבוסס AI</p>
        </div>
      </section>

      {/* Scan History */}
      <section>
        <div className="flex justify-between items-end mb-[var(--spacing-md)]">
          <h2 className="text-2xl font-bold tracking-tight text-white">סריקות אחרונות</h2>
          <Link to="/report" className="text-[var(--color-primary)] text-sm font-semibold hover:underline flex items-center gap-0.5">
            הצג הכל <ChevronLeft size={16} />
          </Link>
        </div>
        
        <div className="flex flex-col gap-[var(--spacing-sm)]">
          {recentScans.map(scan => (
            <Card key={scan.id} className="glass-panel-interactive flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-white/5 border border-white/10 p-3 rounded-[var(--radius-md)] text-[var(--color-primary)]">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{scan.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{scan.date}</p>
                </div>
              </div>
              <StatusBadge status={scan.status} text={scan.statusText} />
            </Card>
          ))}
        </div>
      </section>

      {/* FAB */}
      <div className="fixed bottom-28 left-6 sm:left-8 z-40">
        <Link 
          to="/upload" 
          className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-secondary)] text-white px-5 py-3.5 rounded-full shadow-[0_8px_24px_rgba(255,0,127,0.3)] hover:shadow-[0_8px_32px_rgba(255,0,127,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          <span className="font-bold text-sm tracking-wide">סריקה חדשה</span>
          <Plus size={20} />
        </Link>
      </div>

    </div>
  );
}
