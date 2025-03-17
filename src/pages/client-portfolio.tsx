import React from 'react';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Code,
  ExternalLink,
  Globe,
  Laptop,
  Lock,
} from 'lucide-react';
import NoiseFilter from '../components/noiseFilter';
import { shapes } from '../components/shapes';
import { Link as RouterLink } from 'react-router-dom';

// Import images
import wentzel from '../assets/images/clients/wentzel.png';
import krudt from '../assets/images/clients/krudt.png';
import lni from '../assets/images/clients/lni.png';
import rene from '../assets/images/clients/rene.png';

// Client website data
const clientWebsites = [
  {
    id: 1,
    name: 'Wentzel Event',
    description:
      'Showcase website for an event agency specializing in rental LED screens (up to 15m²). Includes contact options and event portfolio.',
    image: wentzel, // Direkte reference til det importerede billede
    status: 'completed',
    link: 'https://wentzelevent.dk/hjem',
    tags: ['Showcase', 'Events', 'LED Screens'],
  },
  {
    id: 2,
    name: 'Krudt-Ræven',
    description:
      'Website displaying product catalog and store locations. Integrated with Google Analytics for visitor tracking and behavior insights to improve future seasons.',
    image: krudt, // Direkte reference til det importerede billede
    status: 'completed',
    link: 'https://krudtraeven.dk/hjem',
    tags: ['E-commerce', 'Catalog', 'Google Analytics'],
  },
  {
    id: 3,
    name: 'Lille Næstved Idrætsforening',
    description:
      'Gymnastics and sports club website for team sign-ups, schedule display, and uniform purchases. Backend integration with Conventus for team registration and calendar management.',
    image: lni, // Direkte reference til det importerede billede
    status: 'development',
    link: 'https://lni.wentzeldigital.dk/hjem',
    tags: ['Sports', 'Sign-ups', 'Booking', 'Conventus'],
  },
  {
    id: 4,
    name: 'René Jørgensen',
    description:
      "Personal portfolio website designed like a storytelling book, showcasing René Jørgensen's journey and work. Includes a contact form for inquiries.",
    image: rene, // Direkte reference til det importerede billede
    status: 'development',
    link: 'https://rene.wentzeldigital.dk',
    tags: ['Portfolio', 'Storytelling', 'Gallery', 'Contact Form'],
  },
  {
    id: 5,
    name: 'City Biler',
    description:
      'Website for a mechanic shop, showcasing services, specializations, and contact options for inquiries.',
    image: '/placeholder.svg?height=600&width=800',
    status: 'development',
    link: null, // No server up yet
    tags: ['Automotive', 'Services', 'Mechanic', 'Contact Form'],
    imageOnTheWay: true, // Tilføjet flag til at indikere at billedet er på vej
  },
];

const ClientPortfolio = () => {
  const [randomShapes, setRandomShapes] = useState<string[]>([]);

  useEffect(() => {
    // Generate random shapes once on mount
    setRandomShapes(
      Array.from(
        { length: 5 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  // Separate completed and in-development websites
  const completedWebsites = clientWebsites.filter(
    (site) => site.status === 'completed'
  );
  const developmentWebsites = clientWebsites.filter(
    (site) => site.status === 'development'
  );

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      {/* Noise Filter Overlay */}
      <NoiseFilter />

      {/* Main Content Area */}
      <main className="flex flex-col w-full min-h-[100vh] p-12 overflow-hidden relative">
        {/* Background grain pattern */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <motion.section
            className="py-16 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold mb-6 grainy-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Client Portfolio
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Showcasing our recent client website projects
                </motion.p>
              </div>

              {/* Rotating Shape 1 */}
              <motion.div
                className="absolute top-10 -left-10 w-28 h-28 z-1"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 9,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
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

              {/* Rotating Shape 2 */}
              <motion.div
                className="absolute top-20 right-0 w-20 h-20 z-10"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
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
            </div>
          </motion.section>

          {/* Completed Websites Section */}
          <motion.section
            className="py-12 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 grainy-text">
                Completed Projects
              </h2>

              <div className="grid md:grid-cols-2 gap-12">
                {completedWebsites.map((website, index) => (
                  <motion.div
                    key={website.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={website.image || '/placeholder.svg'}
                        alt={`${website.name} Screenshot`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                        <a
                          href={website.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-stone-900 rounded-lg hover:bg-white transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Visit Website
                        </a>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold">{website.name}</h3>
                        <a
                          href={website.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-stone-900"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-stone-700 mb-4">
                        {website.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {website.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* In Development Websites Section */}
          <motion.section
            className="py-12 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 grainy-text">
                In Development
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {developmentWebsites.map((website, index) => (
                  <motion.div
                    key={website.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Development Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                        In Development
                      </span>
                    </div>

                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-[1]"></div>
                      <img
                        src={website.image || '/placeholder.svg'}
                        alt={
                          website.imageOnTheWay
                            ? ''
                            : `${website.name} Screenshot`
                        }
                        className="w-full h-full object-cover"
                      />
                      {website.imageOnTheWay && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="bg-stone-800/75 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Picture Coming Soon
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{website.name}</h3>
                        {website.link ? (
                          <a
                            href={website.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-500 hover:text-stone-900"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <Lock className="w-4 h-4 text-stone-400" />
                        )}
                      </div>
                      <p className="text-stone-700 text-sm mb-3">
                        {website.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {website.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-2 py-1 bg-stone-100 text-stone-800 text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        {website.link ? (
                          <a
                            href={website.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-800"
                          >
                            <Code className="w-3 h-3" />
                            View Development Server
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-sm text-stone-500">
                            <Lock className="w-3 h-3" />
                            Server not yet available
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Rotating Shape 3 */}
              <motion.div
                className="absolute bottom-10 right-10 w-24 h-24 z-10"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 11,
                  repeat: Number.POSITIVE_INFINITY,
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
            </div>
          </motion.section>

          {/* Contact CTA Section */}
          <motion.section
            className="py-16 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-stone-100 rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need a Website for Your Business?
                </h2>
                <p className="text-stone-700 mb-8 max-w-2xl mx-auto">
                  I create custom websites tailored to your specific needs. From
                  e-commerce to corporate sites, I can help bring your vision to
                  life.
                </p>
                <RouterLink
                  to="mailto:alexwentzel@live.dk"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <Laptop className="w-5 h-5" />
                  Start Your Project
                </RouterLink>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default ClientPortfolio;
