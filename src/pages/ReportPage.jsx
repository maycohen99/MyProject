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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const scanId = Number(id);
        if (isNaN(scanId)) {
          // Check for latest scanned paycheck of this user in Supabase
          const { data: latest, error: latestErr } = await supabase
            .from("paystub")
            .select("id")
            .eq("user_id", user.id)
            .order("id", { ascending: false })
            .limit(1);

          if (!latestErr && latest && latest.length > 0) {
            await fetchSpecificScan(latest[0].id);
          } else {
            setScan(null);
            setLoading(false);
          }
          return;
        }

        await fetchSpecificScan(scanId);
      } catch (err) {
        console.error("Error fetching scan from Supabase, falling back to mock:", err);
        const scanId = Number(id);
        if (!isNaN(scanId)) {
          const fallbackScan = SCANS.find(s => s.id === scanId) ?? SCANS[0];
          setScan(fallbackScan);
        } else {
          setScan(null);
        }
      } finally {
        setLoading(false);
      }
    }

    async function fetchSpecificScan(scanId) {
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
        setScan(null);
      }
    }

    fetchScanData();
  }, [id]);

  function handleGoToAction() {
    localStorage.setItem("activeScanId", scan.id);
    navigate("/action");
  }

  if (loading) {
    return (
      <div className={`screen ${styles.page}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '3px solid rgba(0, 240, 255, 0.1)', borderTop: '3px solid var(--color-primary, #00f0ff)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1.2s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className={`screen ${styles.page}`}>
        <div className="container" style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "50px", marginBottom: "20px" }}>📊</div>
          <h1 className={styles.title}>לא נמצאו דוחות</h1>
          <p className={styles.subtitle} style={{ marginBottom: "30px" }}>
            עדיין לא סרקת תלושי שכר בחשבון זה. העלה את התלוש הראשון שלך כדי לקבל דוח ניתוח מפורט.
          </p>
          <button 
            className="btn-accent" 
            onClick={() => navigate("/upload")} 
            style={{ margin: "0 auto", display: "inline-flex", padding: "12px 24px", borderRadius: "12px" }}
          >
            סרוק תלוש שכר ראשון בחינם
          </button>
        </div>
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
