import { useState } from "react";
import { CreditCard, Lock, ArrowLeft, ShieldCheck, HelpCircle } from "lucide-react";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm({ plan, onSubmitSuccess, onBack }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCardNumberChange = (e) => {
    // Format card number with spaces every 4 digits
    const val = e.target.value.replace(/\D/g, "").substring(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    // Format MM/YY
    const val = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 3) {
      setExpiry(`${val.substring(0, 2)}/${val.substring(2, 4)}`);
    } else {
      setExpiry(val);
    }
  };

  const handleCvvChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCvv(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (cardNumber.replace(/\s/g, "").length < 16) {
      setError("מספר כרטיס האשראי חייב להכיל 16 ספרות");
      return;
    }
    if (expiry.length < 5) {
      setError("תאריך התפוגה אינו תקין (MM/YY)");
      return;
    }
    if (cvv.length < 3) {
      setError("קוד בגב הכרטיס (CVV) חייב להכיל 3 ספרות");
      return;
    }
    if (!name.trim()) {
      setError("אנא הזן את שם בעל הכרטיס");
      return;
    }

    setLoading(true);

    // Simulate payment gateway delay (2.5 seconds)
    setTimeout(() => {
      setLoading(false);
      onSubmitSuccess(plan);
    }, 2500);
  };

  // Determine card brand preview
  const isVisa = cardNumber.startsWith("4");
  const isMastercard = cardNumber.startsWith("5");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={16} />
          <span>חזרה לתוכניות</span>
        </button>
        <h2 className={styles.title}>סליקה מאובטחת</h2>
        <p className={styles.subtitle}>שלם בצורה מאובטחת כדי לפתוח את ניתוח ה-AI</p>
      </div>

      <div className={styles.summaryBox}>
        <span className={styles.summaryLabel}>החבילה שנבחרה:</span>
        <span className={styles.summaryPlan}>{plan.title}</span>
        <span className={styles.summaryPrice}>{plan.price}</span>
      </div>

      <div className={styles.grid}>
        {/* Virtual card mockup */}
        <div className={styles.cardPreviewWrap}>
          <div className={`${styles.virtualCard} ${isVisa ? styles.visaBg : isMastercard ? styles.mastercardBg : ""}`}>
            <div className={styles.cardChip} />
            <div className={styles.cardBrand}>
              {isVisa ? "Visa" : isMastercard ? "Mastercard" : "Credit"}
            </div>
            <div className={styles.cardNumberDisplay}>
              {cardNumber || "•••• •••• •••• ••••"}
            </div>
            <div className={styles.cardMeta}>
              <div className={styles.cardHolder}>
                <span className={styles.cardLabel}>בעל הכרטיס</span>
                <span className={styles.cardValue}>{name.toUpperCase() || "ISRAEL ISRAELI"}</span>
              </div>
              <div className={styles.cardExpiry}>
                <span className={styles.cardLabel}>תוקף</span>
                <span className={styles.cardValue}>{expiry || "MM/YY"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secure Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label className={styles.label}>שם בעל הכרטיס</label>
            <input
              type="text"
              required
              placeholder="ישראל ישראלי"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>מספר כרטיס אשראי</label>
            <div className={styles.inputWithIcon}>
              <CreditCard size={18} className={styles.inputIcon} />
              <input
                type="text"
                required
                placeholder="4580 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>תוקף הכרטיס</label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                value={expiry}
                onChange={handleExpiryChange}
                className={styles.input}
                disabled={loading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>קוד אבטחה (CVV)</label>
              <input
                type="password"
                required
                placeholder="123"
                value={cvv}
                onChange={handleCvvChange}
                className={styles.input}
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn-accent" disabled={loading}>
            {loading ? (
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner} />
                <span>מעבד תשלום מאובטח...</span>
              </div>
            ) : (
              <>
                <Lock size={16} />
                <span>שלם {plan.price} בצורה מאובטחת</span>
              </>
            )}
          </button>

          <div className={styles.secureBadge}>
            <ShieldCheck size={16} className={styles.badgeIcon} />
            <span>סליקה מאובטחת מוצפנת בטכנולוגיית SSL/PCI-DSS</span>
          </div>
        </form>
      </div>
    </div>
  );
}
