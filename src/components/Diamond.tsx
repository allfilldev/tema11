export function Diamond({ size = 14, className, full }: { size?: number; className?: string; full?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
      {full && <path d="M9 3l3 18 3-18" />}
    </svg>
  );
}
