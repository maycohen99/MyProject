import { useState } from 'react';
import { AlertTriangle, ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { cn } from '../utils/cn';

export default function Report() {
  const [expandedErrorId, setExpandedErrorId] = useState(null);

  const errors = [
    {
      id: 1,
      title: 'הפרשות פנסיה חסרות',
      amount: '₪1,240',
      description: 'המעסיק לא הפריש את המינימום הנדרש לפנסיה בחודשים האחרונים.',
      citation: 'על פי צו ההרחבה לפנסיה חובה (2008), שיעור ההפרשות המינימלי הוא 6.5% לפנסיה ו-6% לפיצויים.',
      severity: 'high'
    },
    {
      id: 2,
      title: 'אי תשלום שעות נוספות',
      amount: '₪850',
      description: 'זוהו 12 שעות נוספות שלא שולמו בתעריף המוגדל (125%).',
      citation: 'חוק שעות עבודה ומנוחה קובע תשלום של 125% עבור השעתיים הנוספות הראשונות ביום ו-150% מעבר לכך.',
      severity: 'medium'
    },
    {
      id: 3,
      title: 'ניכוי מס הכנסה שגוי',
      amount: '₪250',
      description: 'לא עודכנו נקודות זיכוי בגין ילדים.',
      citation: 'סעיף 40 לפקודת מס הכנסה מזכה בנקודות זיכוי נוספות בגין כל ילד בגיל הרלוונטי.',
      severity: 'medium'
    }
  ];

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)] max-w-3xl mx-auto pb-20">
      
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 rounded-full hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-[var(--color-on-background)]">דוח תוצאות מנותח</h1>
      </div>

      {/* Status Strip */}
      <div className="bg-[var(--color-error-container)] rounded-[var(--radius-xl)] p-6 shadow-ambient flex items-center gap-4 border-r-8 border-[var(--color-error)]">
        <div className="bg-[var(--color-error)] text-white p-3 rounded-full">
          <AlertTriangle size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--color-on-error-container)]">נמצאו אי דיוקים בתלוש</h2>
          <p className="text-[var(--color-on-error-container)] opacity-90 text-lg">פוטנציאל להחזר של <strong className="font-bold">₪2,340</strong></p>
        </div>
      </div>

      {/* Findings List */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-[var(--color-on-surface)]">פירוט הליקויים</h3>
        
        {errors.map(error => (
          <Card key={error.id} className="p-0 overflow-hidden flex flex-col transition-all">
            <div className="p-5 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    error.severity === 'high' ? "bg-[var(--color-error)]" : "bg-[var(--color-tertiary-container)]"
                  )} />
                  <h4 className="font-bold text-lg text-[var(--color-on-surface)]">{error.title}</h4>
                </div>
                <p className="text-[var(--color-on-surface-variant)]">{error.description}</p>
              </div>
              
              <div className="text-left min-w-[100px]">
                <div className="text-xl font-bold text-[var(--color-error)]">{error.amount}</div>
                <button 
                  onClick={() => setExpandedErrorId(expandedErrorId === error.id ? null : error.id)}
                  className="text-sm font-medium text-[var(--color-primary)] mt-2 flex items-center gap-1 hover:underline mr-auto"
                >
                  למה? <ChevronDown size={16} className={cn("transition-transform", expandedErrorId === error.id && "rotate-180")} />
                </button>
              </div>
            </div>
            
            {/* Expanded Citation */}
            <div className={cn(
              "bg-[var(--color-surface-container-low)] px-5 transition-all overflow-hidden border-t border-[var(--color-surface-container)]",
              expandedErrorId === error.id ? "py-4 max-h-40" : "max-h-0 py-0 border-transparent"
            )}>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--color-primary-container)] text-white p-1 rounded-sm mt-1">
                  <Check size={14} />
                </div>
                <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">{error.citation}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* CTA Button */}
      <div className="mt-4">
        <Link 
          to="/action-center"
          className="block w-full text-center bg-[var(--color-coral)] text-white text-xl font-bold py-5 rounded-[var(--radius-lg)] shadow-ambient-hover hover:scale-[1.02] transition-transform"
        >
          מרכז פעולה - המשך טיפול
        </Link>
      </div>

    </div>
  );
}
