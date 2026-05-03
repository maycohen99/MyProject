import { cn } from '../utils/cn';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "bg-[var(--color-surface-container-lowest)] rounded-[var(--radius-lg)] shadow-ambient border border-[var(--color-surface-container)] p-[var(--spacing-lg)]",
      className
    )}>
      {children}
    </div>
  );
}
