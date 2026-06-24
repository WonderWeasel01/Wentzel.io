'use client';

import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import { motion } from 'framer-motion';
import {
  SiFramer,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { Dock, DockIcon } from './ui/dock';

const JavaIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M8.851 18.56s-.917.534 1.076.704c2.602.218 3.964-.118 6.844-.998 0 0 .757.475 1.812.888-6.444 2.76-14.67 1.66-16.228-1.26 0 0 .89.58 2.496 1.666zm-.57-2.676s-1.028.667.893.82c3.351.32 5.964-.172 10.52-.89 0 0 .65.53 1.67 1.02-9.35 2.72-19.77 2.1-21.5-.67 0 0 .98.6 2.417 1.72zM11.2 6.78c1.735 2.008 1.64 4.58-.23 6.02 0 0-2.52-1.3-1.64-4.12.29-1.1 1.17-1.87 1.87-1.9zm5.03 8.88c-5.8 1.38-2.18 1.7-.78 2.4 2.86 1.18 10.6.9 10.6.9s-3.12 1.56-8.9 1.67c-2.86.06-5.7-.2-7.9-.9 0 0 4.38-.56 6.98-1.4 2.6-.84 1.7-1.54 0-2.67zM12.3 4.3s4.47 4.48 3.34 8.55c0 0-.74-.54-1.94-1.17-1.1-.56-2.4-1.2-2.4-1.2s3.8-3.2 1-6.18zm-2.2-2.1C14.1 5.05 18.2 6.5 18.2 6.5s-.32 2.6-3.7 5.2c0 0-2.9-2.3-2.1-5.5.28-1.1 1.1-2.1 1.9-2.5z" />
  </svg>
);

const techStack = [
  { name: 'React', icon: SiReact, className: 'bg-[#61DAFB]/25 text-[#61DAFB]' },
  { name: 'Next.js', icon: SiNextdotjs, className: 'bg-white/12 text-white' },
  { name: 'Java', icon: JavaIcon, className: 'bg-[#ED8B00]/25 text-[#ED8B00]' },
  { name: 'Rust', icon: SiRust, className: 'bg-[#DEA584]/30 text-[#DEA584]' },
  { name: 'TypeScript', icon: SiTypescript, className: 'bg-[#3178C6]/25 text-[#3178C6]' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, className: 'bg-[#06B6D4]/25 text-[#06B6D4]' },
  { name: 'PostgreSQL', icon: SiPostgresql, className: 'bg-[#336791]/30 text-[#5B9BFF]' },
  { name: 'Framer Motion', icon: SiFramer, className: 'bg-[#0055FF]/25 text-[#BBD9FF]' },
] as const;

function useCompactDock() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return compact;
}

export default function TechDock() {
  const compact = useCompactDock();
  const iconSize = compact ? 36 : 68;
  const iconMagnification = compact ? 64 : 138;

  return (
    <div className="relative w-full max-w-full py-2 md:overflow-visible md:py-4">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="pointer-events-none absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-3xl md:h-52"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-full"
      >
        <Dock
          iconSize={iconSize}
          iconMagnification={iconMagnification}
          iconDistance={compact ? 100 : 180}
          className="w-full max-w-full justify-between gap-0.5 bg-pill/50 px-0.5 sm:justify-evenly sm:gap-3 sm:px-4 md:gap-4 md:px-6 lg:px-8"
        >
          {techStack.map(({ name, icon: Icon, className }) => (
            <DockIcon key={name} title={name} className={className}>
              <Icon aria-hidden />
            </DockIcon>
          ))}
        </Dock>
      </motion.div>
    </div>
  );
}
