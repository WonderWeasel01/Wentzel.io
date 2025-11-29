'use client';

import { motion } from 'framer-motion';
// Images are in public/assets/images/
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import NoiseFilter from '../components/NoiseFilter';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import { shapes } from '../components/shapes';
import { useLanguage } from '../contexts/LanguageContext';

import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function Home() {
  const { t } = useLanguage();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);

    // Generate random shapes once on mount
    setRandomShapes(
      Array.from(
        { length: 7 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent hydration mismatch or flash by waiting for client-side check
  if (!isLoaded) return null;

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      
      <motion.div 
        className="flex w-full h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Noise Filter Overlay */}
        <NoiseFilter />
        <Navbar />

        {/* Main Content Area */}
        <main className="flex flex-col w-full md:w-[calc(100%-16rem)] h-full overflow-y-auto relative ml-0 md:ml-64 scrollbar-hide">
        {/* Background grain pattern */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        <div className="relative z-10 w-full">
          {/* About Section */} 
          <motion.section
            id="about"
            className="py-24 relative px-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 grainy-text">
                {t('home.about.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-square relative rounded-2xl overflow-hidden grainy-image">
                  <Image
                    src="/images/alex.jpeg"
                    alt="Alex Wentzel"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Rotating Shape 5 - Further Down */}
                <motion.div
                  className="absolute -bottom-[300px] left-1/4 w-20 h-20 z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      mask: `url(${randomShapes[1]}) center/contain no-repeat`,
                      WebkitMask: `url(${randomShapes[1]}) center/contain no-repeat`,
                      backgroundColor: '#FFD700',
                    }}
                  />
                </motion.div>

                {/* Rotating Shape 6 - Further Down */}
                <motion.div
                  className="absolute -bottom-[200px] right-1/4 w-24 h-24 z-10"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      mask: `url(${randomShapes[2]}) center/contain no-repeat`,
                      WebkitMask: `url(${randomShapes[2]}) center/contain no-repeat`,
                      backgroundColor: '#9370DB',
                    }}
                  />
                </motion.div>

                {/* Rotating Shape 7 - Further Down */}
                <motion.div
                  className="absolute bottom-28 left-22 w-16 h-16 z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      mask: `url(${randomShapes[3]}) center/contain no-repeat`,
                      WebkitMask: `url(${randomShapes[3]}) center/contain no-repeat`,
                      backgroundColor: '#FFA07A',
                    }}
                  />
                </motion.div>
                <div>
                  <p className="text-lg mb-6 leading-relaxed">
                    {t('home.about.text')}
                  </p>
                  <div className="flex space-x-4 mt-8">
                    <a
                      href="https://github.com/WonderWeasel01"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-stone-300 rounded-full hover:bg-stone-200 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/alexander-wentzel-621654196/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border border-stone-300 rounded-full hover:bg-stone-200 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href="mailto:alex@wentzel.io"
                      className="p-2 border border-stone-300 rounded-full hover:bg-stone-200 transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            className="py-24 relative px-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat"></div>
            </div>
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 grainy-text">
                {t('home.skills.title')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  'React',
                  'Next.js',
                  'Java',
                  'Rust',
                  'Typescript',
                  'Tailwind CSS',
                  'PostgreSQL',
                  'Framer Motion',
                ].map((skill) => (
                  <div
                    key={skill}
                    className="p-4 border border-stone-300 rounded-lg hover:border-amber-500 transition-colors bg-white/50 backdrop-blur-sm"
                  >
                    <p className="font-medium text-center">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <Testimonials />

          {/* CTA Section */}
          <motion.section
            className="py-32 relative px-6 md:px-12 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold mb-8 text-stone-900 grainy-text leading-tight">
                {t('home.cta.title')}
              </h2>
              
              <p className="text-xl md:text-2xl text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                {t('home.cta.text')}
              </p>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <motion.a
                  href="mailto:alex@wentzel.io"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-amber-500 text-stone-900 px-8 py-4 rounded-full hover:bg-amber-400 transition-colors font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-amber-500/20"
                >
                  <Mail className="w-5 h-5" />
                  {t('home.cta.button')}
                </motion.a>

                <motion.a
                  href="https://onezite.dk"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 bg-white text-stone-900 border-2 border-stone-200 px-8 py-4 rounded-full hover:border-amber-500 hover:text-amber-600 transition-colors font-bold text-lg shadow-md hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t('footer.onezite_desc')}
                </motion.a>
              </div>
            </div>

            {/* Playful Floating Shapes */}
            {randomShapes.length > 0 && (
              <>
                <motion.div
                  className="absolute top-10 left-10 md:left-20 w-20 h-20 md:w-32 md:h-32 z-0 opacity-80"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: 360 
                  }}
                  transition={{ 
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      mask: `url(${randomShapes[4]}) center/contain no-repeat`,
                      WebkitMask: `url(${randomShapes[4]}) center/contain no-repeat`,
                      backgroundColor: '#f59e0b', // amber-500
                    }}
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-10 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24 z-0 opacity-60"
                  animate={{ 
                    y: [0, 30, 0],
                    rotate: -360 
                  }}
                  transition={{ 
                    y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      mask: `url(${randomShapes[5]}) center/contain no-repeat`,
                      WebkitMask: `url(${randomShapes[5]}) center/contain no-repeat`,
                      backgroundColor: '#78716c', // stone-500
                    }}
                  />
                </motion.div>
              </>
            )}
          </motion.section>
          
          <Footer />
        </div>
      </main>
      </motion.div>
    </div>
  );
}

