import { cn } from '../utils/cn';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "avant-card rounded-none p-[var(--spacing-lg)]",
      className
    )}>
      {children}
    </div>
  );
}
