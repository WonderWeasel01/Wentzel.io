'use client';

import Link from 'next/link';

type PillButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'solid' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const sizeClasses = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
};

const variantClasses = {
  solid:
    'bg-white text-black hover:bg-brand-blue hover:text-white',
  outline:
    'border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-brand-blue hover:bg-brand-blue hover:text-white',
};

const baseClasses =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300 hover:animate-pill-hover';

export default function PillButton({
  href,
  onClick,
  children,
  className = '',
  size = 'sm',
  variant = 'solid',
  type = 'button',
  disabled = false,
}: PillButtonProps) {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}>
      {children}
    </button>
  );
}
