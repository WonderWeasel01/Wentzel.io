'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { shapes } from './shapes';
import NoiseFilter from './NoiseFilter';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  onComplete: () => void;
}

export default function LanguageSelector({ onComplete }: LanguageSelectorProps) {
  const { setLanguage } = useLanguage();
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    setRandomShapes(
      Array.from({ length: 30 }, () => shapes[Math.floor(Math.random() * shapes.length)])
    );
  }, []);

  const handleLanguageSelect = (lang: 'da' | 'en') => {
    if (isTransitioning) return; // Prevent double clicks
    
    setIsTransitioning(true);
    // Update language in context and localStorage
    setLanguage(lang);
    localStorage.setItem('hasSeenLanguagePopup', 'true');
    
    // Wait for curtain animation to finish before signaling completion
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="fixed inset-0 z-[100] flex text-stone-900 overflow-hidden selection:bg-amber-200 selection:text-stone-900">
      <motion.div 
        animate={{ opacity: isTransitioning ? 0 : 1 }} 
        transition={{ duration: 0.5 }}
      >
        <NoiseFilter />
      </motion.div>

      {/* Grain overlay - Multiple layers for depth */}
      <motion.div 
        className="fixed inset-0 z-5 pointer-events-none"
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30" />
        <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-20 scale-150" />
      </motion.div>

      {/* Floating background shapes - More shapes scattered everywhere */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {randomShapes.slice(0, 25).map((shape, i) => {
          const colors = ['#A5FFD6', '#FFD700', '#9370DB', '#FFA07A', '#FF6B6B', '#4ECDC4', '#20B2AA', '#FFB6C1'];
          const color = colors[i % colors.length];
          const size = 24 + (i % 5) * 16; // Varying sizes
          
          return (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${(i * 4) % 100}%`,
                left: `${(i * 7) % 100}%`,
                backgroundColor: color,
                mask: `url(${shape}) center/contain no-repeat`,
                WebkitMask: `url(${shape}) center/contain no-repeat`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, (i % 2 === 0 ? 30 : -30), 0],
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12 + (i % 8),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          );
        })}
      </motion.div>

      {/* Additional decorative patterns */}
      <motion.div 
        className="fixed inset-0 z-1 pointer-events-none overflow-hidden"
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {randomShapes.slice(15, 30).map((shape, i) => {
          const colors = ['#FFD700', '#9370DB', '#FFA07A', '#A5FFD6'];
          const color = colors[i % colors.length];
          
          return (
            <motion.div
              key={`pattern-${i}`}
              className="absolute opacity-15"
              style={{
                width: `${40 + (i % 3) * 20}px`,
                height: `${40 + (i % 3) * 20}px`,
                top: `${10 + (i * 3.5) % 90}%`,
                left: `${5 + (i * 6) % 95}%`,
                backgroundColor: color,
                mask: `url(${shape}) center/contain no-repeat`,
                WebkitMask: `url(${shape}) center/contain no-repeat`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            />
          );
        })}
      </motion.div>

      {/* CURTAIN SPLIT - THE MAIN EVENT */}
      <div className="fixed inset-0 z-20 flex pointer-events-none">
        {/* LEFT CURTAIN - Danish */}
        <motion.div
          className="relative w-1/2 h-full bg-stone-100 flex items-center justify-end overflow-hidden pointer-events-auto"
          initial={{ x: 0 }}
          animate={{ x: isTransitioning ? '-100%' : 0 }}
          transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Grain on curtain */}
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30 pointer-events-none z-20" />
          
          {/* Background shapes on Left Curtain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
             {randomShapes.slice(0, 15).map((shape, i) => {
               const colors = ['#A5FFD6', '#FFD700', '#9370DB', '#FFA07A', '#FF6B6B', '#4ECDC4', '#20B2AA', '#FFB6C1'];
               const color = colors[i % colors.length];
               const size = 24 + (i % 5) * 16; 
               
               return (
                 <motion.div
                   key={`left-${i}`}
                   className="absolute opacity-20"
                   style={{
                     width: `${size}px`,
                     height: `${size}px`,
                     top: `${(i * 17 + 23) % 80 + 10}%`,
                     left: `${(i * 29 + 7) % 80 + 10}%`,
                     backgroundColor: color,
                     mask: `url(${shape}) center/contain no-repeat`,
                     WebkitMask: `url(${shape}) center/contain no-repeat`,
                   }}
                   animate={{
                     y: [0, -60, 0],
                     rotate: i % 2 === 0 ? 360 : -360,
                   }}
                   transition={{
                     duration: 15 + i,
                     repeat: Infinity,
                     ease: 'linear',
                   }}
                 />
               );
             })}
          </div>

          <div className="max-w-2xl text-right relative z-10">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl md:text-5xl lg:text-7xl pr-2 font-bold leading-tight grainy-text"
            >
              Choose
            </motion.h1>
            <motion.p
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-sm md:text-xl text-stone-600 mt-2 md:mt-4 font-light"
            >
              Select your preferred
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 md:mt-12 pr-4 md:pr-12 flex justify-end"
            >
              <motion.button
                onClick={() => handleLanguageSelect('da')}
                className="relative bg-white rounded-3xl p-4 md:p-8 shadow-xl hover:shadow-2xl transition-all group overflow-hidden w-36 md:w-80 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredLanguage('da')}
                onHoverEnd={() => setHoveredLanguage(null)}
              >
                {/* Animated shapes inside card */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 md:w-16 md:h-16 opacity-30"
                  style={{
                    backgroundColor: '#A5FFD6',
                    mask: `url(${randomShapes[20]}) center/contain no-repeat`,
                    WebkitMask: `url(${randomShapes[20]}) center/contain no-repeat`,
                  }}
                  animate={{ rotate: hoveredLanguage === 'da' ? 360 : 0 }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-6 h-6 md:w-12 md:h-12 opacity-30"
                  style={{
                    backgroundColor: '#FFD700',
                    mask: `url(${randomShapes[21]}) center/contain no-repeat`,
                    WebkitMask: `url(${randomShapes[21]}) center/contain no-repeat`,
                  }}
                  animate={{ rotate: hoveredLanguage === 'da' ? -360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="text-3xl md:text-6xl mb-1 md:mb-3">DK</div>
                  <h2 className="text-lg md:text-4xl font-bold mb-1 md:mb-2">Dansk</h2>
                  <p className="text-stone-600 text-[10px] md:text-base">Fortsæt på dansk</p>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity rounded-3xl"
                  initial={false}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT CURTAIN - English */}
        <motion.div
          className="relative w-1/2 h-full bg-stone-100 flex items-center justify-start overflow-hidden pointer-events-auto"
          initial={{ x: 0 }}
          animate={{ x: isTransitioning ? '100%' : 0 }}
          transition={{ duration: 1.8, ease: [0.7, 0, 0.3, 1] }}
        >
          {/* Grain on curtain */}
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30 pointer-events-none z-20" />

          {/* Background shapes on Right Curtain */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
             {randomShapes.slice(15, 30).map((shape, i) => {
               const colors = ['#FFD700', '#9370DB', '#FFA07A', '#A5FFD6', '#FF6B6B', '#4ECDC4'];
               const color = colors[i % colors.length];
               const size = 24 + (i % 5) * 16; 
               
               return (
                 <motion.div
                   key={`right-${i}`}
                   className="absolute opacity-20"
                   style={{
                     width: `${size}px`,
                     height: `${size}px`,
                     top: `${(i * 13 + 11) % 80 + 10}%`,
                     right: `${(i * 31 + 19) % 80 + 10}%`,
                     backgroundColor: color,
                     mask: `url(${shape}) center/contain no-repeat`,
                     WebkitMask: `url(${shape}) center/contain no-repeat`,
                   }}
                   animate={{
                     y: [0, -60, 0],
                     rotate: i % 2 === 0 ? -360 : 360,
                   }}
                   transition={{
                     duration: 15 + i,
                     repeat: Infinity,
                     ease: 'linear',
                   }}
                 />
               );
             })}
          </div>

          <div className="max-w-2xl relative z-10 pl-2">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight grainy-text"
            >
              Language
            </motion.h1>
            <motion.p
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-sm md:text-xl text-stone-600 mt-2 md:mt-4 font-light"
            >
              language to continue
            </motion.p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 md:mt-12 pl-4 md:pl-12 flex justify-start"
            >
              <motion.button
                onClick={() => handleLanguageSelect('en')}
                className="relative bg-white rounded-3xl p-4 md:p-8 shadow-xl hover:shadow-2xl transition-all group overflow-hidden w-36 md:w-80 flex flex-col items-center text-center"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredLanguage('en')}
                onHoverEnd={() => setHoveredLanguage(null)}
              >
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 md:w-16 md:h-16 opacity-30"
                  style={{
                    backgroundColor: '#9370DB',
                    mask: `url(${randomShapes[22]}) center/contain no-repeat`,
                    WebkitMask: `url(${randomShapes[22]}) center/contain no-repeat`,
                  }}
                  animate={{ rotate: hoveredLanguage === 'en' ? 360 : 0 }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-6 h-6 md:w-12 md:h-12 opacity-30"
                  style={{
                    backgroundColor: '#FFA07A',
                    mask: `url(${randomShapes[23]}) center/contain no-repeat`,
                    WebkitMask: `url(${randomShapes[23]}) center/contain no-repeat`,
                  }}
                  animate={{ rotate: hoveredLanguage === 'en' ? -360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="text-3xl md:text-6xl mb-1 md:mb-3">EN</div>
                  <h2 className="text-lg md:text-4xl font-bold mb-1 md:mb-2">English</h2>
                  <p className="text-stone-600 text-[10px] md:text-base">Continue in English</p>
                </div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-bl from-amber-50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity rounded-3xl"
                  initial={false}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <motion.div 
        className="fixed inset-0 z-30 pointer-events-none"
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-40 blur-sm"
            style={{
              left: `${10 + (i * 6.5)}%`,
              top: `${10 + (i * 8)}%`,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
