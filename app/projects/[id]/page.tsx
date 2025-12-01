'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  Globe,
  Calendar,
  User,
  Code,
  CheckCircle,
  ArrowLeft,
  Layers,
  Package,
  Laptop
} from 'lucide-react';
import NoiseFilter from '../../../components/NoiseFilter';
import Navbar from '../../../components/Navbar';
import { shapes } from '../../../components/shapes';
import { projects, Project } from '../../../data/projects';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function ProjectDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const projectId = params?.id as string;
  const project = projects.find((p) => p.id === projectId);
  const [randomShapes, setRandomShapes] = useState<string[]>([]);

  useEffect(() => {
    setRandomShapes(
      Array.from(
        { length: 5 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  if (!project) {
    return (
      <div className="flex min-h-screen bg-stone-100 text-stone-900">
        <Navbar />
        <main className="flex-1 p-12 ml-0 md:ml-64">
          <h1 className="text-4xl font-bold mb-4">Projekt ikke fundet / Project not found</h1>
          <Link href="/projects" className="text-amber-600 hover:text-amber-800">
            {t('project.back')}
          </Link>
        </main>
      </div>
    );
  }

  // Get dynamic arrays from translations
  const fullDescription = Array.from({ length: project.fullDescriptionCount }).map((_, i) => 
    t(`${project.translationKey}.fullDescription.${i}`)
  );
  
  const features = Array.from({ length: project.featuresCount }).map((_, i) => 
    t(`${project.translationKey}.features.${i}`)
  );

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      <NoiseFilter />
      <Navbar />

      <main className="flex flex-col w-full min-h-[100vh] ml-0 md:ml-64 relative">
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        {/* Hero Section with full width image */}
        <div className="relative h-[50vh] md:h-[60vh] w-full z-10">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-amber-500/90 text-stone-900 px-4 py-2 rounded-md inline-block mb-4 self-start backdrop-blur-sm">
                <span className="text-sm font-bold uppercase tracking-wider">{t(`${project.translationKey}.label`)}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white grainy-text">{project.title}</h1>
              <p className="text-stone-200 max-w-2xl text-lg md:text-xl leading-relaxed">{t(`${project.translationKey}.description`)}</p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/projects"
            className="inline-flex items-center text-stone-500 hover:text-stone-900 transition-colors mb-12 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('project.back')}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Screenshot Section - 2/3 width */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-stone-200 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Laptop className="w-6 h-6 text-amber-600" />
                Projekt Screenshot
              </h2>
              <div className="relative aspect-video w-full">
                <Image
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* Project Details Card - 1/3 width */}
            <motion.div 
              className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-lg border border-stone-200 h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-stone-100">{t('project.details')}</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-4 text-amber-600 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">{t('project.date')}</p>
                    <p className="text-stone-800 font-medium">{t(`${project.translationKey}.date`)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 mr-4 text-amber-600 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">{t('project.client')}</p>
                    <p className="text-stone-800 font-medium">{project.client}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Layers className="h-5 w-5 mr-4 text-amber-600 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">{t('project.platform')}</p>
                    <p className="text-stone-800 font-medium">{project.platform}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Package className="h-5 w-5 mr-4 text-amber-600 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">{t('project.package')}</p>
                    <p className="text-stone-800 font-medium">{project.package}</p>
                  </div>
                </div>

                <div className="flex items-start pt-4 border-t border-stone-100 mt-2">
                  <Globe className="h-5 w-5 mr-4 text-amber-600 mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">{t('project.links')}</p>
                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-900 hover:text-amber-600 font-bold flex items-center transition-colors group mb-1"
                      >
                        {t('project.visit')}
                        <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : null}
                    
                    {project.github ? (
                       <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-900 hover:text-amber-600 font-bold flex items-center transition-colors group"
                      >
                        GitHub Repo
                        <Code className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : null}

                    {!project.website && !project.github && (
                      <span className="text-stone-500 italic">{t('project.coming_soon')}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-12">
              {/* Mobile Version Section */}
              <motion.section 
                className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-amber-600" />
                  {project.type === 'personal' ? t('project.screenshots') : t('project.mobile')}
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
                  <div className="relative w-[500px] h-[400px]">
                    <div className="relative w-full h-full">
                      <Image
                        src={project.phoneMockup}
                        alt={`${project.title} Mobile 1`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                  
                  <div className="relative w-[450px] h-[500px]">
                    <div className="relative w-full h-full">
                      <Image
                        src={project.phoneMockup2}
                        alt={`${project.title} Mobile 2`}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

            {/* About Project */}
            <motion.section 
              className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t('project.about')}</h2>
              <div className="space-y-4">
                {fullDescription.map((paragraph, index) => (
                  <p key={index} className="text-stone-700 leading-relaxed text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.section>

            {/* Features */}
            <motion.section 
              className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t('project.features')}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start bg-stone-50 p-4 rounded-lg">
                    <div className="mr-3 mt-1 bg-amber-100 p-1 rounded-full text-amber-600">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-stone-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Technologies */}
            <motion.section 
              className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">{t('project.technologies')}</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-sm font-medium border border-stone-200">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Related Projects */}
          <section className="mt-24 pt-12 border-t border-stone-200">
            <h2 className="text-3xl font-bold mb-8 text-stone-800">{t('project.other_projects')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects
                .filter((p) => p.id !== project.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map((relatedProject) => (
                  <Link href={`/projects/${relatedProject.id}`} key={relatedProject.id} className="group">
                    <motion.div 
                      className="relative rounded-xl overflow-hidden h-72 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                      whileHover={{ y: -5 }}
                    >
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <div className="bg-amber-500 text-stone-900 px-3 py-1 rounded-md inline-block mb-2 self-start text-xs font-bold uppercase">
                          {t(`${relatedProject.translationKey}.label`)}
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-white">{relatedProject.title}</h3>
                        <p className="text-sm text-stone-200 line-clamp-2">{t(`${relatedProject.translationKey}.description`)}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
