import { TrendingUp } from "lucide-react";
import styles from "./SummaryCard.module.css";

export default function SummaryCard({ total, scanCount, errorCount, okCount }) {
  // Calculate relative segments for the telemetry gauge
  const totalCount = errorCount + okCount;
  const errorWidth = totalCount > 0 ? (errorCount / totalCount) * 100 : 0;
  const okWidth = totalCount > 0 ? (okCount / totalCount) * 100 : 100;

  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <TrendingUp size={16} className={styles.icon} />
        <span className={styles.label}>סה"כ ניתן לשחזור</span>
      </div>

      <p className={styles.amount}>₪{total.toLocaleString()}</p>

      {/* Futuristic gauge segments */}
      <div className={styles.gaugeBar}>
        <div 
          className={styles.gaugeSegmentError} 
          style={{ width: `${errorWidth}%` }} 
          title={`ממצאים: ${errorCount}`}
        />
        <div 
          className={styles.gaugeSegmentOk} 
          style={{ width: `${okWidth}%` }} 
          title={`תקינים: ${okCount}`}
        />
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>תלושים נסרקו</span>
          <span className={styles.statValue}>{scanCount}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>חריגות נמצאו</span>
          <span className={`${styles.statValue} ${styles.statError}`}>{errorCount}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>רכיבים תקינים</span>
          <span className={`${styles.statValue} ${styles.statOk}`}>{okCount}</span>
        </div>
      </div>
    </div>
  );
}
