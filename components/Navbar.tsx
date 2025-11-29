'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { shapes } from './shapes';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

// Note: Images should be in public/assets/images/ directory
const AlexImg = '/images/alex.jpeg';
const Me1 = '/images/me1.jpg';
const Me2 = '/images/me2.jpg';
const Me3 = '/images/me3.jpg';
const Me4 = '/images/me4.jpg';
const me5 = '/images/me5.jpg';
const me6 = '/images/me6.jpg';
const me7 = '/images/me7.jpg';
const me8 = '/images/me8.jpg';
const me9 = '/images/me9.jpg';
const me10 = '/images/me10.jpg';
const me11 = '/images/me11.jpg';

const NavbarContent = () => {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [randomShapes] = useState(() => {
    const selectedShapes: string[] = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * shapes.length);
      selectedShapes.push(shapes[randomIndex]);
    }
    return selectedShapes;
  });

  const [currentProfilePic, setCurrentProfilePic] = useState(AlexImg);
  const [confettiShapes, setConfettiShapes] = useState<any[]>([]);

  // Close mobile menu on route change
  useEffect(() => {
     setIsMobileOpen(false);
  }, [pathname, searchParams]);

  const getLinksForCategory = (category: string) => {
    switch (category) {
      case 'Showcase':
        return [
          { name: t('nav.all_projects'), path: '/projects' },
          { name: t('nav.clients'), path: '/projects?category=client' },
          { name: t('nav.personal'), path: '/projects?category=personal' },
          { name: t('nav.experience'), path: '/cv' },
        ];
      case 'Contact':
        return [
          { name: 'Email', url: 'mailto:alexwentzel@live.dk' },
          {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/alexander-wentzel-621654196/',
          },
          { name: 'Github', url: 'https://github.com/WonderWeasel01' },
        ];
      default:
        return [];
    }
  };

  const unprofessionalPics = [
    Me1,
    Me2,
    Me3,
    Me4,
    me5,
    me6,
    me7,
    me8,
    me9,
    me10,
    me11,
  ];

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const randomPic =
      unprofessionalPics[Math.floor(Math.random() * unprofessionalPics.length)];
    setCurrentProfilePic(randomPic);

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const baseAngle = Math.atan2(
      window.innerHeight - centerY,
      window.innerWidth - centerX
    );

    const newConfetti: any[] = [];
    const numConfetti = 20;
    const maxBurstDistance = 550;

    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#45B7FF', '#FFA5A5'];

    for (let i = 0; i < numConfetti; i++) {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const angle = baseAngle + (Math.random() - 0.5) * 1.2;
      const burstDistance = Math.random() * maxBurstDistance;
      const tx = Math.cos(angle) * burstDistance;
      const ty = Math.sin(angle) * burstDistance;
      const fallDistance = 100 + Math.random() * 100;
      const randomRotation = Math.random() * 360;
      const color = colors[Math.floor(Math.random() * colors.length)];

      newConfetti.push({
        id: Math.random(),
        shape: randomShape,
        tx,
        ty,
        fallDistance,
        randomRotation,
        style: {
          position: 'fixed',
          left: `${centerX}px`,
          top: `${centerY}px`,
          width: '8px',
          height: '8px',
          backgroundColor: color,
          mask: `url(${randomShape}) center/contain no-repeat`,
          WebkitMask: `url(${randomShape}) center/contain no-repeat`,
          opacity: 1,
          zIndex: 9999,
          pointerEvents: 'none',
        },
      });
    }
    setConfettiShapes(newConfetti);
  };

  const navClass =
    `w-64 bg-white shadow-lg p-6 fixed left-0 top-0 h-full z-50 overflow-y-auto overflow-x-hidden flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
      isMobileOpen ? 'translate-x-0' : '-translate-x-full'
    }`;

  return (
    <>
      {/* Mobile Toggle Button - Visible only on mobile */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg md:hidden text-stone-800 border border-stone-100 hover:bg-stone-50 transition-colors"
        aria-label="Toggle Menu"
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={navClass}
      >
      <div className="absolute inset-0 bg-[url(/assets/images/noisy-background.jpg)] opacity-20 pointer-events-none" />
      <motion.div
        className="absolute -right-8 -top-8 w-24 h-24 opacity-10 z-0"
        style={{
          WebkitMaskImage: `url(${randomShapes[0]})`,
          maskImage: `url(${randomShapes[0]})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          backgroundColor: '#0D3959',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {confettiShapes.map((confetti) => (
        <motion.div
          key={confetti.id}
          style={{
            ...confetti.style,
            WebkitMaskImage: `url(${confetti.shape})`,
            maskImage: `url(${confetti.shape})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
          animate={{
            x: [0, confetti.tx, confetti.tx],
            y: [0, confetti.ty, confetti.ty + confetti.fallDistance],
            rotate: [0, confetti.randomRotation, confetti.randomRotation],
            opacity: [1, 1, 0],
            scale: [3, 3.2, 3.2],
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
            delay: Math.random() * 0.3,
          }}
        />
      ))}

      {/* Top section: Profile Image and Name */}
      <div className="flex items-center mb-8 relative z-10">
        <div className="relative group" onClick={handleImageClick}>
          <motion.div
            className="absolute -bottom-2 -right-2 w-12 h-12 z-0"
            style={{
              WebkitMaskImage: `url(${randomShapes[1]})`,
              maskImage: `url(${randomShapes[1]})`,
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              backgroundColor: '#FF871F',
            }}
            animate={{ rotate: -15, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <img
            src={currentProfilePic}
            alt="Alex Wentzel"
            className="w-16 h-16 rounded-md mr-4 object-cover group-hover:scale-105 transition-transform custom-cursor z-40 relative"
          />
        </div>
        <div className="z-10">
          <h1 className="text-xl font-bold">Alex</h1>
          <h2 className="text-lg">Wentzel</h2>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="relative z-10 flex flex-col">
        {[
          { key: 'about', label: t('nav.about'), path: '/' },
          { key: 'cv', label: t('nav.cv'), path: '/cv' },
        ].map((item) => {
          const isActive = pathname === item.path;
          return (
            <motion.div
              key={item.key}
              whileHover={{
                scale: 1.05,
                x: 5,
                transition: { duration: 0.2 },
              }}
              className={`font-bold text-lg cursor-pointer mb-3 flex items-center ${
                isActive ? 'text-[#E94D35]' : ''
              }`}
            >
              <Link href={item.path} className="relative">
                {item.label}
                <motion.div
                  className="absolute h-1 bg-[#E94D35] bottom-0 left-0"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Links for Desktop Only */}
      <>
        <hr className="my-6 border-gray-200 w-full" />
        <div className="mt-6 space-y-6 relative z-10">
          {['Showcase', 'Contact'].map((category, index) => (
            <div key={category} className="relative">
              {index === 1 && (
                <motion.div
                  className="absolute -right-4 bottom-10 w-16 h-16 opacity-10"
                  style={{
                    WebkitMaskImage: `url(${randomShapes[2]})`,
                    maskImage: `url(${randomShapes[2]})`,
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    backgroundColor: '#4E6A51',
                  }}
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              <h3 className="text-sm uppercase text-gray-500 mb-2 font-sans">
                {category === 'Showcase' ? t('nav.showcase') : t('nav.contact')}
              </h3>
              <ul className="space-y-2">
                {getLinksForCategory(category).map((link: any) => {
                  const linkPath = link.path?.split('?')[0];
                  const isPathMatch = pathname === linkPath;
                  let isActive = false;

                  // Force re-evaluation of search params
                  const currentParams = new URLSearchParams(searchParams.toString());
                  const currentCategory = currentParams.get('category');

                  if (isPathMatch) {
                    const linkQuery = link.path?.split('?')[1];

                    if (linkQuery) {
                      // This link has specific params (e.g. ?category=client)
                      const linkParams = new URLSearchParams(linkQuery);
                      const linkCategory = linkParams.get('category');
                      
                      // It's active only if the categories match
                      isActive = currentCategory === linkCategory;
                    } else {
                      // This link has NO params (e.g. /projects or /cv)
                      
                      // Special case for /projects root: it's only active if there is NO category selected
                      if (linkPath === '/projects') {
                        isActive = !currentCategory;
                      } else {
                        // For other pages (like /cv), path match is enough
                        isActive = true;
                      }
                    }
                  }

                  return (
                    <motion.li
                      key={link.name || link}
                      whileHover={{
                        x: 5,
                        color: '#E94D35',
                        transition: { duration: 0.2 },
                      }}
                      className={`cursor-pointer text-xs font-sans ${
                        isActive ? 'text-[#E94D35]' : ''
                      }`}
                    >
                      {link.url ? (
                        <a
                          href={link.url}
                          target={link.url.startsWith('http') ? '_blank' : undefined}
                          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {link.name || link}
                        </a>
                      ) : (
                        <Link href={link.path}>{link.name || link}</Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
              {index < 2 && <hr className="my-6 border-gray-200 w-full" />}
            </div>
          ))}
        </div>
      </>

      {/* Language Toggle at Bottom */}
      <div className="mt-auto pt-8 flex justify-center relative z-20 pb-4">
        <div 
          className="relative bg-stone-100 rounded-full p-1 flex items-center cursor-pointer shadow-inner border border-stone-200 w-24 h-10 justify-between px-3"
          onClick={() => setLanguage(language === 'da' ? 'en' : 'da')}
        >
          {/* Animated Toggle Shape */}
          <motion.div
            className="absolute top-1 w-8 h-8 rounded-full shadow-md z-10"
            animate={{ 
              left: language === 'da' ? '4px' : 'calc(100% - 36px)',
              rotate: language === 'da' ? 0 : 180
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              backgroundColor: '#f59e0b', // amber-500
              mask: `url(${randomShapes[0]}) center/contain no-repeat`,
              WebkitMask: `url(${randomShapes[0]}) center/contain no-repeat`,
            }}
          />
          
          <span className={`text-xs font-bold z-0 transition-colors ${language === 'da' ? 'opacity-0' : 'text-stone-500'}`}>DA</span>
          <span className={`text-xs font-bold z-0 transition-colors ${language === 'en' ? 'opacity-0' : 'text-stone-500'}`}>EN</span>
        </div>
      </div>
    </motion.nav>
    </>
  );
};

const Navbar = () => {
  return (
    <Suspense fallback={
      <nav className="w-64 bg-white shadow-lg p-6 fixed left-0 top-0 h-full z-40 overflow-y-auto overflow-x-hidden">
        {/* Basic fallback content could go here to reduce layout shift */}
      </nav>
    }>
      <NavbarContent />
    </Suspense>
  );
};

export default Navbar;
