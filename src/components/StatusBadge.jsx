export default function StatusBadge({ status, text, className }) {
  const isSuccess = status === 'success' || status === 'ok';
  
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-none text-xs font-black tracking-wider border-2 uppercase",
      isSuccess 
        ? "bg-black text-[var(--color-success)] border-[var(--color-success)]" 
        : "bg-black text-[var(--color-error)] border-[var(--color-error)]",
      className
    )}>
      {text}
    </span>
  );
}
