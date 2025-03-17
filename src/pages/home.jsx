import { motion } from 'framer-motion';
import profilePic from '../assets/images/alex.jpeg';
import { useState, useEffect } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import NoiseFilter from '../components/noiseFilter';
import crazydaisy from '../assets/images/logos/cd.jpeg';
import krudtraeven from '../assets/images/logos/kr.png';
import gadefesten from '../assets/images/logos/gf.png';
import realtruck from '../assets/images/logos/rt.jpeg';
import { shapes } from '../components/shapes';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [randomShapes, setRandomShapes] = useState([]);

  useEffect(() => {
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

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      {/* Noise Filter Overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <main className="flex flex-col w-full min-h-[100vh] p-12 overflow-y-hidden relative">
        {/* Background grain pattern */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        <div className="relative z-10">
          {/* About Section */}
          <motion.section
            id="about"
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 grainy-text">
                About Me
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="aspect-square relative rounded-2xl overflow-hidden grainy-image">
                  <img
                    src={profilePic || '/placeholder.svg'}
                    alt="Alex Wentzel"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Rotating Shape 4 - Top Left */}
                <motion.div
                  className="absolute -bottom-[1300px] -left-1 w-28 h-28 z-1"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      mask: `url(${randomShapes[0]}) center/contain no-repeat`,
                      WebkitMask: `url(${randomShapes[0]}) center/contain no-repeat`,
                      backgroundColor: '#A5FFD6',
                    }}
                  />
                </motion.div>

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
                    Hi! I'm Alex, a developer passionate about creating stunning
                    designs and exploring new trends and technologies. My
                    strength lies in combining aesthetics with functionality,
                    and I always strive to create solutions that not only work
                    well but also look fantastic. I'm constantly on the lookout
                    for new tools and techniques that can help me refine my
                    craft and create even better user experiences.
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
                      href="mailto:alexwentzel@live.dk"
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
            className="py-24 relative"
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
                Most Used Skills & Technologies
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  'Framer Motion',
                  'HTML/CSS',
                  'Java',
                  'JavaScript',
                  'React',
                  'Rust',
                  'Tailwind CSS',
                  'Vite',
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

          {/* Experience Section */}
          <motion.section
            id="experience"
            className="py-24 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 grainy-text">
                Experience
              </h2>
              <div className="space-y-12">
                {/* Realtruck */}
                <div className="p-6 border border-stone-300 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={realtruck} alt="Realtruck" className="h-12" />
                    <h3 className="text-xl font-bold">Realtruck</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    Developed a React application with SQL database and a node.js backend to manage
                    production tracking. The system timed workers' tasks,
                    counted completed products, and provided data to team
                    leaders. Managed a database with over 10,000 products.
                  </p>
                </div>

                {/* Crazy Daisy */}
                <div className="p-6 border border-stone-300 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={crazydaisy} alt="Crazy Daisy" className="h-12" />
                    <h3 className="text-xl font-bold">Crazy Daisy</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    Installed and configured an LED screen system for the club,
                    enabling computer-controlled marketing displays and visual
                    effects.
                  </p>
                </div>

                {/* Krudtræven */}
                <div className="p-6 border border-stone-300 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={krudtraeven} alt="Krudtræven" className="h-12" />
                    <h3 className="text-xl font-bold">Krudtræven</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    Created a POS system using React and Vite, integrating with
                    Vibrant.io for payment processing. The system in shop
                    transactions.
                  </p>
                </div>

                {/* Gadefesten */}
                <div className="p-6 border border-stone-300 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={gadefesten} alt="Gadefesten" className="h-12" />
                    <h3 className="text-xl font-bold">Gadefesten</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    Will be providing an updated version of the POS system
                    developed for Krudtræven for their event on May 1-3. The
                    last event we held had 10,000 visitors.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Home;
