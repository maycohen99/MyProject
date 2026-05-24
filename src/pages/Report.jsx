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
        <Link to="/" className="p-2 rounded-full hover:bg-white/5 text-slate-200 transition-colors border border-transparent hover:border-white/10">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">דוח תוצאות מנותח</h1>
      </div>

      {/* Status Strip */}
      <div className="relative overflow-hidden bg-[rgba(255,51,102,0.06)] rounded-[var(--radius-xl)] p-6 shadow-ambient flex items-center gap-4 border border-[var(--color-error)]/30 border-r-8 border-r-[var(--color-error)]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-error)] opacity-10 rounded-full blur-2xl"></div>
        <div className="bg-gradient-to-br from-[var(--color-error)]/20 to-[var(--color-error)]/10 text-[var(--color-error)] p-3.5 rounded-full border border-[var(--color-error)]/30 shadow-[0_0_15px_rgba(255,51,102,0.2)]">
          <AlertTriangle size={28} className="animate-pulse" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-extrabold text-slate-100">נמצאו אי דיוקים בתלוש</h2>
          <p className="text-slate-300 text-lg mt-0.5">
            פוטנציאל להחזר של <span className="text-[var(--color-error)] font-black">₪2,340</span>
          </p>
        </div>
      </div>

      {/* Findings List */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-slate-200">פירוט הליקויים</h3>
        
        {errors.map(error => (
          <Card key={error.id} className="p-0 overflow-hidden flex flex-col transition-all duration-300 border border-white/10 hover:border-white/20 bg-[rgba(13,16,27,0.4)] hover:bg-[rgba(17,21,37,0.55)]">
            <div className="p-5 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className={cn(
                    "w-2.5 h-2.5 rounded-full animate-pulse",
                    error.severity === 'high' ? "bg-[var(--color-error)] drop-shadow-[0_0_6px_rgba(255,51,102,0.6)]" : "bg-[var(--color-secondary)] drop-shadow-[0_0_6px_rgba(157,78,221,0.6)]"
                  )} />
                  <h4 className="font-extrabold text-lg text-slate-100">{error.title}</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{error.description}</p>
              </div>
              
              <div className="text-left min-w-[110px]">
                <div className="text-2xl font-black text-[var(--color-error)] drop-shadow-[0_0_8px_rgba(255,51,102,0.2)]">{error.amount}</div>
                <button 
                  onClick={() => setExpandedErrorId(expandedErrorId === error.id ? null : error.id)}
                  className="text-xs font-bold text-[var(--color-primary)] mt-3.5 flex items-center gap-1.5 hover:opacity-80 transition-opacity mr-auto uppercase tracking-wider"
                >
                  למה? <ChevronDown size={14} className={cn("transition-transform duration-300", expandedErrorId === error.id && "rotate-180")} />
                </button>
              </div>
            </div>
            
            {/* Expanded Citation */}
            <div className={cn(
              "bg-white/[0.02] px-5 transition-all duration-500 ease-in-out overflow-hidden border-t border-white/5",
              expandedErrorId === error.id ? "py-4 max-h-40 opacity-100" : "max-h-0 py-0 opacity-0 border-transparent pointer-events-none"
            )}>
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 text-[var(--color-primary)] p-1 rounded-md border border-[var(--color-primary)]/30 mt-0.5">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{error.citation}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* CTA Button */}
      <div className="mt-4">
        <Link 
          to="/action-center"
          className="block w-full text-center bg-gradient-to-r from-[var(--color-coral)] via-[var(--color-secondary)] to-[var(--color-coral)] text-white text-lg font-black py-4.5 rounded-[var(--radius-lg)] shadow-[0_8px_32px_rgba(255,0,127,0.3)] hover:shadow-[0_8px_40px_rgba(255,0,127,0.5)] hover:scale-[1.01] active:scale-95 transition-all duration-300 border border-white/20 uppercase tracking-wide"
        >
          מרכז פעולה - המשך טיפול
        </Link>
      </div>

    </div>
  );
}
