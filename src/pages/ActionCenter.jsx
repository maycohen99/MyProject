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
        <Link to="/report" className="p-2 rounded-full hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-bold text-[var(--color-on-background)]">מרכז פעולה</h1>
      </div>

      <div className="bg-[var(--color-primary-container)] rounded-[var(--radius-xl)] p-6 shadow-ambient">
        <h2 className="text-xl font-bold text-[var(--color-on-primary-container)] mb-2">מחולל פניות למעסיק</h2>
        <p className="text-[var(--color-inverse-primary)] text-sm">
          הכנו עבורך נוסח מוכן לשליחה. בחרי את הסגנון שמתאים לך.
        </p>
      </div>

      <Card className="flex flex-col gap-6 p-6">
        {/* Toggle */}
        <div className="flex bg-[var(--color-surface-container)] rounded-[var(--radius-md)] p-1 relative w-full sm:w-fit">
          <button
            onClick={() => setTone('friendly')}
            className={cn(
              "flex-1 sm:px-8 py-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-all",
              tone === 'friendly' ? "bg-white shadow-sm text-[var(--color-on-surface)]" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
            )}
          >
            סגנון ידידותי
          </button>
          <button
            onClick={() => setTone('official')}
            className={cn(
              "flex-1 sm:px-8 py-2 rounded-[var(--radius-sm)] text-sm font-semibold transition-all",
              tone === 'official' ? "bg-white shadow-sm text-[var(--color-on-surface)]" : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]"
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
            className="w-full p-4 rounded-[var(--radius-md)] bg-[var(--color-surface-container-lowest)] border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] resize-none focus:outline-none focus:border-[var(--color-primary)] font-sans leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-[var(--radius-md)] font-bold hover:scale-[1.02] transition-transform shadow-ambient"
          >
            <MessageCircle size={20} />
            שליחה בוואטסאפ
          </button>
          
          <div className="flex gap-3 flex-1">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] py-3 rounded-[var(--radius-md)] font-semibold hover:bg-[var(--color-surface-container-highest)] transition-colors"
            >
              {copied ? <Check size={20} className="text-[var(--color-success)]" /> : <Copy size={20} />}
              {copied ? 'הועתק!' : 'העתקה'}
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] py-3 rounded-[var(--radius-md)] font-semibold hover:bg-[var(--color-surface-container-low)] transition-colors"
            >
              <Download size={20} />
              הורדה
            </button>
          </div>
        </div>
      </Card>

    </div>
  );
}
