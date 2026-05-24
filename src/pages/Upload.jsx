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
        <h1 className="text-3xl font-extrabold mb-2 text-[var(--color-secondary)] font-display tracking-tight">העלאת תלוש</h1>
        <p className="text-[var(--color-on-surface-variant)] text-sm font-semibold uppercase tracking-wider">נא להעלות צילום ברור או קובץ PDF של תלוש השכר</p>
      </div>

      {!isUploading ? (
        <>
          {/* Upload Zone */}
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-[var(--color-outline-variant)] hover:border-[var(--color-primary)] bg-white p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-350 rounded-[var(--radius-xl)] shadow-ambient hover:shadow-[0_15px_40px_rgba(198,106,85,0.1)] group"
          >
            <div className="bg-[var(--color-primary-container)] text-[var(--color-primary)] p-4 border border-[rgba(198,106,85,0.15)] rounded-2xl group-hover:scale-105 transition-transform duration-300">
              <UploadCloud size={30} />
            </div>
            <h3 className="font-extrabold text-xl text-[var(--color-secondary)] font-display tracking-tight">לחץ כאן לבחירת קובץ</h3>
            <p className="text-[var(--color-on-surface-variant)] text-xs font-bold tracking-wider uppercase">תומך ב- PDF, PNG, JPG (עד 10MB)</p>
          </div>

          {/* Tips Section */}
          <section>
            <h3 className="text-lg font-bold mb-4 text-[var(--color-secondary)] font-display tracking-wide">טיפים לצילום איכותי</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="editorial-card-interactive flex flex-col items-center text-center gap-2 p-5 rounded-[var(--radius-lg)]">
                <Sun className="text-[var(--color-coral)]" size={26} />
                <h4 className="font-bold text-[var(--color-secondary)] text-base mt-2">תאורה טובה</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">צלם באור יום או תחת תאורה חזקה</p>
              </Card>
              <Card className="editorial-card-interactive flex flex-col items-center text-center gap-2 p-5 rounded-[var(--radius-lg)]">
                <Maximize className="text-[var(--color-primary)]" size={26} />
                <h4 className="font-bold text-[var(--color-secondary)] text-base mt-2">הכל בפריים</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">וודא שכל שולי התלוש מופיעים בתמונה</p>
              </Card>
              <Card className="editorial-card-interactive flex flex-col items-center text-center gap-2 p-5 rounded-[var(--radius-lg)]">
                <Smartphone className="text-[var(--color-secondary)]" size={26} />
                <h4 className="font-bold text-[var(--color-secondary)] text-base mt-2">זווית ישרה</h4>
                <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed">החזק את המצלמה במקביל לתלוש</p>
              </Card>
            </div>
          </section>
        </>
      ) : (
        /* Loading Simulation */
        <Card className="editorial-card p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden border border-[var(--color-outline)] shadow-[0_20px_50px_rgba(112,110,104,0.08)] rounded-[var(--radius-xl)]">
          {/* Subtle scanning bar overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-primary)] opacity-60"></div>
          
          <div className="w-20 h-20 flex items-center justify-center border border-[rgba(198,106,85,0.15)] bg-[var(--color-primary-container)] mb-8 relative rounded-2xl">
            <div className="absolute inset-0 border-t-2 border-[var(--color-primary)] rounded-2xl animate-spin"></div>
            <UploadCloud size={24} className="text-[var(--color-primary)]" />
          </div>
          
          <h2 className="text-2xl font-extrabold mb-8 text-[var(--color-secondary)] font-display tracking-tight">הבינה המלאכותית מנתחת...</h2>
          
          <div className="w-full max-w-md flex flex-col gap-4">
            {steps.map((step, index) => {
              const isCompleted = progressStep > index;
              const isCurrent = progressStep === index;
              
              return (
                <div key={step.id} className="flex items-center gap-4 bg-[#faf6ee]/60 border border-[var(--color-outline)] p-4 rounded-xl">
                  {isCompleted ? (
                    <CheckCircle2 className="text-[var(--color-success)]" size={18} />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Circle className="text-[var(--color-outline-variant)]" size={18} />
                  )}
                  <span className={cn(
                    "text-sm transition-colors duration-300 font-bold font-sans tracking-wide",
                    isCompleted ? "text-[var(--color-on-surface-variant)]" : 
                    isCurrent ? "text-[var(--color-primary)] font-black" : "text-[var(--color-outline-variant)]"
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
