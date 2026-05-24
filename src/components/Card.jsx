import { cn } from '../utils/cn';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "glass-panel rounded-[var(--radius-lg)] shadow-ambient p-[var(--spacing-lg)]",
      className
    )}>
      {children}
    </div>
  );
}
