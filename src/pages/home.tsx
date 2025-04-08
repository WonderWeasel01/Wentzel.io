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

// Types
type ShapeUrl = string;

const Home: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [randomShapes, setRandomShapes] = useState<ShapeUrl[]>([]);

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

                {/* Rotating shapes */}
                {randomShapes.slice(0, 4).map((shape, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${
                      index === 0
                        ? '-bottom-[1300px] -left-1 w-28 h-28'
                        : index === 1
                        ? '-bottom-[300px] left-1/4 w-20 h-20'
                        : index === 2
                        ? '-bottom-[200px] right-1/4 w-24 h-24'
                        : 'bottom-28 left-22 w-16 h-16'
                    } z-10`}
                    animate={{ rotate: index % 2 === 0 ? -360 : 360 }}
                    transition={{
                      duration:
                        index === 0
                          ? 9
                          : index === 1
                          ? 7
                          : index === 2
                          ? 11
                          : 9,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        mask: `url(${shape}) center/contain no-repeat`,
                        WebkitMask: `url(${shape}) center/contain no-repeat`,
                        backgroundColor: [
                          '#A5FFD6',
                          '#FFD700',
                          '#9370DB',
                          '#FFA07A',
                        ][index],
                      }}
                    />
                  </motion.div>
                ))}

                <div>
                  <p className="text-lg mb-6 leading-relaxed">
                    Hi! I'm Alex, a developer passionate about creating stunning
                    designs and exploring new trends and technologies. I combine
                    aesthetics with functionality to build beautiful, functional
                    solutions. I'm always experimenting with new tools to refine
                    my craft and enhance user experiences.
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
                {[
                  {
                    logo: realtruck,
                    title: 'Realtruck',
                    description: `Developed a React application with SQL database and a Node.js backend to manage production tracking. 
                      The system timed workers' tasks, counted completed products, and provided data to team leaders. 
                      Managed a database with over 10,000 products.`,
                  },
                  {
                    logo: crazydaisy,
                    title: 'Crazy Daisy',
                    description: `Installed and configured an LED screen system for the club, enabling computer-controlled marketing displays and visual effects.`,
                  },
                  {
                    logo: krudtraeven,
                    title: 'Krudtræven',
                    description: `Created a POS system using React and Vite, integrating with Vibrant.io for payment processing. Enabled in-shop transactions.`,
                  },
                  {
                    logo: gadefesten,
                    title: 'Gadefesten',
                    description: `Helped organize and promote local events through modern web technologies and social media integration.`,
                  },
                ].map((exp, index) => (
                  <div
                    key={index}
                    className="p-6 border border-stone-300 rounded-lg bg-white/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img src={exp.logo} alt={exp.title} className="h-12" />
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                    </div>
                    <p className="text-lg leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Home;
