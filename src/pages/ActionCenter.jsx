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
        <Link to="/report" className="p-2 rounded-full hover:bg-white/5 text-slate-200 transition-colors border border-transparent hover:border-white/10">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">מרכז פעולה</h1>
      </div>

      <div className="relative overflow-hidden bg-[rgba(0,240,255,0.05)] rounded-[var(--radius-xl)] p-6 shadow-ambient border border-[var(--color-primary)]/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl"></div>
        <h2 className="text-xl font-extrabold text-[var(--color-primary)] mb-2 relative z-10">מחולל פניות למעסיק</h2>
        <p className="text-slate-300 text-sm relative z-10">
          הכנו עבורך נוסח מוכן לשליחה. בחרי את הסגנון שמתאים לך.
        </p>
      </div>

      <Card className="flex flex-col gap-6 p-6 border border-white/10 bg-[rgba(13,16,27,0.4)]">
        {/* Toggle */}
        <div className="flex bg-white/5 border border-white/10 rounded-[var(--radius-md)] p-1 relative w-full sm:w-fit backdrop-blur-sm">
          <button
            onClick={() => setTone('friendly')}
            className={cn(
              "flex-1 sm:px-8 py-2 rounded-[var(--radius-sm)] text-sm font-bold transition-all duration-300",
              tone === 'friendly' 
                ? "bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm border border-[var(--color-primary)]/30" 
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            )}
          >
            סגנון ידידותי
          </button>
          <button
            onClick={() => setTone('official')}
            className={cn(
              "flex-1 sm:px-8 py-2 rounded-[var(--radius-sm)] text-sm font-bold transition-all duration-300",
              tone === 'official' 
                ? "bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-sm border border-[var(--color-primary)]/30" 
                : "text-slate-400 hover:text-slate-200 border border-transparent"
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
            className="w-full p-4.5 rounded-[var(--radius-md)] bg-black/35 border border-white/10 text-slate-100 resize-none focus:outline-none focus:border-[var(--color-primary)]/50 font-sans leading-relaxed text-sm sm:text-base backdrop-blur-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#20ba5a] to-[#25D366] text-white py-3 rounded-[var(--radius-md)] font-bold hover:scale-[1.01] active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.4)]"
          >
            <MessageCircle size={18} />
            שליחה בוואטסאפ
          </button>
          
          <div className="flex gap-3.5 flex-1">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-100 py-3 rounded-[var(--radius-md)] font-bold hover:bg-white/10 hover:border-white/15 transition-all active:scale-95"
            >
              {copied ? <Check size={18} className="text-[var(--color-success)] drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]" /> : <Copy size={18} />}
              {copied ? 'הועתק!' : 'העתקה'}
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 border border-white/10 text-slate-300 py-3 rounded-[var(--radius-md)] font-semibold hover:bg-white/5 transition-colors active:scale-95"
            >
              <Download size={18} />
              הורדה
            </button>
          </div>
        </div>
      </Card>

    </div>
  );
}
