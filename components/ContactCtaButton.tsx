'use client';

import PillButton from './PillButton';
import ShurikenIcon from './ShurikenIcon';
import { useLanguage } from '../contexts/LanguageContext';

type ContactCtaButtonProps = {
  href?: string;
  className?: string;
  size?: 'sm' | 'md';
};

export default function ContactCtaButton({
  href = 'mailto:alex@wentzel.io',
  className = '',
  size = 'sm',
}: ContactCtaButtonProps) {
  const { t } = useLanguage();

  return (
    <PillButton href={href} size={size} className={className}>
      <ShurikenIcon className="size-4" />
      {t('home.cta.button')}
    </PillButton>
  );
}
