'use client';

import React, { useState } from 'react';
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

const variantBgClasses = {
  solid: 'bg-white group-hover:bg-brand-blue',
  outline:
    'border border-white/25 bg-white/10 backdrop-blur-sm group-hover:border-brand-blue group-hover:bg-brand-blue',
};

const variantTextClasses = {
  solid: 'text-black group-hover:text-white',
  outline: 'text-white',
};

const baseClasses =
  'group relative isolate inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300';

function renderPillChildren(children: React.ReactNode, iconRotation: number) {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return (
        <span className="relative inline-block will-change-[filter] group-hover:animate-pill-hover">
          {child}
        </span>
      );
    }
    return (
      <span
        className="relative inline-flex will-change-transform transition-transform duration-500 ease-in-out"
        style={{ transform: `rotate(${iconRotation}deg)` }}
      >
        {child}
      </span>
    );
  });
}

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
  const [iconRotation, setIconRotation] = useState(0);
  const spinHalf = () => setIconRotation((r) => r + 180);

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantTextClasses[variant]} ${className}`;
  const bgLayer = (
    <span
      aria-hidden
      className={`absolute inset-0 -z-10 rounded-full transition-colors duration-300 group-hover:animate-pill-hover ${variantBgClasses[variant]}`}
    />
  );
  const content = renderPillChildren(children, iconRotation);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onMouseEnter={spinHalf}
        onMouseLeave={spinHalf}
      >
        {bgLayer}
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={spinHalf}
      onMouseLeave={spinHalf}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {bgLayer}
      {content}
    </button>
  );
}
