import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, Circle, Smartphone, Sun, Maximize } from 'lucide-react';
import Card from '../components/Card';
import { cn } from '../utils/cn';

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const navigate = useNavigate();

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload stages
    setTimeout(() => setProgressStep(1), 1500); // Structure Check
    setTimeout(() => setProgressStep(2), 3000); // Field Analysis
    setTimeout(() => setProgressStep(3), 4500); // AI Logic
    setTimeout(() => {
      // Simulate automatic name extraction from payslip
      localStorage.setItem('userName', 'מאי כהן');
      window.dispatchEvent(new Event('userNameChanged'));
      navigate('/report');
    }, 5500); // Navigate to report
  };

  const steps = [
    { id: 1, label: 'בדיקת מבנה התלוש' },
    { id: 2, label: 'פענוח שדות נתונים' },
    { id: 3, label: 'ניתוח לוגיקה משפטית (AI)' },
  ];

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)] max-w-2xl mx-auto">
      
      <div>
        <h1 className="text-3xl font-black mb-2 text-white uppercase tracking-tight font-display">העלאת תלוש</h1>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">נא להעלות צילום ברור או קובץ PDF של תלוש השכר</p>
      </div>

      {!isUploading ? (
        <>
          {/* Upload Zone */}
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-[#27272a] hover:border-[var(--color-primary)] bg-[#141416] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 rounded-none shadow-[4px_4px_0px_0px_#27272a] hover:shadow-[6px_6px_0px_0px_#2b5cff] group"
          >
            <div className="bg-black text-[var(--color-primary)] p-4 border-2 border-[#27272a] group-hover:border-[var(--color-primary)] rounded-none mb-2 shadow-[2px_2px_0px_#d0c4ff] group-hover:shadow-[3px_3px_0px_#ff5c00] transition-all">
              <UploadCloud size={32} />
            </div>
            <h3 className="font-black text-xl text-white uppercase font-display tracking-tight">לחץ כאן לבחירת קובץ</h3>
            <p className="text-slate-500 text-xs font-bold tracking-wider uppercase">תומך ב- PDF, PNG, JPG (עד 10MB)</p>
          </div>

          {/* Tips Section */}
          <section>
            <h3 className="text-lg font-bold mb-4 text-slate-200 uppercase tracking-widest font-display">טיפים לצילום איכותי</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="avant-card-interactive flex flex-col items-center text-center gap-2 p-4">
                <Sun className="text-[var(--color-coral)]" size={28} />
                <h4 className="font-extrabold text-slate-200 text-base">תאורה טובה</h4>
                <p className="text-xs text-slate-500 font-medium">צלם באור יום או תחת תאורה חזקה</p>
              </Card>
              <Card className="avant-card-interactive flex flex-col items-center text-center gap-2 p-4">
                <Maximize className="text-[var(--color-primary)]" size={28} />
                <h4 className="font-extrabold text-slate-200 text-base">הכל בפריים</h4>
                <p className="text-xs text-slate-500 font-medium">וודא שכל שולי התלוש מופיעים בתמונה</p>
              </Card>
              <Card className="avant-card-interactive flex flex-col items-center text-center gap-2 p-4">
                <Smartphone className="text-[var(--color-secondary)]" size={28} />
                <h4 className="font-extrabold text-slate-200 text-base">זווית ישרה</h4>
                <p className="text-xs text-slate-500 font-medium">החזק את המצלמה במקביל לתלוש</p>
              </Card>
            </div>
          </section>
        </>
      ) : (
        /* Loading Simulation */
        <Card className="avant-card p-8 flex flex-col items-center justify-center min-h-[400px] border-2 border-[#27272a] shadow-[6px_6px_0px_0px_#2b5cff] relative overflow-hidden rounded-none">
          {/* Animated scanning bar overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-primary)] animate-pulse"></div>
          
          <div className="w-20 h-20 flex items-center justify-center border-2 border-[#27272a] bg-black mb-8 relative rounded-none">
            <div className="absolute inset-0 border-t-2 border-[var(--color-coral)] animate-spin"></div>
            <UploadCloud size={24} className="text-[var(--color-primary)]" />
          </div>
          
          <h2 className="text-2xl font-black mb-8 text-white uppercase tracking-tight font-display">הבינה המלאכותית מנתחת...</h2>
          
          <div className="w-full max-w-md flex flex-col gap-4">
            {steps.map((step, index) => {
              const isCompleted = progressStep > index;
              const isCurrent = progressStep === index;
              
              return (
                <div key={step.id} className="flex items-center gap-4 bg-black border border-[#27272a] p-3.5 rounded-none">
                  {isCompleted ? (
                    <CheckCircle2 className="text-[var(--color-success)]" size={18} />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Circle className="text-slate-700" size={18} />
                  )}
                  <span className={cn(
                    "text-sm transition-colors duration-300 font-bold uppercase tracking-wider font-display",
                    isCompleted ? "text-slate-350" : 
                    isCurrent ? "text-[var(--color-primary)] font-black" : "text-slate-500"
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
