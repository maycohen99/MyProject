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
        <h1 className="text-3xl font-bold mb-2 text-[var(--color-on-background)]">העלאת תלוש</h1>
        <p className="text-[var(--color-on-surface-variant)] text-lg">אנא העלה צילום ברור או קובץ PDF של התלוש שלך.</p>
      </div>

      {!isUploading ? (
        <>
          {/* Upload Zone */}
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-[var(--color-outline-variant)] rounded-[var(--radius-xl)] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-[var(--color-surface-container-low)] hover:border-[var(--color-primary)] transition-colors bg-[var(--color-surface-container-lowest)]"
          >
            <div className="bg-[var(--color-primary-fixed)] text-[var(--color-on-primary-fixed)] p-4 rounded-full mb-2">
              <UploadCloud size={40} />
            </div>
            <h3 className="font-semibold text-xl text-[var(--color-on-surface)]">לחץ כאן לבחירת קובץ</h3>
            <p className="text-[var(--color-on-surface-variant)] text-sm">תומך ב- PDF, PNG, JPG (עד 10MB)</p>
          </div>

          {/* Tips Section */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-on-surface)]">טיפים לצילום איכותי</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="flex flex-col items-center text-center gap-2 p-4">
                <Sun className="text-[var(--color-coral)]" size={28} />
                <h4 className="font-medium text-[var(--color-on-surface)]">תאורה טובה</h4>
                <p className="text-sm text-[var(--color-on-surface-variant)]">צלם באור יום או תחת תאורה חזקה</p>
              </Card>
              <Card className="flex flex-col items-center text-center gap-2 p-4">
                <Maximize className="text-[var(--color-coral)]" size={28} />
                <h4 className="font-medium text-[var(--color-on-surface)]">הכל בפריים</h4>
                <p className="text-sm text-[var(--color-on-surface-variant)]">וודא שכל שולי התלוש מופיעים בתמונה</p>
              </Card>
              <Card className="flex flex-col items-center text-center gap-2 p-4">
                <Smartphone className="text-[var(--color-coral)]" size={28} />
                <h4 className="font-medium text-[var(--color-on-surface)]">זווית ישרה</h4>
                <p className="text-sm text-[var(--color-on-surface-variant)]">החזק את המצלמה במקביל לתלוש</p>
              </Card>
            </div>
          </section>
        </>
      ) : (
        /* Loading Simulation */
        <Card className="p-8 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-20 h-20 border-4 border-[var(--color-surface-container)] border-t-[var(--color-coral)] rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-bold mb-8 text-[var(--color-on-surface)]">הבינה המלאכותית מנתחת...</h2>
          
          <div className="w-full max-w-md flex flex-col gap-4">
            {steps.map((step, index) => {
              const isCompleted = progressStep > index;
              const isCurrent = progressStep === index;
              
              return (
                <div key={step.id} className="flex items-center gap-4">
                  {isCompleted ? (
                    <CheckCircle2 className="text-[var(--color-success)]" size={24} />
                  ) : isCurrent ? (
                    <div className="w-6 h-6 border-2 border-[var(--color-coral)] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Circle className="text-[var(--color-outline-variant)]" size={24} />
                  )}
                  <span className={cn(
                    "text-lg transition-colors",
                    isCompleted ? "text-[var(--color-on-surface)]" : 
                    isCurrent ? "text-[var(--color-coral)] font-medium" : "text-[var(--color-outline)]"
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
