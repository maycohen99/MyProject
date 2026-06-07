import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./ScanItem.module.css";

export default function ScanItem({ scan }) {
  const navigate = useNavigate();

  return (
    <button
      className={styles.item}
      onClick={() => navigate(`/report/${scan.id}`)}
      aria-label={`פתח דו"ח לחודש ${scan.month}`}
    >
      <div className={`${styles.iconWrap} ${scan.status === "error" ? styles.iconError : styles.iconOk}`}>
        {scan.status === "error"
          ? <AlertCircle size={20} />
          : <CheckCircle2 size={20} />}
      </div>

      <div className={styles.info}>
        <p className={styles.month}>{scan.month}</p>
        <p className={styles.date}>{scan.date}</p>
      </div>

      <div className={styles.meta}>
        <span className={`badge ${scan.status === "error" ? "badge-error" : "badge-success"}`}>
          {scan.status === "error" ? "נמצאו שגיאות" : "תקין"}
        </span>
        {scan.total > 0 && (
          <span className={styles.amount}>−₪{scan.total.toLocaleString()}</span>
        )}
      </div>

      <ChevronRight size={16} className={styles.chevron} />
    </button>
  );
}
