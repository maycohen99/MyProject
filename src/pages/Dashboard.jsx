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
        <div className="relative border-2 border-[#27272a] bg-[#141416] p-8 text-center shadow-[4px_4px_0px_0px_#27272a] hover:shadow-[6px_6px_0px_0px_#2b5cff] transition-all duration-200">
          <h2 className="text-slate-500 text-xs font-black tracking-widest uppercase mb-3">סך החזרים פוטנציאליים</h2>
          <div className="text-white text-6xl font-black font-display tracking-tighter flex justify-center items-baseline gap-1.5 select-none">
            <span className="text-[var(--color-coral)] text-4xl font-black">₪</span>
            <span className="text-white">2,340</span>
          </div>
          <div className="inline-block bg-black text-[var(--color-primary)] text-[10px] font-black tracking-widest uppercase mt-4 px-3 py-1 border border-[#27272a]">
            ACTIVE AI RESOLUTION MATRIX
          </div>
        </div>
      </section>

      {/* Scan History */}
      <section>
        <div className="flex justify-between items-end mb-[var(--spacing-md)] border-b-2 border-[#27272a] pb-2">
          <h2 className="text-xl font-extrabold tracking-tight text-white font-display">סריקות אחרונות</h2>
          <Link to="/report" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] text-xs font-black tracking-widest uppercase flex items-center gap-0.5 transition-colors">
            הצג הכל <ChevronLeft size={14} />
          </Link>
        </div>
        
        <div className="flex flex-col gap-[var(--spacing-sm)]">
          {recentScans.map(scan => (
            <Card key={scan.id} className="avant-card-interactive flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-black border border-[#27272a] p-3 text-[var(--color-primary)] rounded-none">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-100 text-base">{scan.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{scan.date}</p>
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
          className="avant-btn-tangerine flex items-center gap-2 px-5 py-3.5 rounded-none"
        >
          <span className="font-black text-xs uppercase tracking-widest">סריקה חדשה</span>
          <Plus size={16} />
        </Link>
      </div>

    </div>
  );
}
