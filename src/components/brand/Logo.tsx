export function KnoticWordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(8, 12)">
        <circle cx="0" cy="0" r="3" fill="#185FA5"/>
        <circle cx="24" cy="12" r="3" fill="#185FA5"/>
        <circle cx="0" cy="24" r="3" fill="#185FA5"/>
        <path d="M 0 0 L 24 12 L 0 24" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 0 0 Q 14 12 0 24" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      </g>
      <text x="48" y="32" fontFamily="Pretendard, Inter, sans-serif" fontSize="28" fontWeight="500" fill="#1F1F1E" letterSpacing="-1">Knotic</text>
    </svg>
  );
}

export function KnoticSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(4, 4)">
        <circle cx="0" cy="0" r="2.5" fill="#185FA5"/>
        <circle cx="24" cy="12" r="2.5" fill="#185FA5"/>
        <circle cx="0" cy="24" r="2.5" fill="#185FA5"/>
        <path d="M 0 0 L 24 12 L 0 24" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 0 0 Q 14 12 0 24" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
      </g>
    </svg>
  );
}
