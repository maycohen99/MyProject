export default function StatusBadge({ status, text, className }) {
  const isSuccess = status === 'success' || status === 'ok';
  
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide border",
      isSuccess 
        ? "bg-[var(--color-success-container)] text-[var(--color-success)] border-[rgba(60,125,92,0.15)]" 
        : "bg-[var(--color-error-container)] text-[var(--color-error)] border-[rgba(181,63,63,0.15)]",
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full ml-1.5",
        isSuccess ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]"
      )} />
      {text}
    </span>
  );
}
