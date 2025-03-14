'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { shapes } from './shapes';
import { FiMenu } from 'react-icons/fi';

// Import your profile and alternate images
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

const MobileNavbar = ({ activeLink, setActiveLink }) => {
  // Toggle for the burger menu dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  // State for confetti shapes that get rendered
  const [confettiShapes, setConfettiShapes] = useState([]);
  // Profile image state
  const [currentProfilePic, setCurrentProfilePic] = useState(AlexImg);
  // State for Showcase expansion
  const [showcaseExpanded, setShowcaseExpanded] = useState(false);
  // State for Contact expansion
  const [contactExpanded, setContactExpanded] = useState(false);

  // Array of alternate images for profile picture change
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

  // Trigger image change and confetti burst on image click
  const handleImageClick = (e) => {
    // Change profile image
    const randomPic =
      unprofessionalPics[Math.floor(Math.random() * unprofessionalPics.length)];
    setCurrentProfilePic(randomPic);

    // Get the center position of the image
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Base angle to burst confetti from the image center
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

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-lg p-4 fixed top-0 left-0 z-50 flex items-center justify-between"
    >
      {/* Left Side: Profile Image and Name */}
      <div className="flex items-center">
        <div className="relative" onClick={handleImageClick}>
          <img
            src={currentProfilePic}
            alt="Alex Wentzel"
            className="w-10 h-10 rounded-full object-cover mr-2 cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold">Alex</h1>
          <h2 className="text-sm">Wentzel</h2>
        </div>
      </div>

      {/* Right Side: Burger Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-[5000]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto' }}
          >
            {['About', 'CV', 'Showcase', 'Contact'].map((item) => {
              const linkPath =
                item === 'About' ? '/' : `/${item.toLowerCase()}`;
              const isActive =
                activeLink === linkPath ||
                (item === 'About' && activeLink === '/');

              if (item === 'Showcase') {
                return (
                  <div key={item} className="relative">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        isActive ? 'text-[#E94D35]' : 'text-gray-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowcaseExpanded(!showcaseExpanded);
                      }}
                    >
                      {item}
                    </motion.div>
                    {showcaseExpanded && (
                      <motion.div
                        className="pl-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {['Pos System', 'VictoryVault', 'Client websites'].map(
                          (subItem) => (
                            <motion.div
                              key={subItem}
                              whileHover={{
                                scale: 1.05,
                                y: -2,
                                transition: { duration: 0.2 },
                              }}
                              className={`px-4 py-2 text-sm cursor-pointer ${
                                activeLink ===
                                `/${subItem.toLowerCase().replace(' ', '-')}`
                                  ? 'text-[#E94D35]'
                                  : 'text-gray-700'
                              }`}
                              onClick={() => {
                                setActiveLink(
                                  `/${subItem.toLowerCase().replace(' ', '-')}`
                                );
                                window.location.href = `/${subItem
                                  .toLowerCase()
                                  .replace(' ', '-')}`;
                                setMenuOpen(false);
                              }}
                            >
                              {subItem}
                            </motion.div>
                          )
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              }

              if (item === 'Contact') {
                return (
                  <div key={item} className="relative">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer ${
                        isActive ? 'text-[#E94D35]' : 'text-gray-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setContactExpanded(!contactExpanded);
                      }}
                    >
                      {item}
                    </motion.div>
                    {contactExpanded && (
                      <motion.div
                        className="pl-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {[
                          { name: 'Email', url: 'mailto:alexwentzel@live.dk' },
                          {
                            name: 'LinkedIn',
                            url: 'https://www.linkedin.com/in/alexander-wentzel-621654196/',
                          },
                          {
                            name: 'Github',
                            url: 'https://github.com/WonderWeasel01',
                          },
                        ].map((subItem) => (
                          <motion.div
                            key={subItem.name}
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                              transition: { duration: 0.2 },
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer ${
                              activeLink ===
                              `/${subItem.name.toLowerCase().replace(' ', '-')}`
                                ? 'text-[#E94D35]'
                                : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setActiveLink(
                                `/${subItem.name
                                  .toLowerCase()
                                  .replace(' ', '-')}`
                              );
                              window.location.href = subItem.url;
                              setMenuOpen(false);
                            }}
                          >
                            {subItem.name}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              }

              return (
                <motion.div
                  key={item}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    isActive ? 'text-[#E94D35]' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setActiveLink(linkPath);
                    window.location.href = linkPath;
                    setMenuOpen(false);
                  }}
                >
                  {item}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Render Confetti */}
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
    </motion.nav>
  );
};

export default MobileNavbar;
