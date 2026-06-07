import { Clock } from "lucide-react";
import styles from "./LetterPreview.module.css";

export default function LetterPreview({ text, tone }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <span className={styles.type}>
          {tone === "formal" ? "📄 מכתב רשמי" : "✉️ הודעה ישירה"}
        </span>
        <div className={styles.meta}>
          <Clock size={13} />
          <span>נוצר כעת</span>
        </div>
      </div>
      <div className={styles.body} dir="rtl">
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}
