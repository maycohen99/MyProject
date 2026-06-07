import { useState } from "react";
import { AlertCircle, CheckCircle2, HelpCircle, ChevronDown } from "lucide-react";
import styles from "./FindingRow.module.css";

export default function FindingRow({ finding }) {
  const [open, setOpen] = useState(false);
  const isError = finding.type === "error";

  return (
    <div className={`${styles.row} ${isError ? styles.rowError : styles.rowOk}`}>
      <div className={styles.main}>
        <div className={`${styles.icon} ${isError ? styles.iconError : styles.iconOk}`}>
          {isError
            ? <AlertCircle size={18} />
            : <CheckCircle2 size={18} />}
        </div>

        <div className={styles.text}>
          <p className={styles.label}>{finding.label}</p>
          {isError
            ? <p className={styles.amount}>−₪{finding.amount.toLocaleString()}</p>
            : <p className={styles.okLabel}>חושב בצורה תקינה</p>}
        </div>

        {isError && finding.why && (
          <button
            className={styles.why}
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
          >
            <HelpCircle size={13} />
            למה?
            <ChevronDown
              size={11}
              style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            />
          </button>
        )}
      </div>

      {open && (
        <div className={styles.explanation}>
          <p>⚖️ {finding.why}</p>
        </div>
      )}
    </div>
  );
}
