'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { shapes } from '../../components/shapes';
import NoiseFilter from '../../components/NoiseFilter';
import Navbar from '../../components/Navbar';
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Linkedin,
  Globe,
  Code,
  Layout,
  PenTool,
  Printer,
  ArrowDown
} from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import Footer from '../../components/Footer';

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  type: 'work' | 'education';
}

export default function CVPage() {
  const { t } = useLanguage();
  const [randomShapes, setRandomShapes] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(scrollProgress, [0, 1], ["0%", "100%"]);

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setRandomShapes(
      Array.from(
        { length: 5 },
        () => shapes[Math.floor(Math.random() * shapes.length)]
      )
    );
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const scrollToStructuredCV = () => {
    document.getElementById('structured-cv')?.scrollIntoView({ behavior: 'smooth' });
  };

  const timelineData: TimelineItem[] = [
    {
      id: 'onezite',
      role: t('cv.timeline.onezite.role'),
      company: 'Onezite ApS',
      period: `Apr 2025 - ${t('cv.present')}`,
      location: 'Omøvej 6A 4700 Næstved',
      description: [
        t('cv.timeline.onezite.desc1'),
        t('cv.timeline.onezite.desc2')
      ],
      type: 'work'
    },
    {
      id: 'wentzel-event-aps',
      role: t('cv.timeline.wentzel_event_aps.role'),
      company: 'Wentzel Event ApS',
      period: `Sep 2024 - ${t('cv.present')}`,
      location: 'Omøvej 6A 4700 Næstved',
      description: [
        t('cv.timeline.wentzel_event_aps.desc1'),
        t('cv.timeline.wentzel_event_aps.desc2')
      ],
      type: 'work'
    },
    {
      id: 'friedrich-wentzel',
      role: t('cv.timeline.friedrich_wentzel.role'),
      company: 'Friedrich/Wentzel ApS',
      period: `Sep 2024 - ${t('cv.present')}`,
      location: 'Fyrreparken 11 4700 Næstved',
      description: [
        t('cv.timeline.friedrich_wentzel.desc1')
      ],
      type: 'work'
    },
    {
      id: 'wentzel-event',
      role: t('cv.timeline.wentzel_event.role'),
      company: 'Wentzel Event',
      period: `Aug 2019 - ${t('cv.present')}`,
      location: 'Omøvej 6A 4700 Næstved',
      description: [
        t('cv.timeline.wentzel_event.desc1'),
        t('cv.timeline.wentzel_event.desc2')
      ],
      type: 'work'
    },
    {
      id: 'lille-naestved-if',
      role: t('cv.timeline.lille_naestved_if.role'),
      company: t('cv.timeline.lille_naestved_if.company'),
      period: '2024 - 2026',
      location: 'Næstved',
      description: [
        t('cv.timeline.lille_naestved_if.desc1'),
        t('cv.timeline.lille_naestved_if.desc2')
      ],
      type: 'work'
    },
    {
      id: 'datamatiker',
      role: t('cv.timeline.datamatiker.role'),
      company: t('cv.timeline.datamatiker.company'),
      period: 'Sep 2022 - Jan 2026',
      description: [],
      type: 'education'
    },
    {
      id: 'realtruck-graphic',
      role: t('cv.timeline.realtruck_graphic.role'),
      company: 'Realtruck',
      period: 'Jan 2023 - Feb 2024',
      location: 'Pedersholmparken 10 3600 Frederikssund',
      description: [
        t('cv.timeline.realtruck_graphic.desc1')
      ],
      type: 'work'
    },
    {
      id: 'realtruck-prod',
      role: t('cv.timeline.realtruck_prod.role'),
      company: 'Realtruck',
      period: 'Sep 2017 - Jan 2023',
      location: 'Pedersholmparken 10 3600 Frederikssund',
      description: [
        t('cv.timeline.realtruck_prod.desc1'),
        t('cv.timeline.realtruck_prod.desc2')
      ],
      type: 'work'
    },
    {
      id: 'hf',
      role: t('cv.timeline.hf.role'),
      company: t('cv.timeline.hf.company'),
      period: 'Aug 2019 - Jun 2021',
      description: [],
      type: 'education'
    }
  ];

  const skills = [
    { name: 'React, React Native & Next.js', icon: Code },
    { name: 'Java, Rust & TypeScript', icon: Code },
    { name: 'One-page Hjemmesider', icon: Globe },
    { name: 'Adobe Pakken', icon: PenTool },
    { name: 'UI/UX & Design', icon: Layout },
  ];

  const languages = [
    { name: t('cv.language.danish'), level: t('cv.language.level.fluent') },
    { name: t('cv.language.english'), level: t('cv.language.level.fluent') },
    { name: t('cv.language.german'), level: t('cv.language.level.basic') },
  ];

  return (
    <>
    {/* Screen View */}
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden print:hidden">
      <NoiseFilter />
      <Navbar />

      <main className="flex flex-col w-full min-h-[100vh] overflow-hidden relative ml-0 md:ml-64">
        {/* Background Pattern */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30"></div>
        </div>

        {/* Hero Section with Bio */}
        <div className="relative z-10 w-full px-12 pt-24 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 grainy-text">
                {t('cv.experience')}
              </h1>
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-200 shadow-sm">
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-6">
                  {t('cv.bio')}
                </p>
                
                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-stone-600">
                  <a href="mailto:alex@wentzel.io" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                    <Mail size={18} />
                    alex@wentzel.io
                  </a>
                  <a href="tel:+4552391248" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                    <Phone size={18} />
                    +45 52 39 12 48
                  </a>
                  <a href="https://www.linkedin.com/in/alexander-wentzel-621654196/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col items-start relative">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="relative group inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl hover:bg-stone-800 transition-colors shadow-md"
                  >
                    <span className="font-medium">{t('cv.view_cv')}</span>
                    
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Skills & Languages Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-200 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Code className="text-amber-600" />
                  {t('cv.skills')}
                </h3>
                <ul className="space-y-3">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-200 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Globe className="text-amber-600" />
                  {t('cv.languages')}
                </h3>
                <ul className="space-y-3">
                  {languages.map((lang, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-stone-500 text-sm">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative w-full px-12 pb-24" ref={containerRef}>
          <div className="max-w-4xl mx-auto relative">
            {/* Central Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-6 -ml-3 pointer-events-none overflow-hidden">
              {/* Background gray wavy line */}
              <div 
                className="w-full h-full bg-repeat-y opacity-30" 
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'128\' viewBox=\'0 0 24 128\' fill=\'none\' stroke=\'%2378716c\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 0 C 4 10 4 20 12 30 C 20 40 20 60 12 70 C 4 75 4 85 12 90 C 18 100 18 118 12 128\' /%3E%3C/svg%3E")' 
                }}
              />
              
              {/* Foreground amber wavy line with height animation */}
              <motion.div 
                className="absolute top-0 left-0 w-full overflow-hidden"
                style={{ height: lineHeight }}
              >
                <div 
                  className="w-full h-full bg-repeat-y" 
                  style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'128\' viewBox=\'0 0 24 128\' fill=\'none\' stroke=\'%23f59e0b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 0 C 4 10 4 20 12 30 C 20 40 20 60 12 70 C 4 75 4 85 12 90 C 18 100 18 118 12 128\' /%3E%3C/svg%3E")' 
                  }}
                />
              </motion.div>
            </div>

            <div className="space-y-16">
              {timelineData.map((item, index) => (
                <TimelineItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

      <Footer />
      </main>
    </div>

    {/* Structured CV Modal */}
    <AnimatePresence>
    {showPreview && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowPreview(false)}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl max-w-[210mm] w-full"
        >
          <div id="structured-cv" className="bg-white text-black p-8 mx-auto">
            {/* Header */}
            <div className="border-b-2 border-stone-800 pb-8 mb-8 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-stone-200 shrink-0">
                  <Image 
                    src="/images/alex.jpeg" 
                    alt="Alex Wentzel" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">Alexander Wentzel</h1>
                  <h2 className="text-xl text-stone-600 font-medium">{t('cv.role.title')}</h2>
                </div>
              </div>
              <div className="text-right text-sm text-stone-600 space-y-1">
                <p>alex@wentzel.io</p>
                <p>+45 52 39 12 48</p>
                <p>{t('cv.location')}</p>
                <p>linkedin.com/in/alexander-wentzel</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="col-span-2 space-y-8">
                {/* Profile */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.profile')}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {t('cv.bio')}
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.experience')}</h3>
                  <div className="space-y-6">
                    {timelineData.filter(item => item.type === 'work').map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-stone-900">{item.role}</h4>
                          <span className="text-xs text-stone-500 font-medium">{item.period}</span>
                        </div>
                        <div className="text-sm text-amber-700 font-medium mb-1">{item.company}</div>
                        {item.description.length > 0 && (
                          <ul className="list-disc list-outside ml-4 text-xs text-stone-600 space-y-1">
                            {item.description.map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-1 space-y-8">
                {/* Education */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.education')}</h3>
                  <div className="space-y-4">
                    {timelineData.filter(item => item.type === 'education').map(item => (
                      <div key={item.id}>
                        <h4 className="font-bold text-sm text-stone-900">{item.company}</h4>
                        <div className="text-xs text-stone-600 mb-1">{item.role}</div>
                        <span className="text-xs text-stone-500 block">{item.period}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.skills')}</h3>
                  <ul className="space-y-2">
                    {skills.map((skill, index) => (
                      <li key={index} className="text-sm text-stone-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Languages */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.languages')}</h3>
                  <ul className="space-y-2">
                    {languages.map((lang, index) => (
                      <li key={index} className="text-sm text-stone-700">
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-xs text-stone-500">{lang.level}</div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
            
            {/* Print Button Inside Modal */}
            <div className="mt-12 flex justify-center print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-800 transition-colors"
              >
                <Printer size={18} />
                Print / Gem som PDF
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
    </AnimatePresence>

    {/* Hidden Print Structure (for direct printing if needed outside modal context, though modal print is usually sufficient) */}
    <div className="hidden print:block bg-white text-black p-8 max-w-[210mm] mx-auto">
       {/* Same structure as above for pure print styles */}
       <div className="border-b-2 border-stone-800 pb-8 mb-8 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-stone-200 shrink-0">
                  <Image 
                    src="/images/alex.jpeg" 
                    alt="Alex Wentzel" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">Alexander Wentzel</h1>
                  <h2 className="text-xl text-stone-600 font-medium">{t('cv.role.title')}</h2>
                </div>
              </div>
              <div className="text-right text-sm text-stone-600 space-y-1">
                <p>alex@wentzel.io</p>
                <p>+45 52 39 12 48</p>
                <p>{t('cv.location')}</p>
                <p>linkedin.com/in/alexander-wentzel</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="col-span-2 space-y-8">
                {/* Profile */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.profile')}</h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {t('cv.bio')}
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.experience')}</h3>
                  <div className="space-y-6">
                    {timelineData.filter(item => item.type === 'work').map(item => (
                      <div key={item.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-stone-900">{item.role}</h4>
                          <span className="text-xs text-stone-500 font-medium">{item.period}</span>
                        </div>
                        <div className="text-sm text-amber-700 font-medium mb-1">{item.company}</div>
                        {item.description.length > 0 && (
                          <ul className="list-disc list-outside ml-4 text-xs text-stone-600 space-y-1">
                            {item.description.map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column - Sidebar */}
              <div className="col-span-1 space-y-8">
                {/* Education */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.education')}</h3>
                  <div className="space-y-4">
                    {timelineData.filter(item => item.type === 'education').map(item => (
                      <div key={item.id}>
                        <h4 className="font-bold text-sm text-stone-900">{item.company}</h4>
                        <div className="text-xs text-stone-600 mb-1">{item.role}</div>
                        <span className="text-xs text-stone-500 block">{item.period}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.skills')}</h3>
                  <ul className="space-y-2">
                    {skills.map((skill, index) => (
                      <li key={index} className="text-sm text-stone-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Languages */}
                <section>
                  <h3 className="text-lg font-bold uppercase border-b border-stone-300 pb-2 mb-4">{t('cv.languages')}</h3>
                  <ul className="space-y-2">
                    {languages.map((lang, index) => (
                      <li key={index} className="text-sm text-stone-700">
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-xs text-stone-500">{lang.level}</div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
    </div>
    </>
  );
}

function TimelineItemCard({ item, index }: { item: TimelineItem; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row gap-6 md:gap-24 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Date Marker (Mobile: Top, Desktop: Center) */}
      <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-stone-100 transform -translate-x-1/2 mt-6 z-10 shadow-sm" />

      {/* Content Side */}
      <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className={`bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow relative
          ${isEven ? 'md:mr-auto' : 'md:ml-auto'}
        `}>
          {/* Arrow */}
          <div className={`hidden md:block absolute top-6 w-4 h-4 bg-white transform rotate-45 border-stone-200
            ${isEven 
              ? '-left-2.5 border-l border-b' // Content on Right (row-reverse) -> Arrow on Left, pointing Left (<)
              : '-right-2.5 border-t border-r' // Content on Left -> Arrow on Right, pointing Right (>)
            }
          `} />

          <div className={`flex items-center gap-2 mb-2 text-amber-600 font-medium text-sm
            ${isEven ? 'md:flex-row-reverse' : ''}
          `}>
            <Calendar size={14} />
            {item.period}
          </div>

          <h3 className="text-xl font-bold mb-1">{item.role}</h3>
          
          <div className={`flex items-center gap-2 text-stone-600 mb-4
            ${isEven ? 'md:flex-row-reverse' : ''}
          `}>
            {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
            <span className="font-medium">{item.company}</span>
          </div>

          {item.location && (
            <div className={`flex items-center gap-2 text-stone-400 text-xs mb-4
              ${isEven ? 'md:flex-row-reverse' : ''}
            `}>
              <MapPin size={12} />
              {item.location}
            </div>
          )}

          {item.description.length > 0 && (
            <ul className={`space-y-2 text-stone-600 text-sm
              ${isEven ? 'text-right' : 'text-left'}
            `}>
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Empty Side for Desktop Balance */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
