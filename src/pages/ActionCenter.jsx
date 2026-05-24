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
        <Link to="/report" className="p-2 rounded-none hover:bg-white/5 text-slate-200 transition-colors border-2 border-transparent hover:border-[#27272a]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-black text-white uppercase tracking-tight font-display">מרכז פעולה</h1>
      </div>

      <div className="relative overflow-hidden bg-black p-6 border-2 border-[var(--color-primary)] shadow-[4px_4px_0px_0px_#2b5cff] rounded-none">
        <h2 className="text-xl font-extrabold text-[var(--color-primary)] mb-2 uppercase font-display tracking-tight">מחולל פניות למעסיק</h2>
        <p className="text-slate-300 text-sm font-bold">
          הכנו עבורך נוסח מוכן לשליחה. בחרי את הסגנון שמתאים לך.
        </p>
      </div>

      <Card className="flex flex-col gap-6 p-6 border-2 border-[#27272a] bg-[#141416]">
        {/* Toggle */}
        <div className="flex bg-black border-2 border-[#27272a] rounded-none p-1 relative w-full sm:w-fit">
          <button
            onClick={() => setTone('friendly')}
            className={cn(
              "flex-1 sm:px-8 py-2 rounded-none text-xs font-black uppercase tracking-wider transition-all duration-200",
              tone === 'friendly' 
                ? "bg-[var(--color-primary)] text-white" 
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            סגנון ידידותי
          </button>
          <button
            onClick={() => setTone('official')}
            className={cn(
              "flex-1 sm:px-8 py-2 rounded-none text-xs font-black uppercase tracking-wider transition-all duration-200",
              tone === 'official' 
                ? "bg-[var(--color-primary)] text-white" 
                : "text-slate-400 hover:text-slate-200"
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
            className="w-full p-4.5 rounded-none bg-black border-2 border-[#27272a] text-slate-200 resize-none focus:outline-none focus:border-[var(--color-primary)] font-sans leading-relaxed text-sm sm:text-base"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-black py-3 rounded-none font-black text-xs uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#27272a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#27272a] transition-all"
          >
            <MessageCircle size={16} />
            שליחה בוואטסאפ
          </button>
          
          <div className="flex gap-4 flex-1">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-black border-2 border-[#27272a] text-slate-200 py-3 rounded-none font-bold text-xs uppercase tracking-widest hover:border-white transition-all"
            >
              {copied ? <Check size={16} className="text-[var(--color-success)]" /> : <Copy size={16} />}
              {copied ? 'הועתק!' : 'העתקה'}
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 border-2 border-[#27272a] text-slate-400 py-3 rounded-none font-bold text-xs uppercase tracking-widest hover:text-white transition-all"
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
