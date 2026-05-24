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
    setTimeout(() => navigate('/report'), 5500); // Navigate to report
  };

  const steps = [
    { id: 1, label: 'בדיקת מבנה התלוש' },
    { id: 2, label: 'פענוח שדות נתונים' },
    { id: 3, label: 'ניתוח לוגיקה משפטית (AI)' },
  ];

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)] max-w-2xl mx-auto">
      
      <div>
        <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">העלאת תלוש</h1>
        <p className="text-slate-400 text-lg">אנא העלה צילום ברור או קובץ PDF של התלוש שלך.</p>
      </div>

      {!isUploading ? (
        <>
          {/* Upload Zone */}
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-[rgba(0,240,255,0.25)] rounded-[var(--radius-xl)] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-500 bg-[rgba(13,16,27,0.45)] backdrop-blur-xl hover:bg-[rgba(13,16,27,0.65)] hover:border-[var(--color-primary)]/80 shadow-[0_0_30px_rgba(0,240,255,0.02)] hover:shadow-[0_0_40px_rgba(0,240,255,0.08)] group"
          >
            <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-primary)] p-5 rounded-full mb-2 border border-[var(--color-primary)]/20 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <UploadCloud size={44} className="group-hover:animate-pulse" />
            </div>
            <h3 className="font-bold text-xl text-slate-100 group-hover:text-[var(--color-primary)] transition-colors">לחץ כאן לבחירת קובץ</h3>
            <p className="text-slate-400 text-sm">תומך ב- PDF, PNG, JPG (עד 10MB)</p>
          </div>

          {/* Tips Section */}
          <section>
            <h3 className="text-lg font-bold mb-4 text-slate-200">טיפים לצילום איכותי</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass-panel-interactive flex flex-col items-center text-center gap-2 p-4">
                <Sun className="text-[var(--color-coral)] drop-shadow-[0_0_10px_rgba(255,0,127,0.3)]" size={28} />
                <h4 className="font-bold text-slate-200 text-base">תאורה טובה</h4>
                <p className="text-xs text-slate-400">צלם באור יום או תחת תאורה חזקה</p>
              </Card>
              <Card className="glass-panel-interactive flex flex-col items-center text-center gap-2 p-4">
                <Maximize className="text-[var(--color-primary)] drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]" size={28} />
                <h4 className="font-bold text-slate-200 text-base">הכל בפריים</h4>
                <p className="text-xs text-slate-400">וודא שכל שולי התלוש מופיעים בתמונה</p>
              </Card>
              <Card className="glass-panel-interactive flex flex-col items-center text-center gap-2 p-4">
                <Smartphone className="text-[var(--color-secondary)] drop-shadow-[0_0_10px_rgba(157,78,221,0.3)]" size={28} />
                <h4 className="font-bold text-slate-200 text-base">זווית ישרה</h4>
                <p className="text-xs text-slate-400">החזק את המצלמה במקביל לתלוש</p>
              </Card>
            </div>
          </section>
        </>
      ) : (
        /* Loading Simulation */
        <Card className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px] border border-white/10 relative overflow-hidden">
          {/* Animated scanning bar overlay */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-coral)] to-[var(--color-secondary)] opacity-80 animate-pulse"></div>
          
          <div className="w-24 h-24 rounded-full flex items-center justify-center border border-white/10 bg-gradient-to-tr from-[rgba(0,240,255,0.05)] to-[rgba(255,0,127,0.05)] mb-8 relative">
            <div className="absolute inset-0 border-t-2 border-[var(--color-coral)] rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-b-2 border-[var(--color-primary)] rounded-full animate-spin duration-1000"></div>
            <UploadCloud size={32} className="text-white drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]" />
          </div>
          
          <h2 className="text-2xl font-black mb-8 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">הבינה המלאכותית מנתחת...</h2>
          
          <div className="w-full max-w-md flex flex-col gap-4">
            {steps.map((step, index) => {
              const isCompleted = progressStep > index;
              const isCurrent = progressStep === index;
              
              return (
                <div key={step.id} className="flex items-center gap-4 bg-white/5 border border-white/5 p-3.5 rounded-[var(--radius-md)] backdrop-blur-sm">
                  {isCompleted ? (
                    <CheckCircle2 className="text-[var(--color-success)] drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]" size={22} />
                  ) : isCurrent ? (
                    <div className="w-5.5 h-5.5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Circle className="text-slate-600" size={22} />
                  )}
                  <span className={cn(
                    "text-base transition-colors duration-300",
                    isCompleted ? "text-slate-200 font-semibold" : 
                    isCurrent ? "text-[var(--color-primary)] font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]" : "text-slate-500"
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
