'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { shapes } from '../components/shapes';
import NoiseFilter from '../components/noiseFilter';
import profilePic from '../assets/images/alex.jpeg';
import danishpng from '../assets/images/3.png';
import danishpdf from '../assets/pdf/DA_AlexWentzel-CV.pdf';
import englishpng from '../assets/images/4.png';
import englishpdf from '../assets/pdf/EN_AlexWentzel-CV.pdf';

const CVPage = () => {
  const [randomShapes, setRandomShapes] = useState([]);

  useEffect(() => {
    // Generate random shapes on mount
    setRandomShapes(
      Array.from(
        { length: 3 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      {/* Noise filter overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl p-8 w-full mx-auto my-8 bg-transparent"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 grainy-text">
            CV
          </h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Download my CV in danish eller english
          </p>
        </motion.div>

        {/* PDF Preview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Danish CV */}
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="absolute -top-8 -left-8 w-24 h-24 opacity-20"
              style={{
                WebkitMaskImage: `url(${randomShapes[0]})`,
                maskImage: `url(${randomShapes[0]})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                backgroundColor: '#FF6B6B',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src={danishpng}
              alt="Dansk CV forhåndsvisning"
              className="mb-4 rounded-lg shadow-md mx-auto"
            />
            <a
              href={danishpdf}
              download
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Download på dansk
            </a>
          </motion.div>

          {/* English CV */}
          <motion.div
            className="text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              className="absolute -bottom-8 -right-8 w-24 h-24 opacity-20"
              style={{
                WebkitMaskImage: `url(${randomShapes[1]})`,
                maskImage: `url(${randomShapes[1]})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                backgroundColor: '#4ECDC4',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src={englishpng}
              alt="English CV preview"
              className="mb-4 rounded-lg shadow-md mx-auto"
            />
            <a
              href={englishpdf}
              download
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Download in English
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CVPage;
