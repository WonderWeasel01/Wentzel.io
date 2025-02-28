'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { shapes } from './shapes';
import { PiQuestionMarkBold } from 'react-icons/pi';
import { FiMenu } from 'react-icons/fi';

import AlexImg from '../assets/images/alex.jpeg';
import Me1 from '../assets/images/me1.jpg';
import Me2 from '../assets/images/me2.jpg';
import Me3 from '../assets/images/me3.jpg';
import Me4 from '../assets/images/me4.jpg';
import me5 from '../assets/images/me5.jpg';
import me6 from '../assets/images/me6.jpg';
import me7 from '../assets/images/me7.jpg';
import me8 from '../assets/images/me8.jpg';
import me9 from '../assets/images/me9.jpg';
import me10 from '../assets/images/me10.jpg';
import me11 from '../assets/images/me11.jpg';

const Navbar = () => {
  const [randomShapes] = useState(() => {
    const selectedShapes = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * shapes.length);
      selectedShapes.push(shapes[randomIndex]);
    }
    return selectedShapes;
  });

  const [currentProfilePic, setCurrentProfilePic] = useState(AlexImg);
  const [confettiShapes, setConfettiShapes] = useState([]);
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const getLinksForCategory = (category) => {
    switch (category) {
      case 'Showcase':
        return ['Pos System', 'VictoryVault', 'Client websites'];
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

  const handleImageClick = (e) => {
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

    const newConfetti = [];
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
    'w-64 bg-white shadow-lg p-6 fixed left-0 top-0 h-full z-50 overflow-y-auto overflow-x-hidden';

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={navClass}
      style={{
        backgroundImage: `url(/Users/alexwentzel/Desktop/projects/Portfolio/src/assets/images/noisy-background.jpg)`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="absolute inset-0 bg-[url(/Users/alexwentzel/Desktop/projects/Portfolio/src/assets/images/noisy-background.jpg)] opacity-20 pointer-events-none" />
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
        {['About', 'CV', 'Ideas'].map((item) => {
          const isActive =
            activeLink === `/${item.toLowerCase()}` ||
            (item === 'About' && activeLink === '/');
          return (
            <motion.div
              key={item}
              whileHover={{
                scale: 1.05,
                x: 5,
                transition: { duration: 0.2 },
              }}
              className={`font-bold text-lg cursor-pointer mb-3 flex items-center ${
                isActive ? 'text-[#E94D35]' : ''
              }`}
              onClick={() => {
                setActiveLink(
                  item === 'About' ? '/' : `/${item.toLowerCase()}`
                );
                window.location.href =
                  item === 'About' ? '/' : `/${item.toLowerCase()}`;
              }}
            >
              <span className="relative">
                {item}
                <motion.div
                  className="absolute h-1 bg-[#E94D35] bottom-0 left-0"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </span>
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
                {category}
              </h3>
              <ul className="space-y-2">
                {getLinksForCategory(category).map((link) => {
                  const linkPath = link.url
                    ? new URL(link.url).pathname
                    : `/${(link.name || link).toLowerCase().replace(' ', '-')}`;
                  const isActive = activeLink === linkPath;
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
                      onClick={() => {
                        setActiveLink(linkPath);
                        window.location.href =
                          link.url ||
                          `/${(link.name || link)
                            .toLowerCase()
                            .replace(' ', '-')}`;
                      }}
                    >
                      {link.name || link}
                    </motion.li>
                  );
                })}
              </ul>
              {index < 2 && <hr className="my-6 border-gray-200 w-full" />}
            </div>
          ))}
        </div>
      </>
    </motion.nav>
  );
};

export default Navbar;
