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
        className="rotate-180 transition-colors duration-300 group-hover:text-brand-blue"
      >
        <path
          d="M3 26 L10 8 L16 20 L22 8 L29 26"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight transition-colors duration-300 group-hover:text-brand-blue">
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

      <ContactCtaButton href={ctaHref} className="fixed right-10 top-8 z-50 hidden md:inline-flex" />
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
