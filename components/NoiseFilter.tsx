'use client';

export default function NoiseFilter() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.80"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)"></rect>
      </svg>
    </div>
  );
}

