import { NavLink } from "react-router-dom";
import { LayoutDashboard, Upload, FileText, MessageSquare } from "lucide-react";
import styles from "./Navbar.module.css";

const TABS = [
  { to: "/",        icon: LayoutDashboard, label: "בית"    },
  { to: "/upload",  icon: Upload,          label: "סרוק"   },
  { to: "/report",  icon: FileText,        label: 'דו"ח'   },
  { to: "/action",  icon: MessageSquare,   label: "פעולה"  },
];

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      {TABS.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            [styles.tab, isActive ? styles.active : ""].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.6} />
              <span className={styles.label}>{label}</span>
              {isActive && <span className={styles.dot} />}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
