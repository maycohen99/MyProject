import { cn } from '../utils/cn';

export default function StatusBadge({ status, text, className }) {
  const isSuccess = status === 'success' || status === 'ok';
  
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      isSuccess 
        ? "bg-[var(--color-success-container)] text-[var(--color-on-success-container)]" 
        : "bg-[var(--color-error-container)] text-[var(--color-on-error-container)]",
      className
    )}>
      {text}
    </span>
  );
}
