'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import {
  ArrowUpRight,
  Code,
  ExternalLink,
  Globe,
  Laptop,
  Lock,
  Calendar,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import NoiseFilter from '../../components/NoiseFilter';
import Navbar from '../../components/Navbar';
import { shapes } from '../../components/shapes';
import { projects, Project } from '../../data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';

function ProjectsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
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

  const parseDate = (dateStr: string): number => {
    // Hvis det er Beta, sæt det til 0, så det kommer sidst i sorteringen (fordi vi sorterer faldende)
    if (dateStr === 'Beta udgivet') return 0; 
    
    const months: { [key: string]: number } = {
      'Januar': 1, 'Februar': 2, 'Marts': 3, 'April': 4, 'Maj': 5, 'Juni': 6,
      'Juli': 7, 'August': 8, 'September': 9, 'Oktober': 10, 'November': 11, 'December': 12,
      // Engelske måneder for en sikkerheds skyld
      'January': 1, 'February': 2, 'March': 3, 'May': 5, 'June': 6,
      'July': 7, 'October': 10
    };

    const parts = dateStr.trim().split(' ');
    if (parts.length >= 2) {
      // Håndter store/små bogstaver
      const monthKey = Object.keys(months).find(m => m.toLowerCase() === parts[0].toLowerCase());
      const month = monthKey ? months[monthKey] : 0;
      const year = parseInt(parts[1]);
      
      if (month > 0 && !isNaN(year)) {
        // Returner værdi i formatet YYYYMM (f.eks. 202505 for Maj 2025)
        // Dette sikrer at år altid vægter højere end måned
        return year * 100 + month;
      }
    }
    return 0;
  };

  const filteredProjects = projects
    .filter((project) => {
      if (category === 'client') return project.type === 'client';
      if (category === 'personal') return project.type === 'personal';
      return true;
    })
    .sort((a, b) => {
      // Always put VictoryVault last if showing all projects
      if (!category) {
        if (a.id === 'boardgame-stats') return 1;
        if (b.id === 'boardgame-stats') return -1;
      }
      
      const dateA = t(`${a.translationKey}.date`);
      const dateB = t(`${b.translationKey}.date`);
      
      return parseDate(dateB) - parseDate(dateA);
    });

  const getTitle = () => {
    if (category === 'client') return t('nav.clients');
    if (category === 'personal') return t('nav.personal');
    return t('projects.title');
  };

  const getSubtitle = () => {
    if (category === 'client') return 'Udvalgte projekter for kunder og samarbejdspartnere';
    if (category === 'personal') return 'Egne projekter og eksperimenter';
    return t('projects.subtitle');
  };

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      {/* Noise Filter Overlay */}
      <NoiseFilter />
      <Navbar />

      {/* Main Content Area */}
      <main className="flex flex-col w-full min-h-[100vh] p-6 md:p-12 overflow-hidden relative ml-0 md:ml-64">
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
                  {getTitle()}
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {getSubtitle()}
                </motion.p>
              </div>

              {/* Rotating Shape 1 */}
              {randomShapes.length > 0 && (
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
              )}

              {/* Rotating Shape 2 */}
              {randomShapes.length > 0 && (
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
              )}
            </div>
          </motion.section>

          {/* Projects Grid */}
          <motion.section
            className="py-12 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} Screenshot`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-start p-4">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 text-stone-900 rounded-lg">
                            <Globe className="w-4 h-4" />
                            Se projekt
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-stone-500 font-medium flex items-center gap-1 mb-1">
                            <Calendar className="w-3 h-3" />
                            {t(`${project.translationKey}.date`)}
                          </span>
                          <h3 className="text-2xl font-bold">{project.title}</h3>
                        </div>
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-stone-900"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-stone-700 mb-4 line-clamp-3">
                        {t(`${project.translationKey}.description`)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                          {t(`${project.translationKey}.label`)}
                        </span>
                        <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-xs font-medium rounded-full">
                          {project.year}
                        </span>
                      </div>
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-800 font-medium"
                      >
                        Læs mere
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
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

          </motion.section>
        </div>
      </main>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
