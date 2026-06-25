'use client';

import Link from 'next/link';
import ContactCtaButton from './ContactCtaButton';
import { DesktopNavMenu, MobileNavMenu } from './NavMenu';
import { LiquidBottomBlur } from './LiquidBottomBlur';

function WentzelLogo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Wentzel – Home"
      className={`group flex items-center gap-2 transition-colors duration-300 ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        className="origin-center transition-[transform,color] duration-500 ease-in-out group-hover:rotate-[360deg] group-hover:text-brand-blue"
      >
        {/* W shape */}
        <path
          d="M3 6 L9 26 L16 13 L23 26 L29 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />
        {/* A shape */}
        <path
          d="M4 26 L16 5 L28 26 M9.5 19 L22.5 19"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight transition-colors duration-300 will-change-[filter] group-hover:animate-pill-hover group-hover:text-brand-blue">
        Wentzel
      </span>
    </Link>
  );
}

export function SiteTopBar({ ctaHref = '#contact' }: { ctaHref?: string }) {
  return (
    <>
      <header className="fixed inset-x-4 top-6 z-50 flex items-center justify-between md:hidden">
        <WentzelLogo />
        <MobileNavMenu ctaHref={ctaHref} />
      </header>

      <WentzelLogo className="fixed left-10 top-8 z-50 hidden md:flex" />

      <DesktopNavMenu />

      <div className="fixed right-10 top-8 z-50 hidden md:block">
        <ContactCtaButton href={ctaHref} />
      </div>
    </>
  );
}

export function PageShell({
  children,
  className = '',
  showBlur = true,
  ctaHref = '#contact',
}: {
  children: React.ReactNode;
  className?: string;
  showBlur?: boolean;
  ctaHref?: string;
}) {
  return (
    <main className={`relative min-h-screen bg-background text-foreground ${className}`}>
      {showBlur && <LiquidBottomBlur />}
      <SiteTopBar ctaHref={ctaHref} />
      {children}
    </main>
  );
}
