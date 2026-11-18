'use client';

import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en' as const, label: 'EN' },
  { code: 'da' as const, label: 'DA' },
];

export default function LanguageSwitch({
  className = '',
  variant = 'standalone',
}: {
  className?: string;
  variant?: 'standalone' | 'menu';
}) {
  const { language, setLanguage } = useLanguage();

  const shellClass =
    variant === 'menu'
      ? 'border-white/10 bg-[oklch(0.14_0.01_30)]'
      : 'border-border bg-[oklch(0.09_0.01_30)]/95 shadow-lg backdrop-blur-md';

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border p-1 ${shellClass} ${className}`}
      role="group"
      aria-label="Language"
    >
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
            language === code
              ? 'bg-brand-blue text-white'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
