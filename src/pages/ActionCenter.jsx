import { useState } from 'react';
import { ArrowLeft, MessageCircle, Copy, Check, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { cn } from '../utils/cn';

export default function ActionCenter() {
  const [tone, setTone] = useState('friendly'); // 'friendly' | 'official'
  const [copied, setCopied] = useState(false);

  const friendlyText = `היי,
ראיתי שיש כמה פערים בתלושי השכר האחרונים שלי (חסרות לי שעות נוספות והפרשות לפנסיה). 
אשמח אם תוכלי להציץ בדוח שצירפתי ולעדכן אותי מתי נוכל לסדר את זה.
תודה מראש!`;

  const officialText = `שלום רב,
בבדיקה שערכתי לתלושי השכר שלי בתקופה האחרונה, מצאתי מספר אי-התאמות הנוגעות להפרשות פנסיוניות חסרות ואי תשלום כדין על שעות נוספות.
אודה לבדיקתכם ולטיפול בהקדם מול מחלקת השכר, על מנת להסדיר את ההפרשים.
בברכה,`;

  const currentText = tone === 'friendly' ? friendlyText : officialText;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(currentText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)] max-w-3xl mx-auto pb-20">
      
      <div className="flex items-center gap-4">
        <Link 
          to="/report" 
          className="p-3.5 rounded-full hover:bg-[var(--color-surface-container-high)] text-[var(--color-secondary)] transition-all border border-[var(--color-outline)] shadow-sm bg-white"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-extrabold text-[var(--color-secondary)] font-display tracking-tight">מרכז פעולה</h1>
      </div>

      <div className="relative overflow-hidden bg-[var(--color-secondary-container)] border border-[rgba(62,86,67,0.15)] p-6 rounded-[var(--radius-xl)] shadow-ambient">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-secondary)]/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <h2 className="text-xl font-extrabold text-[var(--color-secondary)] mb-2 font-display tracking-tight relative z-10">מחולל פניות למעסיק</h2>
        <p className="text-[var(--color-on-surface-variant)] text-sm font-semibold relative z-10">
          הכנו עבורך נוסח מוכן לשליחה. בחרי את הסגנון שמתאים לך.
        </p>
      </div>

      <Card className="editorial-card flex flex-col gap-6 p-8 border border-[var(--color-outline)] bg-white rounded-[var(--radius-xl)] shadow-ambient">
        {/* Toggle */}
        <div className="flex bg-[var(--color-surface-container-low)] border border-[var(--color-outline)] rounded-full p-1 relative w-full sm:w-fit">
          <button
            onClick={() => setTone('friendly')}
            className={cn(
              "flex-1 sm:px-8 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300",
              tone === 'friendly' 
                ? "bg-[var(--color-primary)] text-white shadow-sm" 
                : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
            )}
          >
            סגנון ידידותי
          </button>
          <button
            onClick={() => setTone('official')}
            className={cn(
              "flex-1 sm:px-8 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300",
              tone === 'official' 
                ? "bg-[var(--color-primary)] text-white shadow-sm" 
                : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
            )}
          >
            סגנון רשמי
          </button>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            readOnly
            value={currentText}
            rows={6}
            className="w-full p-5 rounded-[var(--radius-md)] bg-[var(--color-surface-container)] border border-[var(--color-outline)] text-[var(--color-on-surface)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/10 focus:border-[var(--color-primary)] font-sans leading-relaxed text-sm sm:text-base"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-secondary)] text-white hover:bg-[#314435] transition-all py-3.5 rounded-full font-bold text-xs tracking-wider shadow-sm"
          >
            <MessageCircle size={16} />
            שליחה בוואטסאפ
          </button>
          
          <div className="flex gap-4 flex-1">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[var(--color-secondary)] border border-[var(--color-outline)] hover:bg-[var(--color-surface-container-low)] transition-all py-3.5 rounded-full font-bold text-xs tracking-wider shadow-sm"
            >
              {copied ? <Check size={16} className="text-[var(--color-success)]" /> : <Copy size={16} />}
              {copied ? 'הועתק!' : 'העתקה'}
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 bg-white text-[var(--color-on-surface-variant)]/60 border border-[var(--color-outline)] hover:bg-[var(--color-surface-container-low)] transition-all py-3.5 rounded-full font-bold text-xs tracking-wider shadow-sm"
            >
              <Download size={16} />
              הורדה
            </button>
          </div>
        </div>
      </Card>

    </div>
  );
}
