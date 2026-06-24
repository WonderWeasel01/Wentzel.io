'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const getLogoPath = (companyName: string): string => {
  if (companyName.toLowerCase() === 'innomize') {
    return `/companys/Innomize.png`;
  }
  const filename = companyName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\./g, '');
  return `/companys/${filename}.png`;
};

const CompanyLogo = ({ company }: { company: string }) => {
  const [logoError, setLogoError] = useState(false);
  const logoPath = getLogoPath(company);

  if (logoError) {
    return (
      <div className="text-xs font-semibold uppercase tracking-wide text-foreground/80 md:text-sm">{company}</div>
    );
  }

  return (
    <img
      src={logoPath}
      alt={company}
      className="max-h-full max-w-full object-contain opacity-70 invert transition-opacity duration-300 group-hover:opacity-100"
      onError={() => setLogoError(true)}
    />
  );
};

const Testimonials = () => {
  const { t } = useLanguage();

  const topRowCompanies = [
    'eventlokalet',
    'beautybywentzel',
    'gadefesten',
    'juvelen',
    'konservative',
    'lni',
    'innomize',
    'bornsvilkaar',
  ];

  const bottomRowCompanies = [
    'rekom',
    'retsag',
    'wentzel',
    'maden',
    'krudtraeven',
    'holysmash',
    'realtruck',
    'sprint365',
    'omron',
  ];

  return (
    <section className="relative overflow-hidden border-y border-border py-24 md:py-32">
      <div className="relative z-10 px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-16 md:mb-20">
            <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">{t('testimonials.badge')}</p>
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-[56px]">
              {t('testimonials.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">{t('testimonials.description')}</p>
          </div>
        </motion.div>
      </div>

      <div className="relative w-full space-y-4 overflow-hidden py-4">
        <div className="logo-slideshow-left flex w-max">
          {[...Array(4)].map((_, duplicateIndex) => (
            <div key={duplicateIndex} className="flex shrink-0 items-center space-x-4 pr-4">
              {topRowCompanies.map((company, index) => (
                <div key={`top-${duplicateIndex}-${index}`} className="flex shrink-0 items-center justify-center">
                  <div className="group flex h-[70px] w-[140px] cursor-default items-center justify-center rounded-2xl border border-border bg-pill/60 p-4 transition hover:border-foreground/20 hover:bg-pill md:h-[140px] md:w-[280px] md:p-6">
                    <CompanyLogo company={company} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="logo-slideshow-right flex w-max">
          {[...Array(4)].map((_, duplicateIndex) => (
            <div key={duplicateIndex} className="flex shrink-0 items-center space-x-4 pr-4">
              {bottomRowCompanies.map((company, index) => (
                <div key={`bottom-${duplicateIndex}-${index}`} className="flex shrink-0 items-center justify-center">
                  <div className="group flex h-[70px] w-[140px] cursor-default items-center justify-center rounded-2xl border border-border bg-pill/60 p-4 transition hover:border-foreground/20 hover:bg-pill md:h-[140px] md:w-[280px] md:p-6">
                    <CompanyLogo company={company} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes logo-scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 4));
          }
        }

        @keyframes logo-scroll-right {
          0% {
            transform: translateX(calc(-100% / 4));
          }
          100% {
            transform: translateX(0);
          }
        }

        .logo-slideshow-left {
          animation: logo-scroll-left 50s linear infinite;
          will-change: transform;
        }

        .logo-slideshow-right {
          animation: logo-scroll-right 50s linear infinite;
          will-change: transform;
        }

        .logo-slideshow-left:hover,
        .logo-slideshow-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
