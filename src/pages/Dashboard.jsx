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
        <div className="bg-[var(--color-primary-container)] rounded-[var(--radius-xl)] p-8 shadow-ambient text-center relative overflow-hidden border border-[var(--color-outline-variant)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-coral)] opacity-20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
          <h2 className="text-[var(--color-on-primary-container)] text-lg mb-2">סך החזרים פוטנציאליים</h2>
          <div className="text-[var(--color-on-surface)] text-5xl font-bold font-display tracking-tight flex justify-center items-baseline gap-1">
            <span className="text-[var(--color-coral)] text-3xl">₪</span>
            2,340
          </div>
        </div>
      </section>

      {/* Scan History */}
      <section>
        <div className="flex justify-between items-end mb-[var(--spacing-md)]">
          <h2 className="text-2xl font-semibold text-[var(--color-on-background)]">סריקות אחרונות</h2>
          <Link to="/report" className="text-[var(--color-surface-tint)] text-sm hover:underline flex items-center">
            הצג הכל <ChevronLeft size={16} />
          </Link>
        </div>
        
        <div className="flex flex-col gap-[var(--spacing-sm)]">
          {recentScans.map(scan => (
            <Card key={scan.id} className="flex items-center justify-between p-4 hover:shadow-ambient-hover transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="bg-[var(--color-surface-container-low)] p-3 rounded-[var(--radius-md)] text-[var(--color-surface-tint)]">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-on-surface)]">{scan.name}</h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">{scan.date}</p>
                </div>
              </div>
              <StatusBadge status={scan.status} text={scan.statusText} />
            </Card>
          ))}
        </div>
      </section>

      {/* FAB */}
      <div className="fixed bottom-8 left-8">
        <Link 
          to="/upload" 
          className="flex items-center gap-2 bg-[var(--color-coral)] text-white px-6 py-4 rounded-full shadow-ambient-hover hover:scale-105 transition-transform"
        >
          <span className="font-semibold text-lg">סריקה חדשה</span>
          <Plus size={24} />
        </Link>
      </div>

    </div>
  );
}
