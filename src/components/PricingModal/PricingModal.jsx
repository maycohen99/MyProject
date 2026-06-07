import { ShieldCheck, Flame, CreditCard, Sparkles, Check } from "lucide-react";
import styles from "./PricingModal.module.css";

const PLANS = [
  {
    id: "single",
    title: "בדיקת תלוש בודד",
    price: "₪29",
    period: "חד-פעמי",
    description: "בדיקה מהירה ומעמיקה של תלוש שכר בודד, איתור כל חסרי הפנסיה והשעות הנוספות.",
    features: [
      "ניתוח AI מלא ומיידי של התלוש",
      "איתור הפרשות חסרות לפנסיה",
      "בדיקת חישובי שעות נוספות",
      "גישה לממצאי הבדיקה למשך שנה",
    ],
    recommended: false,
    cta: "בחר בדיקה בודדת",
  },
  {
    id: "annual",
    title: "מנוי הגנה שנתי",
    price: "₪99",
    period: "לשנה",
    description: "הגנה שוטפת וניתוח של כל תלושי השכר שלך לאורך השנה כולה. הכי משתלם ומעניק שקט נפשי.",
    features: [
      "סריקות ללא הגבלה של כל התלושים שלך",
      "איתור פערים פנסיוניים מורכבים",
      "מחולל מכתבי פנייה אוטומטיים למעסיק",
      "עדכוני חקיקה ודיני עבודה שוטפים",
      "תמיכה מועדפת (Priority Support)",
    ],
    recommended: true,
    cta: "התחל מנוי הגנה שנתי",
  },
];

export default function PricingModal({ onSelectPlan, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={14} className={styles.badgeIcon} />
            <span>התוכנית אינה חינמית יותר</span>
          </div>
          <h2 className={styles.title}>בחירת תוכנית בדיקה</h2>
          <p className={styles.subtitle}>
            מנוע ה-AI של TlushSmart מזהה הפרשות חסרות ועוזר לך לקבל את מה שמגיע לך כחוק. בחר את התוכנית המתאימה לך להתחלת הניתוח.
          </p>
        </div>

        <div className={styles.plansGrid}>
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`${styles.planCard} ${plan.recommended ? styles.planCardRecommended : ""}`}
            >
              {plan.recommended && (
                <div className={styles.recommendTag}>
                  <Flame size={12} />
                  <span>הכי פופולרי</span>
                </div>
              )}

              <h3 className={styles.planTitle}>{plan.title}</h3>
              <div className={styles.priceRow}>
                <span className={styles.price}>{plan.price}</span>
                <span className={styles.period}>/ {plan.period}</span>
              </div>
              <p className={styles.planDesc}>{plan.description}</p>

              <ul className={styles.featuresList}>
                {plan.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <Check size={14} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={plan.recommended ? "btn-accent" : "btn-outline"}
                onClick={() => onSelectPlan(plan)}
              >
                <CreditCard size={16} />
                <span>{plan.cta}</span>
              </button>
            </div>
          ))}
        </div>

        {onCancel && (
          <button className={styles.cancelBtn} onClick={onCancel}>
            חזרה ללוח הבקרה
          </button>
        )}

        <div className={styles.footer}>
          <ShieldCheck size={16} className={styles.footerIcon} />
          <span>רכישה מאובטחת תחת תקן PCI-DSS. הפרטיות שלך היא בראש סדר העדיפויות שלנו.</span>
        </div>
      </div>
    </div>
  );
}
