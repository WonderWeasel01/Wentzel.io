export function LiquidBottomBlur({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 h-[min(28vh,240px)] min-h-[140px] ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 backdrop-blur-[48px] backdrop-saturate-[1.6] [transform:translateZ(0)]"
        style={{
          WebkitMaskImage:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.25) 65%, transparent 100%)',
          maskImage:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.25) 65%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[24px] backdrop-saturate-[1.4] [transform:translateZ(0)]"
        style={{
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
