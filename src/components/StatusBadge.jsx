import { cn } from '../utils/cn';

export default function StatusBadge({ status, text, className }) {
  const isSuccess = status === 'success' || status === 'ok';
  
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide border backdrop-blur-md",
      isSuccess 
        ? "bg-[rgba(0,245,160,0.1)] text-[var(--color-success)] border-[rgba(0,245,160,0.2)] shadow-[0_0_12px_rgba(0,245,160,0.15)]" 
        : "bg-[rgba(255,51,102,0.1)] text-[var(--color-error)] border-[rgba(255,51,102,0.2)] shadow-[0_0_12px_rgba(255,51,102,0.15)]",
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full ml-1.5 animate-pulse",
        isSuccess ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]"
      )} />
      {text}
    </span>
  );
}
