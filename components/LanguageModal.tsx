'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (lang: 'da' | 'en') => void;
}

export default function LanguageModal({ open, onClose, onSelect }: LanguageModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label={t('home.language_modal.cancel')}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="language-modal-title"
        className="relative w-full max-w-md rounded-3xl border border-border bg-pill p-6 shadow-2xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="link-hover-blue absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground"
          aria-label={t('home.language_modal.cancel')}
        >
          <X className="size-4" />
        </button>

        <h2 id="language-modal-title" className="pr-10 text-2xl font-semibold tracking-tight">
          {t('home.language_modal.title')}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onSelect('da')}
            className="rounded-2xl border border-border bg-background/50 px-4 py-6 text-center transition hover:border-foreground/30 hover:bg-background"
          >
            <div className="text-2xl font-semibold">DK</div>
            <div className="mt-2 text-sm text-muted-foreground">{t('home.language_modal.da')}</div>
          </button>
          <button
            type="button"
            onClick={() => onSelect('en')}
            className="rounded-2xl border border-border bg-background/50 px-4 py-6 text-center transition hover:border-foreground/30 hover:bg-background"
          >
            <div className="text-2xl font-semibold">EN</div>
            <div className="mt-2 text-sm text-muted-foreground">{t('home.language_modal.en')}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
