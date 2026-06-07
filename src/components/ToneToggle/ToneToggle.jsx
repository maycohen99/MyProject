import { Briefcase, MessageSquare } from "lucide-react";
import styles from "./ToneToggle.module.css";

const OPTIONS = [
  { id: "formal",   label: "רשמי ומקצועי",  Icon: Briefcase    },
  { id: "friendly", label: "ידידותי",        Icon: MessageSquare },
];

export default function ToneToggle({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.heading}>סגנון הפנייה</p>
      <div className={styles.track}>
        {OPTIONS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`${styles.option} ${value === id ? styles.active : ""}`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>
      <p className={styles.hint}>
        {value === "formal"
          ? "🔒 מכתב מקצועי המתאים לפנייה רשמית"
          : "💬 פנייה ישירה ואנושית — מומלץ בשלב ראשון"}
      </p>
    </div>
  );
}
