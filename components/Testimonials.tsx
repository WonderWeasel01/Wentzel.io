'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { shapes } from './shapes';
import { useLanguage } from '../contexts/LanguageContext';

// Helper function to convert company name to filename
const getLogoPath = (companyName: string): string => {
  const filename = companyName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\./g, '');
  return `/companys/${filename}.png`;
};

// Logo component that handles image loading with fallback to text
const CompanyLogo = ({ company }: { company: string }) => {
  const [logoError, setLogoError] = useState(false);
  const logoPath = getLogoPath(company);

  if (!logoError) {
    return (
      <img
        src={logoPath}
        alt={company}
        className="max-w-full max-h-full w-auto h-auto object-contain brightness-0 opacity-80 hover:opacity-100 hover:brightness-100 transition-all duration-300"
        onError={() => setLogoError(true)}
        onLoad={() => setLogoError(false)}
      />
    );
  }

  // Fallback to text if logo doesn't exist
  return (
    <div className="text-stone-900 text-xs md:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap uppercase">
      {company}
    </div>
  );
};

const Testimonials = () => {
  const { t } = useLanguage();
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  
  useEffect(() => {
    setRandomShapes(
      Array.from(
        { length: 5 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  // Define fixed order of companies for top and bottom rows
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
    'omron'
  ];

  const borderColors = [
    '#FFD700', // Gold
    '#9370DB', // MediumPurple
    '#FFA07A', // LightSalmon
    '#f59e0b', // amber-500
    '#78716c', // stone-500
    '#d97706', // amber-600
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-stone-50">
      {/* Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {randomShapes.length > 0 && (
          <>
            <motion.div
              className="absolute top-10 left-10 w-24 h-24 opacity-10"
              animate={{ rotate: 360, y: [0, -20, 0] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div
                className="w-full h-full"
                style={{
                  mask: `url(${randomShapes[0]}) center/contain no-repeat`,
                  WebkitMask: `url(${randomShapes[0]}) center/contain no-repeat`,
                  backgroundColor: '#f59e0b', // amber-500
                }}
              />
            </motion.div>
            
            <motion.div
              className="absolute bottom-20 right-10 w-32 h-32 opacity-10"
              animate={{ rotate: -360, x: [0, 30, 0] }}
              transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, x: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div
                className="w-full h-full"
                style={{
                  mask: `url(${randomShapes[1]}) center/contain no-repeat`,
                  WebkitMask: `url(${randomShapes[1]}) center/contain no-repeat`,
                  backgroundColor: '#78716c', // stone-500
                }}
              />
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-1/4 w-16 h-16 opacity-5"
              animate={{ rotate: 180, scale: [1, 1.2, 1] }}
              transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            >
              <div
                className="w-full h-full"
                style={{
                  mask: `url(${randomShapes[2]}) center/contain no-repeat`,
                  WebkitMask: `url(${randomShapes[2]}) center/contain no-repeat`,
                  backgroundColor: '#d97706', // amber-600
                }}
              />
            </motion.div>
          </>
        )}
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              className="bg-amber-500/90 text-stone-900 px-4 py-2 rounded-md inline-block mb-4 backdrop-blur-sm shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-bold uppercase tracking-wider">{t('testimonials.badge')}</span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4 grainy-text">
              {t('testimonials.title')}
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('testimonials.description')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Double Infinity Logo Slideshow - logos moving towards each other - Full Width */}
      <div className="relative overflow-hidden py-8 space-y-4 w-full">
        {/* Top row - moving right to left */}
        <div className="flex logo-slideshow-left w-max">
          {/* Duplicate the logos for seamless loop with fixed order */}
          {[...Array(4)].map((_, duplicateIndex) => (
            <div
              key={duplicateIndex}
              className="flex space-x-4 shrink-0 items-center pr-4"
            >
              {topRowCompanies.map((company, index) => {
                const borderColor = borderColors[index % borderColors.length];
                return (
                  <div
                    key={`top-${duplicateIndex}-${index}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    {/* Logo container */}
                    <div 
                      className="w-[140px] h-[70px] md:w-[280px] md:h-[140px] p-4 md:p-6 bg-white border border-stone-200 rounded-lg transition-all duration-300 hover:bg-white/80 group cursor-default flex items-center justify-center shadow-sm hover:shadow-md hover:border-[var(--hover-border)]"
                      style={{ '--hover-border': borderColor } as React.CSSProperties}
                    >
                      <CompanyLogo company={company} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom row - moving left to right */}
        <div className="flex logo-slideshow-right w-max">
          {/* Duplicate the logos for seamless loop with fixed order */}
          {[...Array(4)].map((_, duplicateIndex) => (
            <div
              key={duplicateIndex}
              className="flex space-x-4 shrink-0 items-center pr-4"
            >
              {bottomRowCompanies.map((company, index) => {
                const borderColor = borderColors[(index + 3) % borderColors.length]; // Offset colors for variety
                return (
                  <div
                    key={`bottom-${duplicateIndex}-${index}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    {/* Logo container */}
                    <div 
                      className="w-[140px] h-[70px] md:w-[280px] md:h-[140px] p-4 md:p-6 bg-white border border-stone-200 rounded-lg transition-all duration-300 hover:bg-white/80 group cursor-default flex items-center justify-center shadow-sm hover:shadow-md hover:border-[var(--hover-border)]"
                      style={{ '--hover-border': borderColor } as React.CSSProperties}
                    >
                      <CompanyLogo company={company} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Global CSS for infinite scroll animation - double direction */}
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

        @media (max-width: 768px) {
          .logo-slideshow-left {
            animation: logo-scroll-left 50s linear infinite;
          }

          .logo-slideshow-right {
            animation: logo-scroll-right 50s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

