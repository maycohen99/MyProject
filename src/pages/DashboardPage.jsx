import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Shield } from "lucide-react";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import ScanItem from "../components/ScanItem/ScanItem";
import { SCANS } from "../data/mockData";
import { supabase } from "../supabaseClient";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);
  const [userName, setUserName] = useState("אורח");
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [userCredits, setUserCredits] = useState(0);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Bulletproof fallbacks: use user_metadata name, or email prefix, or default "משתמש"
          let resolvedName = user.user_metadata?.full_name || (user.email ? user.email.split("@")[0] : "משתמש");
          setUserName(resolvedName);

          // Safely try to fetch the custom profile from 'users' table
          try {
            const { data: profile } = await supabase
              .from("users")
              .select("full_name, credits, is_premium")
              .eq("id", user.id)
              .maybeSingle();

            if (profile) {
              if (profile.full_name) setUserName(profile.full_name);
              setIsPremium(Boolean(profile.is_premium));
              setUserCredits(Number(profile.credits || 0));
            }
          } catch (profileErr) {
            console.warn("Gracefully handled profile fetch warning:", profileErr);
          }

          // Fetch only this user's paystubs
          const { data, error } = await supabase
            .from("paystub")
            .select("*")
            .eq("user_id", user.id)
            .order("id", { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            const mapped = data.map(item => ({
              id: item.id,
              month: item.month_year,
              date: new Date(item.created_at).toLocaleDateString("he-IL"),
              status: item.status,
              total: Number(item.total_missing_amount || 0),
            }));
            setScans(mapped);
          } else {
            setScans([]);
          }
        } else {
          setScans(SCANS);
        }
      } catch (err) {
        console.error("Error fetching dashboard data, falling back:", err);
        setScans(SCANS);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const errorCount = scans.filter(s => s.status === "error").length;
  const okCount    = scans.filter(s => s.status === "ok").length;
  const totalRecoverable = scans.reduce((sum, s) => sum + Number(s.total || 0), 0);

  // Generate dynamic chart data based on scans list
  const chartScans = [...scans].slice(0, 5).reverse(); // take last 5 scans
  const maxMissingAmount = chartScans.reduce((max, s) => Math.max(max, s.total), 1);

  if (loading) {
    return (
      <div className={`screen ${styles.page}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ border: '3px solid rgba(15, 23, 42, 0.1)', borderTop: '3px solid var(--color-secondary)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1.2s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className={`screen ${styles.page}`}>
      <div className="container">
        {/* greeting */}
        <div className={styles.greeting}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <p className={styles.hello}>שלום, {userName} 👋</p>
              {isPremium ? (
                <span className="badge badge-success" style={{ fontSize: "0.68rem", padding: "2px 10px" }}>מנוי PREMIUM</span>
              ) : userCredits > 0 ? (
                <span className="badge" style={{ fontSize: "0.68rem", padding: "2px 10px", background: "var(--color-primary-10)", color: "var(--color-primary)", borderColor: "var(--color-border)" }}>{userCredits} סריקות זמינות</span>
              ) : (
                <span className="badge" style={{ fontSize: "0.68rem", padding: "2px 10px", background: "#fee2e2", color: "#ef4444", borderColor: "#fecaca" }}>חשבון חינמי</span>
              )}
            </div>
            <h1 className={styles.title}>לוח בקרה פיננסי</h1>
          </div>
          <div className={styles.avatar}>
            <span>{userName ? userName[0].toUpperCase() : "U"}</span>
          </div>
        </div>

        {/* Dashboard Responsive Grid */}
        <div className={styles.grid}>
          {/* Main Column */}
          <div className={styles.mainCol}>
            {/* Corporate Gradient Hero Banner */}
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h3 className={styles.heroTitle}>ניתוח תלושים חכם ב-AI</h3>
                <p className={styles.heroSubtitle}>
                  המערכת סורקת ומזהה באופן אוטומטי פערים בהפרשות לפנסיה, שעות נוספות לא משולמות ודמי הבראה. כל הבדיקות מבוצעות בהתאמה מלאה לחוק הגנת השכר ודיני העבודה בישראל.
                </p>
              </div>
            </div>

            {/* Corporate Telemetry Chart */}
            {chartScans.length > 0 && (
              <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>מגמת פערים תקופתית</h3>
                  <span className={styles.chartSubtitle}>הפרשים שאותרו (₪)</span>
                </div>
                <div className={styles.chartVisual}>
                  {chartScans.map((s, idx) => {
                    const heightPercent = s.total > 0 ? (s.total / maxMissingAmount) * 100 : 10;
                    return (
                      <div key={s.id || idx} className={styles.chartBarWrap}>
                        <div className={styles.chartBarOuter}>
                          <div 
                            className={`${styles.chartBar} ${s.total > 0 ? styles.chartBarActive : styles.chartBarInactive}`}
                            style={{ 
                              height: `${Math.max(heightPercent, 12)}%`,
                            }}
                            title={`${s.month}: ₪${s.total}`}
                          />
                        </div>
                        <span className={styles.chartBarLabel}>
                          {s.month.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scan History */}
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>תלושים אחרונים שנסרקו</h2>
                <button className={styles.seeAll}>כל התלושים</button>
              </div>
              <div className={styles.list}>
                {scans.length > 0 ? (
                  scans.map(scan => (
                    <ScanItem key={scan.id} scan={scan} />
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    טרם נסרקו תלושי שכר במערכת. לחץ על "סרוק תלוש חדש" להתחלה.
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Side Column */}
          <div className={styles.sideCol}>
            {/* Stats Summary Card */}
            <SummaryCard
              total={totalRecoverable}
              scanCount={scans.length}
              errorCount={errorCount}
              okCount={okCount}
            />

            {/* Legal info Tip Card */}
            <div className={styles.tip}>
              <Shield size={20} className={styles.tipIcon} />
              <div>
                <p className={styles.tipTitle}>שמירה על זכויות העובד</p>
                <p className={styles.tipBody}>
                  לפי מחקרי משרד העבודה, מעל 80% מהעובדים השכירים בישראל סובלים מאי-התאמות בתלושי השכר בשל חוסר מודעות או טעויות חישוב מנהליות.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate FAB */}
      <button
        className={styles.fab}
        onClick={() => navigate("/upload")}
        aria-label="סרוק תלוש חדש"
      >
        <Plus size={18} />
        סרוק תלוש חדש
      </button>
    </div>
  );
}
