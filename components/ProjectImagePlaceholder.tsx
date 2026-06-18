'use client';

import { Globe, Monitor, Smartphone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type PlaceholderVariant = 'hero' | 'card' | 'screenshot' | 'phone';

interface ProjectImagePlaceholderProps {
  title: string;
  website?: string;
  variant?: PlaceholderVariant;
  className?: string;
  fill?: boolean;
}

function getDomain(website?: string) {
  if (!website) return null;
  return website.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function ProjectImagePlaceholder({
  title,
  website,
  variant = 'card',
  className = '',
  fill = true,
}: ProjectImagePlaceholderProps) {
  const { t } = useLanguage();
  const domain = getDomain(website);
  const positionClass = fill ? 'absolute inset-0' : 'relative w-full h-full min-h-[12rem]';

  if (variant === 'phone') {
    return (
      <div className={`${positionClass} flex items-center justify-center ${className}`}>
        <div className="relative flex h-[320px] w-[160px] flex-col items-center justify-center rounded-[2rem] border-[3px] border-stone-300 bg-gradient-to-b from-stone-50 to-stone-200 px-4 text-center shadow-inner">
          <div className="absolute top-3 h-1.5 w-12 rounded-full bg-stone-300" />
          <Smartphone className="mb-3 mt-6 h-8 w-8 text-amber-600/70" />
          <p className="text-xs font-bold leading-tight text-stone-700">{title}</p>
          {domain && <p className="mt-2 text-[10px] text-stone-500">{domain}</p>}
        </div>
      </div>
    );
  }

  if (variant === 'screenshot') {
    return (
      <div className={`${positionClass} flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-stone-100 ${className}`}>
        <div className="flex items-center gap-2 border-b border-stone-200 bg-white px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          </div>
          <div className="ml-2 flex-1 truncate rounded-md bg-stone-100 px-3 py-1 text-xs text-stone-500">
            {domain ?? title}
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-amber-50 p-8 text-center">
          <Monitor className="mb-4 h-10 w-10 text-amber-600/80" />
          <p className="text-base font-bold text-stone-700">{title}</p>
          <p className="mt-2 text-xs uppercase tracking-wider text-stone-400">
            {t('project.placeholder_soon')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${positionClass} flex flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50 p-6 text-center ${className}`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
        <Globe className="h-7 w-7 text-amber-600" />
      </div>
      <p className={`font-bold text-stone-700 ${variant === 'hero' ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
        {title}
      </p>
      {domain && <p className="mt-2 text-sm text-stone-500">{domain}</p>}
      <p className="mt-4 text-xs uppercase tracking-wider text-stone-400">
        {t('project.placeholder_soon')}
      </p>
    </div>
  );
}
