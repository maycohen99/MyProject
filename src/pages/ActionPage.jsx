import { useState, useEffect } from "react";
import { TrendingUp, Share2, Download, Shield } from "lucide-react";
import ToneToggle from "../components/ToneToggle/ToneToggle";
import LetterPreview from "../components/LetterPreview/LetterPreview";
import { SCANS } from "../data/mockData";
import { supabase } from "../supabaseClient";
import styles from "./ActionPage.module.css";

function generateLetter(findings, total, tone = "formal") {
  const errorFindings = findings ? findings.filter(f => f.type === "error") : [];
  
  const findingsListStr = errorFindings.map(f => {
    if (tone === "formal") {
      return `• ${f.label} – ₪${f.amount.toLocaleString()}`;
    } else {
      return `- ${f.label}: נראה שהופרש פחות ממה שצריך (₪${f.amount.toLocaleString()} חסרים)`;
    }
  }).join("\n");

  if (tone === "formal") {
    return `לכבוד מחלקת משאבי אנוש,

בהתאם לבדיקה מקצועית שביצעתי לתלושי השכר שלי, עלו מספר אי-התאמות מהותיות בחישוב הזכויות המגיעות לי על-פי חוק.

הפערים שאותרו:
${findingsListStr}

סה"כ פערים: ₪${total.toLocaleString()}

אבקשכם לבדוק את הנושא בדחיפות ולהשיב בתוך 14 ימי עסקים.

בכבוד רב,
יובל כהן`;
  } else {
    return `היי,

עברתי על תלושי השכר שלי לאחרונה ושמתי לב שיש כמה דברים שנראים לא בסדר:

${findingsListStr}

ביחד מדובר בכ-₪${total.toLocaleString()} שמגיעים לי.

אשמח שנדבר ונסדר את זה — אני בטוח שמדובר בטעות.

תודה!
יובל`;
  }
}

export default function ActionPage() {
  const [activeScan, setActiveScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tone, setTone] = useState("formal");

  useEffect(() => {
    async function fetchActiveScan() {
      try {
        const activeScanId = localStorage.getItem("activeScanId");
        
        let targetId = Number(activeScanId);
        if (!activeScanId || isNaN(targetId)) {
          const defaultScan = SCANS.find(s => s.status === "error") || SCANS[0];
          setActiveScan(defaultScan);
          setLoading(false);
          return;
        }

        const { data: scanData, error: scanErr } = await supabase
          .from("paystub")
          .select("*")
          .eq("id", targetId)
          .single();

        if (scanErr) throw scanErr;

        const { data: findingsData, error: findingsErr } = await supabase
          .from("finding")
          .select("*")
          .eq("paystub_id", targetId);

        if (findingsErr) throw findingsErr;

        if (scanData) {
          setActiveScan({
            id: scanData.id,
            month: scanData.month_year,
            date: new Date(scanData.created_at).toLocaleDateString("he-IL"),
            status: scanData.status,
            total: Number(scanData.total_missing_amount || 0),
            findings: (findingsData || []).map(f => ({
              id: f.id,
              label: f.title,
              amount: Number(f.amount || 0),
              type: f.is_error ? "error" : "ok",
              why: f.explanation,
            })),
          });
        } else {
          const defaultScan = SCANS.find(s => s.status === "error") || SCANS[0];
          setActiveScan(defaultScan);
        }
      } catch (err) {
        console.error("Error loading active scan for letter generator:", err);
        const defaultScan = SCANS.find(s => s.status === "error") || SCANS[0];
        setActiveScan(defaultScan);
      } finally {
        setLoading(false);
      }
    }
    fetchActiveScan();
  }, []);

  if (loading || !activeScan) {
    return (
      <div className={`screen ${styles.page}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '3px solid rgba(255, 255, 255, 0.1)', borderTop: '3px solid var(--accent, #ff4a5a)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1.2s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const letter = generateLetter(activeScan.findings, activeScan.total, tone);

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(letter)}`, "_blank");
  }

  function downloadTxt() {
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(letter);
    a.download = `tlushsmart_letter_${Date.now()}.txt`;
    a.click();
  }

  return (
    <div className={`screen ${styles.page}`}>
      <div className="container">
        <h1 className={styles.title}>מרכז פעולה</h1>
        <p className={styles.subtitle}>צור מכתב פנייה למעסיקך על בסיס ממצאי הבדיקה</p>

        {/* context pill */}
        {activeScan && (
          <div className={styles.context}>
            <div className={styles.contextIcon}><TrendingUp size={18} color="#fff" /></div>
            <div className={styles.contextText}>
              <span className={styles.contextLabel}>מבוסס על דו"ח {activeScan.month}</span>
              <span className={styles.contextAmount}>₪{activeScan.total.toLocaleString()} ניתן לדרוש</span>
            </div>
          </div>
        )}

        {/* tone toggle */}
        <ToneToggle value={tone} onChange={setTone} />

        {/* letter preview */}
        <div className={styles.previewWrap}>
          <LetterPreview text={letter} tone={tone} />
        </div>

        {/* actions */}
        <button className={`${styles.whatsapp}`} onClick={shareWhatsApp}>
          <Share2 size={20} />
          שתף ב-WhatsApp
        </button>

        <button className="btn-outline" onClick={downloadTxt}>
          <Download size={18} />
          הורד כקובץ טקסט
        </button>

        {/* disclaimer */}
        <div className={styles.disclaimer}>
          <Shield size={16} className={styles.disclaimerIcon} />
          <p>
            המכתב נוצר אוטומטית על בסיס הממצאים. מומלץ לעיין בו לפני שליחה.
            TlushSmart אינה אחראית לתוצאות המשא ומתן.
          </p>
        </div>
      </div>
    </div>
  );
}
