import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2, Briefcase, ArrowRight } from "lucide-react";
import FindingRow from "../components/FindingRow/FindingRow";
import { SCANS } from "../data/mockData";
import { supabase } from "../supabaseClient";
import styles from "./ReportPage.module.css";

export default function ReportPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScanData() {
      try {
        const scanId = Number(id);
        if (isNaN(scanId)) {
          setScan(SCANS[0]);
          setLoading(false);
          return;
        }

        const { data: scanData, error: scanErr } = await supabase
          .from("paystub")
          .select("*")
          .eq("id", scanId)
          .single();

        if (scanErr) throw scanErr;

        const { data: findingsData, error: findingsErr } = await supabase
          .from("finding")
          .select("*")
          .eq("paystub_id", scanId);

        if (findingsErr) throw findingsErr;

        if (scanData) {
          setScan({
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
          const fallbackScan = SCANS.find(s => s.id === scanId) ?? SCANS[0];
          setScan(fallbackScan);
        }
      } catch (err) {
        console.error("Error fetching scan from Supabase, falling back to mock:", err);
        const scanId = Number(id);
        const fallbackScan = SCANS.find(s => s.id === scanId) ?? SCANS[0];
        setScan(fallbackScan);
      } finally {
        setLoading(false);
      }
    }
    fetchScanData();
  }, [id]);

  function handleGoToAction() {
    localStorage.setItem("activeScanId", scan.id);
    navigate("/action");
  }

  if (loading || !scan) {
    return (
      <div className={`screen ${styles.page}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '3px solid rgba(0, 240, 255, 0.1)', borderTop: '3px solid var(--color-primary, #00f0ff)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1.2s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const errors = scan.findings ? scan.findings.filter(f => f.type === "error") : [];
  const oks    = scan.findings ? scan.findings.filter(f => f.type === "ok") : [];

  return (
    <div className={`screen ${styles.page}`}>
      <div className="container">
        {/* back */}
        <button className={styles.back} onClick={() => navigate("/")}>
          <ArrowRight size={16} />
          <span>חזרה ללוח הבקרה</span>
        </button>

        <h1 className={styles.title}>דו"ח ניתוח שכר</h1>
        <p className={styles.subtitle}>{scan.month} · {scan.date}</p>

        {/* summary strip */}
        {scan.total > 0 ? (
          <div className={`${styles.strip} ${styles.stripError}`}>
            <div>
              <p className={styles.stripLabel}>סה"כ הפרשים שנמצאו</p>
              <p className={styles.stripAmount}>₪{scan.total.toLocaleString()}</p>
            </div>
            <AlertCircle size={32} style={{ filter: "drop-shadow(0 0 5px var(--color-error))" }} />
          </div>
        ) : (
          <div className={`${styles.strip} ${styles.stripOk}`}>
            <div>
              <p className={styles.stripLabel}>התלוש נמצא תקין</p>
              <p className={styles.stripOkText}>כל הזכויות שולמו במלואן ✓</p>
            </div>
            <CheckCircle2 size={32} style={{ filter: "drop-shadow(0 0 5px var(--color-success))" }} />
          </div>
        )}

        {/* errors */}
        {errors.length > 0 && (
          <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionError}`}>
              <AlertCircle size={14} />
              ממצאים שדורשים תשומת לב ({errors.length})
            </h2>
            <div className={styles.list}>
              {errors.map(f => <FindingRow key={f.id} finding={f} />)}
            </div>
          </section>
        )}

        {/* oks */}
        {oks.length > 0 && (
          <section className={styles.section}>
            <h2 className={`${styles.sectionTitle} ${styles.sectionOk}`}>
              <CheckCircle2 size={14} />
              בדיקות שנמצאו תקינות ({oks.length})
            </h2>
            <div className={styles.list}>
              {oks.map(f => <FindingRow key={f.id} finding={f} />)}
            </div>
          </section>
        )}

        {/* CTA */}
        {scan.total > 0 && (
          <button
            className={`btn-accent ${styles.cta}`}
            onClick={handleGoToAction}
          >
            <Briefcase size={18} />
            צור מכתב פנייה למעסיק
          </button>
        )}
      </div>
    </div>
  );
}
