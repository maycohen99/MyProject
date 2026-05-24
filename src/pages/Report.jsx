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
        <Link 
          to="/" 
          className="p-3.5 rounded-full hover:bg-[var(--color-surface-container-high)] text-[var(--color-secondary)] transition-all border border-[var(--color-outline)] shadow-sm bg-white"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-extrabold text-[var(--color-secondary)] font-display tracking-tight">דוח תוצאות מנותח</h1>
      </div>

      {/* Status Strip */}
      <div className="relative overflow-hidden bg-[var(--color-primary-container)] border border-[rgba(198,106,85,0.15)] p-6 flex items-center gap-5 rounded-[var(--radius-xl)] shadow-[0_15px_40px_-15px_rgba(217,179,92,0.18)]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full -mr-6 -mt-6 blur-xl"></div>
        <div className="bg-[var(--color-primary)] text-white p-3.5 rounded-xl shadow-sm relative z-10">
          <AlertTriangle size={24} />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-extrabold text-[var(--color-secondary)] font-display tracking-tight">נמצאו אי דיוקים בתלוש</h2>
          <p className="text-[var(--color-on-surface-variant)] text-base mt-1">
            פוטנציאל להחזר של <span className="text-[var(--color-primary)] font-black text-xl font-display">₪2,340</span>
          </p>
        </div>
      </div>

      {/* Findings List */}
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-[var(--color-secondary)] tracking-wider uppercase font-display border-b border-[var(--color-outline)] pb-2 mb-2">
          פירוט הליקויים
        </h3>
        
        {errors.map(error => (
          <Card 
            key={error.id} 
            className="editorial-card-interactive p-0 overflow-hidden flex flex-col border border-[var(--color-outline)] bg-white hover:border-[var(--color-primary)]/30 rounded-[var(--radius-xl)] shadow-ambient"
          >
            <div className="p-5 flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    error.severity === 'high' ? "bg-[var(--color-primary)]" : "bg-[var(--color-secondary)]"
                  )} />
                  <h4 className="font-bold text-lg text-[var(--color-on-surface)] font-display tracking-tight">{error.title}</h4>
                </div>
                <p className="text-[var(--color-on-surface-variant)] text-sm leading-relaxed font-semibold">{error.description}</p>
              </div>
              
              <div className="text-left min-w-[110px] flex flex-col items-end">
                <div className="text-2xl font-black text-[var(--color-primary)] font-display">{error.amount}</div>
                <button 
                  onClick={() => setExpandedErrorId(expandedErrorId === error.id ? null : error.id)}
                  className="text-xs font-bold text-[var(--color-secondary)] hover:text-[var(--color-primary)] mt-4 flex items-center gap-1 transition-colors mr-auto tracking-wider font-sans uppercase"
                >
                  למה? <ChevronDown size={14} className={cn("transition-transform duration-300", expandedErrorId === error.id && "rotate-180")} />
                </button>
              </div>
            </div>
            
            {/* Expanded Citation */}
            <div className={cn(
              "bg-[var(--color-surface-container-low)] px-5 transition-all duration-300 overflow-hidden border-t border-[var(--color-outline)]",
              expandedErrorId === error.id ? "py-4.5 max-h-40" : "max-h-0 py-0 border-transparent pointer-events-none"
            )}>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--color-secondary)] text-white p-0.5 rounded-full mt-0.5 flex items-center justify-center">
                  <Check size={10} className="stroke-[3]" />
                </div>
                <p className="text-xs text-[var(--color-on-surface-variant)] leading-relaxed font-semibold">{error.citation}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* CTA Button */}
      <div className="mt-4">
        <Link 
          to="/action-center"
          className="editorial-btn-primary block w-full text-center text-sm font-bold py-4 rounded-full tracking-wider hover:scale-[1.01] transition-all"
        >
          מרכז פעולה - המשך טיפול
        </Link>
      </div>

    </div>
  );
}
