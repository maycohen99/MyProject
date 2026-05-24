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
        <Link to="/" className="p-2 rounded-none hover:bg-white/5 text-slate-200 transition-colors border-2 border-transparent hover:border-[#27272a]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight font-display">דוח תוצאות מנותח</h1>
      </div>

      {/* Status Strip */}
      <div className="relative overflow-hidden bg-black p-6 border-2 border-[var(--color-error)] shadow-[4px_4px_0px_0px_#ef4444] flex items-center gap-4 rounded-none">
        <div className="bg-[var(--color-error)] text-white p-3 border-2 border-black rounded-none shadow-[2px_2px_0px_0px_#09090b]">
          <AlertTriangle size={24} />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl font-extrabold text-white uppercase font-display tracking-tight">נמצאו אי דיוקים בתלוש</h2>
          <p className="text-slate-300 text-lg mt-0.5">
            פוטנציאל להחזר של <span className="text-[var(--color-error)] font-black">₪2,340</span>
          </p>
        </div>
      </div>

      {/* Findings List */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-slate-200 uppercase tracking-widest font-display">פירוט הליקויים</h3>
        
        {errors.map(error => (
          <Card key={error.id} className="p-0 overflow-hidden flex flex-col transition-all duration-200 border-2 border-[#27272a] bg-[#141416] hover:border-[var(--color-primary)]">
            <div className="p-5 flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className={cn(
                    "w-2 h-2 rounded-none",
                    error.severity === 'high' ? "bg-[var(--color-error)]" : "bg-[var(--color-secondary)]"
                  )} />
                  <h4 className="font-extrabold text-lg text-white uppercase font-display">{error.title}</h4>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{error.description}</p>
              </div>
              
              <div className="text-left min-w-[110px]">
                <div className="text-2xl font-black text-[var(--color-error)]">{error.amount}</div>
                <button 
                  onClick={() => setExpandedErrorId(expandedErrorId === error.id ? null : error.id)}
                  className="text-xs font-black text-[var(--color-primary)] mt-3.5 flex items-center gap-1.5 hover:text-white transition-colors mr-auto uppercase tracking-wider"
                >
                  למה? <ChevronDown size={14} className={cn("transition-transform duration-250", expandedErrorId === error.id && "rotate-180")} />
                </button>
              </div>
            </div>
            
            {/* Expanded Citation */}
            <div className={cn(
              "bg-black px-5 transition-all duration-300 overflow-hidden border-t-2 border-[#27272a]",
              expandedErrorId === error.id ? "py-4 max-h-40" : "max-h-0 py-0 border-transparent pointer-events-none"
            )}>
              <div className="flex items-start gap-3">
                <div className="bg-[var(--color-primary)] text-white p-0.5 border border-black mt-0.5">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-bold">{error.citation}</p>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* CTA Button */}
      <div className="mt-4">
        <Link 
          to="/action-center"
          className="avant-btn-cobalt block w-full text-center text-sm font-black py-4.5 rounded-none uppercase tracking-widest"
        >
          מרכז פעולה - המשך טיפול
        </Link>
      </div>

    </div>
  );
}
