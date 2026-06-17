import { useState, useRef } from "react";
import { Shield, Mail, Lock, User, ArrowLeftRight, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, LockKeyhole, FileSpreadsheet } from "lucide-react";
import { supabase } from "../supabaseClient";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  async function handleGoogleLogin() {
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      console.error("Google OAuth failed:", err);
      setError(err.message || "שגיאה בתהליך האימות מול גוגל. אנא נסה שנית.");
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        // Sign In
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      } else {
        // Sign Up
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data?.user) {
          // Create custom user record
          const { error: profileError } = await supabase
            .from("users")
            .insert({
              id: data.user.id,
              full_name: fullName || "משתמש חדש",
              email: email,
              credits: 1,
            });

          if (profileError) {
            console.error("Error creating custom profile:", profileError);
          }
          
          setMessage("נרשמת בהצלחה! מייל אישור נשלח לתיבת הדואר שלך (או שהתחברת אוטומטית).");
        }
      }
    } catch (err) {
      console.error("Auth action failed:", err);
      setError(err.message || "שגיאה בתהליך האימות. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  }

  const handleCtaClick = () => {
    // Focus the email input or scroll to the form card
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
      const emailInput = formRef.current.querySelector('input[type="email"]');
      if (emailInput) emailInput.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Top mini-bar representing logo */}
      <div className={styles.landingHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.brand}>
            <div className={styles.logoIcon}>
              <Shield size={18} color="#fff" />
            </div>
            <span className={styles.brandText}>TlushSmart</span>
            <span className={styles.brandBadge}>AI</span>
          </div>
          <button className={styles.headerLoginBtn} onClick={handleCtaClick}>
            כניסת לקוחות
          </button>
        </div>
      </div>

      <div className={styles.landingContainer}>
        {/* HERO/LEFT SECTION */}
        <div className={styles.heroSection}>
          <span className={styles.heroTag}>⚡ ניתוח תלושי שכר מבוסס AI בישראל 2026</span>
          <h1 className={styles.heroTitle}>
            התלוש שלך שווה יותר.<br />
            <span>בדוק את זכויותיך בחינם.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            העלה את תלוש השכר שלך ותוך שניות מנוע ה-AI החכם יאתר הפרשות חסרות לפנסיה, חישובי שעות נוספות שגויים ואי-התאמות בדיני עבודה.
          </p>

          <div className={styles.ctaWrapper}>
            <button className={styles.ctaBtn} onClick={handleCtaClick}>
              העלאת תלוש שכר לניתוח מהיר
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Interactive Mock stub analytics details */}
          <div className={styles.mockStubCard}>
            <div className={styles.mockStubHeader}>
              <span className={styles.mockStubTitle}>דוגמה לדו"ח ניתוח שכר אוטומטי</span>
              <span className={styles.mockStubAmount}>סה"כ הפרשים שנמצאו: ₪2,340</span>
            </div>
            <div className={styles.mockStubList}>
              <div className={styles.mockStubItem}>
                <div className={styles.mockStubIconError}><AlertTriangle size={14} /></div>
                <div className={styles.mockStubInfo}>
                  <span className={styles.mockStubLabel}>הפרשה חסרה לפנסיה (סעיף 14)</span>
                  <span className={styles.mockStubWhy}>הופרשו רק 4% במקום 6.5% חובה לפי חוק.</span>
                </div>
                <span className={styles.mockStubValue}>- ₪1,500</span>
              </div>
              <div className={styles.mockStubItem}>
                <div className={styles.mockStubIconError}><AlertTriangle size={14} /></div>
                <div className={styles.mockStubInfo}>
                  <span className={styles.mockStubLabel}>שעות נוספות בחסר</span>
                  <span className={styles.mockStubWhy}>חישוב שגוי של 125% עבור שעתיים ראשונות.</span>
                </div>
                <span className={styles.mockStubValue}>- ₪450</span>
              </div>
              <div className={styles.mockStubItem}>
                <div className={styles.mockStubIconOk}><CheckCircle size={14} /></div>
                <div className={styles.mockStubInfo}>
                  <span className={styles.mockStubLabelOk}>מס הכנסה וביטוח לאומי</span>
                  <span className={styles.mockStubWhyOk}>ניכויים וזיכויים חושבו בהתאמה מלאה.</span>
                </div>
                <span className={styles.mockStubValueOk}>תקין ✓</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustBadge}>
              <LockKeyhole size={16} className={styles.trustIcon} />
              <span>אבטחת SSL מוצפנת</span>
            </div>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} className={styles.trustIcon} />
              <span>תואם דיני העבודה 2026</span>
            </div>
            <div className={styles.trustBadge}>
              <User size={16} className={styles.trustIcon} />
              <span>שמירה מלאה על פרטיות</span>
            </div>
          </div>
        </div>

        {/* AUTH/RIGHT CARD SECTION */}
        <div className={styles.authSection} ref={formRef}>
          <div className={styles.card}>
            <h2 className={styles.title}>
              {isLogin ? "כניסה למערכת" : "הרשמה בחינם"}
            </h2>
            <p className={styles.subtitle}>
              {isLogin ? "התחבר כדי לצפות בתלושים ובממצאים שלך" : "צור חשבון ותוך פחות מדקה תוכל לסרוק תלוש שכר"}
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              {message && <div className={styles.success}>{message}</div>}

              {!isLogin && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>שם מלא</label>
                  <div className={styles.inputWrap}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      type="text"
                      required
                      placeholder="ישראל ישראלי"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label className={styles.label}>דואר אלקטרוני</label>
                <div className={styles.inputWrap}>
                  <Mail size={18} className={styles.inputIcon} />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>סיסמה</label>
                <div className={styles.inputWrap}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-accent">
                {loading ? "מבצע אימות נתונים..." : isLogin ? "התחבר כעת" : "הרשם וסרוק תלוש"}
              </button>
            </form>

            <div className={styles.dividerContainer}>
              <div className={styles.dividerLine}></div>
              <span className={styles.dividerText}>או באמצעות</span>
              <div className={styles.dividerLine}></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className={styles.googleBtn}
            >
              <svg className={styles.googleIcon} viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>כניסה עם Google</span>
            </button>

            {/* Toggle */}
            <div className={styles.toggleWrap}>
              <button
                onClick={() => { setIsLogin(!isLogin); setError(""); setMessage(""); }}
                className={styles.toggleBtn}
              >
                <ArrowLeftRight size={14} />
                <span>
                  {isLogin ? "אין לך חשבון עדיין? לחץ להרשמה" : "כבר רשום במערכת? לחץ להתחברות"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
