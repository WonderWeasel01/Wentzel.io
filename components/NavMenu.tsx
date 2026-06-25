'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Grip } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ContactCtaButton from './ContactCtaButton';

type MenuPhase = 'idle' | 'wide' | 'open' | 'closing';

const EXPAND_WIDTH_MS = 360;
const EXPAND_HEIGHT_MS = 280;
const MENU_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';

const navItems = [
  {
    key: 'home',
    href: '/',
    labelDa: 'Hjem',
    labelEn: 'Home',
    preview: 'linear-gradient(135deg, oklch(0.25 0.09 28), oklch(0.10 0.02 28))',
    image: '/images/alex.jpeg',
  },
  {
    key: 'cv',
    href: '/cv',
    labelDa: 'CV',
    labelEn: 'CV',
    preview: 'linear-gradient(135deg, oklch(0.22 0.10 250), oklch(0.10 0.03 250))',
    image: '/images/alex.jpeg',
  },
  {
    key: 'projects',
    href: '/projects',
    labelDa: 'Mine projekter',
    labelEn: 'My projects',
    preview: 'linear-gradient(135deg, oklch(0.22 0.10 150), oklch(0.10 0.03 150))',
    image: '/assets/eventlokalet-image.webp',
  },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/WonderWeasel01' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/wentzel01' },
  { label: 'X / Twitter', href: 'https://x.com/alexwentzel' },
];

function JobStatusPulse() {
  return (
    <span className="relative flex size-2 shrink-0">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
      <span className="relative inline-flex size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
    </span>
  );
}

function PreviewThumb({
  gradient,
  image,
  alt,
  className = 'size-16',
}: {
  gradient: string;
  image?: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (image && !failed) {
    return (
      <div className={`relative shrink-0 overflow-hidden rounded-xl border border-white/10 transition-all duration-200 ${className}`}>
        <Image src={image} alt={alt} fill className="object-cover" onError={() => setFailed(true)} />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 rounded-xl border border-white/10 transition-all duration-200 ${className}`}
      style={{ background: gradient }}
    />
  );
}

function MenuLabelTicker({ active }: { active: boolean }) {
  return (
    <span className="relative inline-block h-5 overflow-hidden">
      <span
        className={`flex flex-col transition-transform duration-[360ms] ease-menu-expand ${
          active ? '-translate-y-1/2' : 'translate-y-0'
        }`}
      >
        <span className="flex h-5 items-center leading-none">Menu</span>
        <span className="flex h-5 items-center leading-none">Wentzel</span>
      </span>
    </span>
  );
}

function MenuWordmark() {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-border px-5 py-4">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden className="rotate-180">
        <path
          d="M3 26 L10 8 L16 20 L22 8 L29 26"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-semibold tracking-tight">Wentzel</span>
      <span className="text-xs text-muted-foreground">· Portfolio</span>
    </div>
  );
}

function MenuPanelContent({
  isDa,
  ctaHref,
  showContactCta,
  onNavigate,
}: {
  isDa: boolean;
  ctaHref: string;
  showContactCta: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      <MenuWordmark />

      <div className="space-y-1 px-3 py-2">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={onNavigate}
            className="group/item flex items-center justify-between gap-4 rounded-xl px-4 py-4 text-left transition-all duration-200 hover:bg-[oklch(0.16_0.01_30)]"
          >
            <span className="text-2xl font-medium tracking-tight text-foreground transition-colors duration-300 group-hover/item:text-brand-blue group-hover/item:text-xl">
              {isDa ? item.labelDa : item.labelEn}
            </span>
            <PreviewThumb
              gradient={item.preview}
              image={item.image}
              alt={isDa ? item.labelDa : item.labelEn}
              className="size-16 group-hover/item:size-11"
            />
          </Link>
        ))}
      </div>

      <div className="border-t border-border px-5 py-5">
        <p className="mb-3 text-xs text-muted-foreground">{isDa ? 'Sociale medier' : 'Social media'}</p>
        <ul className="space-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover-blue block rounded-lg px-2 py-1.5 text-sm text-foreground/90 transition-colors duration-300 hover:bg-[oklch(0.16_0.01_30)]"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        {showContactCta ? <ContactCtaButton href={ctaHref} className="mt-5 w-full" /> : null}
      </div>
    </>
  );
}

export function DesktopNavMenu() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<MenuPhase>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const isDa = language === 'da';
  const jobLabel = isDa ? 'Leder efter job' : 'Open to work';
  const isWidthExpanded = phase !== 'idle';
  const isHeightOpen = phase === 'open';
  const useSoftCorners = phase === 'open' || phase === 'closing';

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => () => clearTimer(), []);

  const handleEnter = () => {
    clearTimer();
    if (phase === 'open') return;
    if (phase === 'wide' || phase === 'closing') {
      setPhase('open');
      return;
    }
    setPhase('wide');
    timerRef.current = setTimeout(() => setPhase('open'), EXPAND_WIDTH_MS);
  };

  const handleLeave = () => {
    clearTimer();
    if (phase === 'open') {
      setPhase('closing');
      timerRef.current = setTimeout(() => setPhase('idle'), EXPAND_HEIGHT_MS);
    } else {
      setPhase('idle');
    }
  };

  return (
    <nav
      className="fixed left-1/2 top-8 z-50 hidden -translate-x-1/2 md:block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={`overflow-hidden border border-border bg-[oklch(0.09_0.01_30)]/95 shadow-2xl backdrop-blur-md ${
          useSoftCorners ? 'rounded-lg' : 'rounded-full'
        }`}
        style={{
          width: isWidthExpanded ? '26rem' : '17rem',
          maxWidth: 'calc(100vw - 2rem)',
          transition: `width ${EXPAND_WIDTH_MS}ms ${MENU_EASE}`,
        }}
      >
        <div className="flex w-full items-center justify-between px-3 py-2">
          <div className="flex shrink-0 items-center gap-2 py-1.5 text-sm font-medium text-pill-foreground">
            <Grip className="size-4 opacity-70" />
            <MenuLabelTicker active={isWidthExpanded} />
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
            <JobStatusPulse />
            <span className="whitespace-nowrap">{jobLabel}</span>
          </div>
        </div>

        <div
          className={`grid ease-menu-expand ${
            isHeightOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
          style={{
            transition: `grid-template-rows ${EXPAND_HEIGHT_MS}ms ${MENU_EASE}, opacity ${EXPAND_HEIGHT_MS}ms ${MENU_EASE}`,
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-border">
              <MenuPanelContent isDa={isDa} ctaHref="mailto:alex@wentzel.io" showContactCta={false} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function MobileNavMenu({ ctaHref }: { ctaHref: string }) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDa = language === 'da';
  const menuLabel = isOpen ? (isDa ? 'Luk' : 'Close') : 'Menu';

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      {isOpen ? (
        <button
          type="button"
          aria-label={isDa ? 'Luk menu' : 'Close menu'}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-menu-panel"
        onClick={() => setIsOpen((open) => !open)}
        className={`relative z-50 flex items-center gap-2 rounded-full border bg-[oklch(0.09_0.01_30)]/95 px-4 py-2.5 text-sm font-medium text-pill-foreground shadow-2xl backdrop-blur-md transition-colors duration-300 ${
          isOpen ? 'border-brand-blue/60' : 'border-border hover:border-brand-blue/40'
        }`}
      >
        <Grip className="size-4 opacity-70" />
        {menuLabel}
      </button>

      <div
        id="site-menu-panel"
        className={`fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-lg border border-border bg-[oklch(0.09_0.01_30)]/95 shadow-2xl backdrop-blur-md ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          transition: `opacity ${EXPAND_HEIGHT_MS}ms ${MENU_EASE}, transform ${EXPAND_HEIGHT_MS}ms ${MENU_EASE}`,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-0.5rem)',
        }}
      >
        <div
          className={`grid ease-menu-expand ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
          style={{
            transition: `grid-template-rows ${EXPAND_HEIGHT_MS}ms ${MENU_EASE}, opacity ${EXPAND_HEIGHT_MS}ms ${MENU_EASE}`,
          }}
        >
          <div className="min-h-0 overflow-hidden">
            <MenuPanelContent
              isDa={isDa}
              ctaHref={ctaHref}
              showContactCta
              onNavigate={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type NavMenuProps = {
  ctaHref?: string;
};

export default function NavMenu({ ctaHref = 'mailto:alex@wentzel.io' }: NavMenuProps) {
  return (
    <>
      <MobileNavMenu ctaHref={ctaHref} />
      <DesktopNavMenu />
    </>
  );
}
