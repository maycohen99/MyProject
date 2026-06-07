import { NavLink } from "react-router-dom";
import { Shield, Phone, LogOut, LayoutDashboard, Upload, FileText, MessageSquare } from "lucide-react";
import { supabase } from "../../supabaseClient";
import styles from "./AppHeader.module.css";

const TABS = [
  { to: "/",        icon: LayoutDashboard, label: "לוח בקרה" },
  { to: "/upload",  icon: Upload,          label: "סריקת תלוש" },
  { to: "/report",  icon: FileText,        label: "דוחות" },
  { to: "/action",  icon: MessageSquare,   label: "צור פנייה" },
];

export default function AppHeader() {
  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Shield size={16} color="#fff" />
          </div>
          <span className={styles.name}>TlushSmart</span>
          <span className={styles.badge}>AI</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={styles.desktopNav}>
          {TABS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.activeNavLink : ""].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={styles.support} aria-label="תמיכה">
            <Phone size={14} />
            <span className={styles.btnText}>תמיכה</span>
          </button>
          <button className={styles.logout} onClick={handleLogout} aria-label="התנתקות">
            <LogOut size={14} />
            <span className={styles.btnText}>התנתקות</span>
          </button>
        </div>
      </div>
    </header>
  );
}
