import { cn } from '../utils/cn';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "editorial-card rounded-[var(--radius-xl)] p-[var(--spacing-lg)]",
      className
    )}>
      {children}
    </div>
  );
}
