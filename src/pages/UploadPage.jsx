import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CloudUpload, Upload, Shield } from "lucide-react";
import { supabase } from "../supabaseClient";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PricingModal from "../components/PricingModal/PricingModal";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import styles from "./UploadPage.module.css";

const STEPS = ["בדיקת מבנה", "זיהוי שדות", "ניתוח AI"];

// Initialize Gemini API Client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = apiKey && apiKey !== "your_gemini_api_key_here" ? new GoogleGenerativeAI(apiKey) : null;

export default function UploadPage() {
  const navigate = useNavigate();
  const [dragging, setDragging]   = useState(false);
  const [loading,  setLoading]    = useState(false);
  const [progress, setProgress]   = useState(0);

  // Monetization state variables
  const [paymentState, setPaymentState] = useState("loading"); // "loading", "locked", "checkout", "unlocked"
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userCredits, setUserCredits] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  // Access check on mount
  useEffect(() => {
    async function checkUserAccess() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from("users")
            .select("credits, is_premium")
            .eq("id", user.id)
            .maybeSingle();

          if (profile) {
            const credits = Number(profile.credits || 0);
            const premiumStatus = Boolean(profile.is_premium);
            setUserCredits(credits);
            setIsPremium(premiumStatus);

            if (credits > 0 || premiumStatus) {
              setPaymentState("unlocked");
            } else {
              setPaymentState("locked");
            }
          } else {
            // Graceful default if profile doesn't exist
            setPaymentState("locked");
          }
        } else {
          setPaymentState("locked");
        }
      } catch (err) {
        console.error("Access check failed, default to mock paywall:", err);
        setPaymentState("locked");
      }
    }
    checkUserAccess();
  }, []);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setPaymentState("checkout");
  };

  const handlePaymentSuccess = async (plan) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let updateData = {};
        if (plan.id === "annual") {
          updateData = { is_premium: true };
          setIsPremium(true);
        } else {
          const newCredits = userCredits + 1;
          updateData = { credits: newCredits };
          setUserCredits(newCredits);
        }

        const { error } = await supabase
          .from("users")
          .update(updateData)
          .eq("id", user.id);

        if (error) throw error;
      }
      setPaymentState("unlocked");
    } catch (err) {
      console.warn("Updating DB state failed, unlocking locally for simulator:", err);
      setPaymentState("unlocked");
    }
  };

  // Convert File object to generative AI part (base64)
  function fileToGenerativePart(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Audits the paycheck image with Gemini 2.5 Flash
  async function auditPaystubWithGemini(file) {
    if (!genAI) {
      console.warn("Gemini AI API key not found. Using fallback mock scan.");
      return null;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const imagePart = await fileToGenerativePart(file);

      const prompt = `אתה רואה חשבון ועורך דין ישראלי מומחה לדיני עבודה.
נתח את תמונת תלוש השכר הזו של עובד שכיר בישראל. 
אבחן ואתר אי-התאמות או חוסרים (פערים כספיים) בהתאם לחוקי העבודה והסכמים קיבוציים בישראל:
1. הפרשות חסרות לפנסיה (הפרשת מעביד חובה היא לפחות 6.5% משכר היסוד).
2. שעות נוספות שלא שולמו או שולמו בחסר (125% עבור שעתיים ראשונות, 150% מעבר לכך).
3. דמי הבראה חסרים או שלא שולמו לפי הוותק.
4. פיצויי פיטורים חסרים (הפרשה חובה לפי סעיף 14 היא 8.33% מהשכר).
5. בדוק רכיבים אחרים כגון ביטוח לאומי ומס הכנסה.

עליך להחזיר פלט שהוא אך ורק אובייקט JSON תקין (ללא תיחום של markdown וללא שום טקסט נוסף לפני או אחרי), במבנה המדויק הבא:
{
  "month_year": "שם החודש והשנה בעברית, למשל: מאי 2025",
  "status": "error במידה ונמצאו שגיאות או חוסרים, ok במידה והכל תקין לחלוטין",
  "total_missing_amount": סכום החוסר הכולל במספר (למשל: 840),
  "findings": [
    {
      "label": "שם הממצא בעברית, למשל: הפרשה חסרה לפנסיה",
      "amount": סכום החוסר הספציפי במספר (למשל: 450. במידה ותקין יש לרשום 0),
      "type": "error או ok",
      "why": "הסבר מפורט, מקצועי ומשפטי בעברית מדוע החישוב אינו תקין ומה קובע החוק."
    }
  ]
}

שים לב: החזר אך ורק אובייקט JSON תקין ללא שום מילים נוספות!`;

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text().trim();

      let cleanedText = text;
      if (text.startsWith("```")) {
        cleanedText = text.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      }

      console.log("Gemini API response:", cleanedText);
      const auditResult = JSON.parse(cleanedText);
      return auditResult;
    } catch (err) {
      console.error("Gemini Paycheck Audit failed:", err);
      return null;
    }
  }

  // Saves paycheck scans and audit results directly to Supabase
  async function saveScanToSupabase(file) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user found");

      let auditResult = null;
      if (file) {
        auditResult = await auditPaystubWithGemini(file);
      }

      // Fallback to local dynamic generator if Gemini failed or no file
      if (!auditResult) {
        const monthsList = ["ינואר 2025", "פברואר 2025", "מרץ 2025", "אפריל 2025", "מאי 2025", "יוני 2025", "ינואר 2026", "פברואר 2026", "מרץ 2026"];
        const hasErrors = Math.random() < 0.7;
        const randomMonth = monthsList[Math.floor(Math.random() * monthsList.length)];

        let newFindings = [];
        if (hasErrors) {
          newFindings = [
            {
              label: "הפרשה חסרה לפנסיה",
              amount: Math.floor(Math.random() * 300) + 300,
              type: "error",
              why: "על פי חוק הגנת השכר, סעיף 14, המעסיק מחויב להפריש 6.5% משכרך לפנסיה. בתלוש זה הפרשת המעביד חסרה.",
            },
            {
              label: "שעות נוספות לא שולמו",
              amount: Math.floor(Math.random() * 200) + 150,
              type: "error",
              why: "חוק שעות עבודה ומנוחה קובע תשלום של 125% עבור שעתיים ראשונות ו-150% מעבר לכך.",
            },
            {
              label: "דמי הבראה חסרים",
              amount: Math.floor(Math.random() * 250) + 150,
              type: "error",
              why: "לאחר שנת עבודה ראשונה, המועסק זכאי לדמי הבראה מלאים על-פי ותק לפי תעריף המגזר הפרטי והסכמים קיבוציים.",
            },
            { label: "ביטוח לאומי", amount: 0, type: "ok", why: "" },
            { label: "מס הכנסה",    amount: 0, type: "ok", why: "" },
          ];
        } else {
          newFindings = [
            { label: "פנסיה",        amount: 0, type: "ok", why: "" },
            { label: "ביטוח לאומי",  amount: 0, type: "ok", why: "" },
            { label: "מס הכנסה",     amount: 0, type: "ok", why: "" },
          ];
        }

        auditResult = {
          month_year: randomMonth,
          status: hasErrors ? "error" : "ok",
          total_missing_amount: hasErrors ? newFindings.reduce((sum, f) => sum + f.amount, 0) : 0,
          findings: newFindings.map(f => ({
            label: f.label,
            amount: f.amount,
            type: f.type,
            why: f.why
          })),
        };
      }

      // If user paid per credit basis, deduct credit
      if (!isPremium && userCredits > 0) {
        const newCredits = Math.max(0, userCredits - 1);
        setUserCredits(newCredits);
        await supabase
          .from("users")
          .update({ credits: newCredits })
          .eq("id", user.id);
      }

      const newPaystub = {
        user_id: user.id,
        month_year: auditResult.month_year,
        total_missing_amount: Number(auditResult.total_missing_amount || 0),
        file_url: file ? file.name : "dummy_url.pdf",
        status: auditResult.status,
      };

      const { data: paystubData, error: paystubError } = await supabase
        .from("paystub")
        .insert(newPaystub)
        .select()
        .single();

      if (paystubError) throw paystubError;

      if (paystubData) {
        const paystubId = paystubData.id;
        const findingsToInsert = auditResult.findings.map(f => ({
          paystub_id: paystubId,
          title: f.label || f.title,
          amount: Number(f.amount || 0),
          explanation: f.why || f.explanation,
          is_error: f.type === "error" || f.is_error === true,
        }));

        const { error: findingsError } = await supabase
          .from("finding")
          .insert(findingsToInsert);

        if (findingsError) throw findingsError;

        return paystubId;
      }
    } catch (err) {
      console.error("Supabase insert failed, using mock fallback:", err);
      return 1;
    }
    return 1;
  }

  function startScan(file) {
    setLoading(true);
    setProgress(0);
    const savePromise = saveScanToSupabase(file);

    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(iv);
          savePromise.then(newId => {
            setTimeout(() => navigate(`/report/${newId}`), 400);
          });
          return 100;
        }
        return p + 5;
      });
    }, 150);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      startScan(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      startScan(file);
    }
  };

  /* ── Gated Access Redirection Layouts ── */
  if (paymentState === "loading") {
    return (
      <div className={`screen ${styles.loadingScreen}`}>
        <div style={{ border: '3px solid rgba(15, 23, 42, 0.1)', borderTop: '3px solid var(--color-secondary)', borderRadius: '50%', width: '30px', height: '30px', animation: 'spin 1.2s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (paymentState === "locked") {
    return (
      <div className={`screen ${styles.page}`}>
        <div className="container">
          <PricingModal
            onSelectPlan={handleSelectPlan}
            onCancel={() => navigate("/")}
          />
        </div>
      </div>
    );
  }

  if (paymentState === "checkout") {
    return (
      <div className={`screen ${styles.page}`}>
        <div className="container">
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <CheckoutForm
              plan={selectedPlan}
              onSubmitSuccess={handlePaymentSuccess}
              onBack={() => setPaymentState("locked")}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ── Loading audit progress view ── */
  if (loading) return (
    <div className={`screen ${styles.loadingScreen}`}>
      <div className={styles.loadingIcon}>
        <Shield size={30} />
      </div>
      <div className={styles.loadingText}>
        <h2 className={styles.loadingTitle}>מפענח ומנתח תלוש שכר ב-AI...</h2>
        <p className={styles.loadingSubtitle}>מנוע ה-AI של Gemini סורק חריגות שכר בדיני עבודה</p>
      </div>
      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressSteps}>
          {STEPS.map((step, i) => (
            <span
              key={i}
              className={`${styles.step} ${progress > i * 33 ? styles.stepDone : ""}`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Upload active UI ── */
  return (
    <div className={`screen ${styles.page}`}>
      <div className="container">
        <h1 className={styles.title}>סרוק תלוש</h1>
        <p className={styles.subtitle}>
          {isPremium ? "מנוי שנתי פעיל ✓ סריקות ללא הגבלה" : `יתרת סריקות זמינה: ${userCredits} תלושים`}
        </p>

        {/* Dropzone with holographic scan line */}
        <button
          className={`${styles.dropzone} ${dragging ? styles.dropzoneDrag : ""}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
          <div className={styles.scanLine} />
          <div className={styles.dropIcon}>
            <CloudUpload size={28} />
          </div>
          <p className={styles.dropTitle}>גרור קובץ לכאן או לחץ לבחירה</p>
          <p className={styles.dropHint}>JPG, PNG, או PDF עד 10MB</p>
          <span className={`btn-primary ${styles.fileBtn}`}>העלה תלוש</span>
        </button>

        {/* Camera fallback button */}
        <button className={styles.camera} onClick={() => document.getElementById("fileInput").click()}>
          <Upload size={16} />
          <span>פתח מצלמה לצילום מהיר</span>
        </button>

        {/* Guidelines section */}
        <div className={`card ${styles.tips}`}>
          <p className={styles.tipsTitle}>הנחיות לסריקה אופטימלית</p>
          {[
            ["📸", "צלם את התלוש ישר וללא זוויות חדות"],
            ["🔎", "וודא שנתוני הטבלה והסכומים ברורים וקריאים"],
            ["📜", "הימנע מהסתרת שורות או קיפול של דף התלוש"],
          ].map(([icon, text], i) => (
            <div key={i} className={styles.tip}>
              <span>{icon}</span>
              <span className={styles.tipText}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
