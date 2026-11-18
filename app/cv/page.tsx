'use client';

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PillButton from '../../components/PillButton';
import { PageShell } from '../../components/SiteChrome';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Mail, 
  Phone, 
  Linkedin,
  Github,
  Globe,
  Code,
  Layout,
  PenTool,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';
import ShurikenIcon from '../../components/ShurikenIcon';

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  type: 'work' | 'education';
}

function CVPageContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
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
  const [downloadRotation, setDownloadRotation] = useState(0);
  const [closeRotation, setCloseRotation] = useState(0);
  const spinDownload = () => setDownloadRotation((r) => r + 180);
  const spinClose = () => setCloseRotation((r) => r + 180);

  useEffect(() => {
    if (searchParams.get('download') === '1') {
      setShowPreview(true);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  const scrollToStructuredCV = () => {
    document.getElementById('structured-cv')?.scrollIntoView({ behavior: 'smooth' });
  };

  const timelineData: TimelineItem[] = [
    {
      id: 'membar-app',
      role: t('cv.timeline.membar_app.role'),
      company: 'Membar',
      period: `2025 - ${t('cv.present')}`,
      description: [
        t('cv.timeline.membar_app.desc1'),
        t('cv.timeline.membar_app.desc2'),
        t('cv.timeline.membar_app.desc3')
      ],
      type: 'work'
    },
    {
      id: 'onezite',
      role: t('cv.timeline.onezite.role'),
      company: 'Onezite ApS',
      period: 'Apr 2025 - Jan 2026',
      location: 'Næstved',
      description: [
        t('cv.timeline.onezite.desc1'),
        t('cv.timeline.onezite.desc2'),
        t('cv.timeline.onezite.desc3')
      ],
      type: 'work'
    },
    {
      id: 'enterprise-pos',
      role: t('cv.timeline.enterprise_pos.role'),
      company: 'Holy Smash ApS & Gadefesten',
      period: '2025',
      description: [
        t('cv.timeline.enterprise_pos.desc1'),
        t('cv.timeline.enterprise_pos.desc2'),
        t('cv.timeline.enterprise_pos.desc3'),
      ],
      type: 'work',
    },
    {
      id: 'datamatiker',
      role: t('cv.timeline.datamatiker.role'),
      company: t('cv.timeline.datamatiker.company'),
      period: 'Sep 2022 - Jan 2026',
      description: [
        t('cv.timeline.datamatiker.desc1'),
        t('cv.timeline.datamatiker.desc2'),
      ],
      type: 'education',
    },
  ];

  const skills = [
    { name: t('cv.skill.react'), icon: Code },
    { name: t('cv.skill.typescript'), icon: Code },
    { name: t('cv.skill.frontend_arch'), icon: Layout },
    { name: t('cv.skill.realtime'), icon: Globe },
    { name: t('cv.skill.scalable'), icon: Layout },
    { name: t('cv.skill.ux'), icon: Layout },
    { name: t('cv.skill.api'), icon: Code },
    { name: t('cv.skill.databases'), icon: Globe },
    { name: t('cv.skill.payments'), icon: PenTool },
    { name: t('cv.skill.fullstack'), icon: Layout },
  ];

  const languages = [
    { name: t('cv.language.danish'), level: t('cv.language.level.fluent') },
    { name: t('cv.language.english'), level: t('cv.language.level.fluent') },
    { name: t('cv.language.german'), level: t('cv.language.level.basic') },
  ];

  return (
    <>
    <PageShell className="print:hidden">
      <div className="relative z-10 w-full px-6 pb-24 pt-32 md:px-10 md:pt-40">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h1 className="mb-10 text-4xl font-semibold tracking-tight md:text-6xl">
                {t('cv.title')}
              </h1>

              <SectionHeader title={t('cv.info_section.title')} />

              <div className="rounded-3xl border border-border bg-pill/60 p-8">
                <p className="mb-6 text-lg leading-relaxed text-foreground/85 md:text-xl">
                  {t('cv.bio')}
                </p>
                
                <div className="flex flex-wrap gap-4 text-foreground/70">
                  <a href="mailto:alex@wentzel.io" className="link-hover-blue flex items-center gap-2">
                    <Mail size={18} />
                    alex@wentzel.io
                  </a>
                  <a href="tel:+4552391248" className="link-hover-blue flex items-center gap-2">
                    <Phone size={18} />
                    +45 52 39 12 48
                  </a>
                  <a href="https://www.linkedin.com/in/wentzel01" target="_blank" rel="noopener noreferrer" className="link-hover-blue flex items-center gap-2">
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                  <a href="https://github.com/WonderWeasel01" target="_blank" rel="noopener noreferrer" className="link-hover-blue flex items-center gap-2">
                    <Github size={18} />
                    GitHub
                  </a>
                </div>

                <div className="relative mt-8 flex flex-col items-start border-t border-border pt-8">
                  <PillButton type="button" size="md" onClick={() => setShowPreview(true)}>
                    {t('cv.view_cv')}
                  </PillButton>
                </div>
              </div>

              <div className="mt-10">
                <SectionHeader title={t('cv.skills')} />
                <div className="rounded-3xl border border-border bg-pill/60 p-8">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {skills.map((skill, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm md:text-base">
                        <div className="size-2 shrink-0 rounded-full bg-white/60" />
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Featured Apps */}
              <div className="mt-10">
                <SectionHeader title={t('cv.featured_apps.title')} />

                <div className="grid gap-5">
                  <FeaturedAppCard
                    title={t('cv.featured_apps.membar.title')}
                    role={t('cv.featured_apps.membar.role')}
                    description={t('cv.featured_apps.membar.desc')}
                    stat={t('cv.featured_apps.membar.stat')}
                    image="/assets/membar-app-screenshot.webp"
                    href="https://membar.dk"
                    index={0}
                  />
                  <FeaturedAppCard
                    title={t('cv.featured_apps.pos.title')}
                    role={t('cv.featured_apps.pos.role')}
                    description={t('cv.featured_apps.pos.desc')}
                    stat={t('cv.featured_apps.pos.stat')}
                    image="/assets/pos-screenshot.webp"
                    href="https://holysmash.dk"
                    index={1}
                  />
                </div>
              </div>
            </motion.div>

            <SectionHeader title={t('cv.competencies_section.title')} />

            {/* Languages */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-3xl border border-border bg-pill/60 p-8"
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                  <Globe className="text-foreground/70" />
                  {t('cv.languages')}
                </h3>
                <ul className="space-y-3">
                  {languages.map((lang, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-sm text-muted-foreground">{lang.level}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

        {/* Timeline Section */}
        <div className="relative w-full px-6 pb-24 md:px-10" ref={containerRef}>
          <div className="max-w-4xl mx-auto relative">
            <SectionHeader title={t('cv.experience')} />

            {/* Central Line */}
              <div className="absolute left-[20px] top-0 -ml-3 bottom-0 w-6 overflow-hidden pointer-events-none md:left-1/2">
              {/* Background gray wavy line */}
              <div 
                className="w-full h-full bg-repeat-y opacity-30" 
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'128\' viewBox=\'0 0 24 128\' fill=\'none\' stroke=\'%234a4a4a\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 0 C 4 10 4 20 12 30 C 20 40 20 60 12 70 C 4 75 4 85 12 90 C 18 100 18 118 12 128\' /%3E%3C/svg%3E")' 
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
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'128\' viewBox=\'0 0 24 128\' fill=\'none\' stroke=\'%23ffffff\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 0 C 4 10 4 20 12 30 C 20 40 20 60 12 70 C 4 75 4 85 12 90 C 18 100 18 118 12 128\' /%3E%3C/svg%3E")' 
                  }}
                />
              </motion.div>
            </div>

            <div className="space-y-16">
              {(timelineData || []).map((item, index) => (
                <TimelineItemCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>

    {/* Structured CV Modal */}
    <AnimatePresence>
    {showPreview && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:static print:inset-auto print:z-[100] print:block print:bg-white print:p-0 print:backdrop-blur-none"
        onClick={() => setShowPreview(false)}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl max-w-[210mm] w-full print:max-h-none print:overflow-visible print:shadow-none print:rounded-none print:max-w-none print:w-full"
        >
          <StructuredCvDocument
            t={t}
            timelineData={timelineData}
            skills={skills}
            languages={languages}
          />
        </motion.div>

        {/* Floating Download Button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={(e) => {
            e.stopPropagation();
            handlePrint();
          }}
          onMouseEnter={spinDownload}
          onMouseLeave={spinDownload}
          className="group fixed bottom-6 right-6 z-[80] flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10 transition-colors duration-300 hover:bg-brand-blue/90 print:hidden md:bottom-8 md:right-8"
        >
          <span
            className="relative inline-flex will-change-transform transition-transform duration-500 ease-in-out"
            style={{ transform: `rotate(${downloadRotation}deg)` }}
          >
            <Download size={18} />
          </span>
          <span className="relative inline-block">
            {t('cv.download.button')}
          </span>
        </motion.button>

        {/* Floating Close Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview(false);
          }}
          onMouseEnter={spinClose}
          onMouseLeave={spinClose}
          aria-label="Luk"
          className="group fixed right-6 top-6 z-[80] flex size-10 items-center justify-center rounded-full bg-brand-blue text-white shadow-2xl ring-1 ring-white/10 transition-colors duration-300 hover:bg-brand-blue/90 print:hidden md:right-8 md:top-8"
        >
          <span
            className="relative inline-flex will-change-transform transition-transform duration-500 ease-in-out"
            style={{ transform: `rotate(${closeRotation}deg)` }}
          >
            <ShurikenIcon className="size-4" />
          </span>
        </motion.button>
      </div>
    )}
    </AnimatePresence>
    </>
  );
}

export default function CVPage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <div className="px-6 pt-32 text-muted-foreground md:px-10">Loading...</div>
        </PageShell>
      }
    >
      <CVPageContent />
    </Suspense>
  );
}

const CV_CONTACT = {
  email: 'alex@wentzel.io',
  phone: '+4552391248',
  phoneDisplay: '+45 52 39 12 48',
  linkedin: 'https://www.linkedin.com/in/wentzel01',
  linkedinLabel: 'linkedin.com/in/wentzel01',
  github: 'https://github.com/WonderWeasel01',
  githubLabel: 'github.com/WonderWeasel01',
  website: 'https://wentzel.io',
  websiteLabel: 'wentzel.io',
  maps: 'https://www.google.com/maps/search/?api=1&query=Næstved,Denmark',
};

function CvDocumentLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`text-amber-700 underline decoration-amber-700/40 underline-offset-2 hover:text-amber-800 ${className}`}
    >
      {children}
    </a>
  );
}

function StructuredCvDocument({
  t,
  timelineData,
  skills,
  languages,
}: {
  t: (key: string, vars?: Record<string, string | number>) => string;
  timelineData: TimelineItem[];
  skills: { name: string; icon: typeof Code }[];
  languages: { name: string; level: string }[];
}) {
  const workItems = timelineData.filter((item) => item.type === 'work');
  const educationItems = timelineData.filter((item) => item.type === 'education');

  return (
    <div id="structured-cv" className="mx-auto max-w-[210mm] bg-white p-10 font-sans text-black print:p-8">
      <header className="mb-8 flex items-center gap-6 border-b-2 border-stone-800 pb-5">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-stone-200">
          <Image
            src="/images/alex.jpeg"
            alt="Alexander Wentzel"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">Alexander Wentzel</h1>
          <p className="mt-1 text-lg font-medium text-stone-700">{t('cv.role.title')}</p>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            <CvDocumentLink href={`mailto:${CV_CONTACT.email}`}>{CV_CONTACT.email}</CvDocumentLink>
            {' · '}
            <CvDocumentLink href={`tel:${CV_CONTACT.phone}`}>{CV_CONTACT.phoneDisplay}</CvDocumentLink>
            {' · '}
            <CvDocumentLink href={CV_CONTACT.maps}>{t('cv.location')}</CvDocumentLink>
            {' · '}
            <CvDocumentLink href={CV_CONTACT.linkedin}>{CV_CONTACT.linkedinLabel}</CvDocumentLink>
            {' · '}
            <CvDocumentLink href={CV_CONTACT.github}>{CV_CONTACT.githubLabel}</CvDocumentLink>
            {' · '}
            <CvDocumentLink href={CV_CONTACT.website}>{CV_CONTACT.websiteLabel}</CvDocumentLink>
          </p>
        </div>
      </header>

      <div className="space-y-7 text-sm leading-relaxed text-stone-800">
        <section>
          <h2 className="mb-2 border-b border-stone-300 pb-1 text-base font-bold uppercase tracking-wide text-stone-900">
            {t('cv.profile')}
          </h2>
          <p>{t('cv.bio')}</p>
        </section>

        <section>
          <h2 className="mb-2 border-b border-stone-300 pb-1 text-base font-bold uppercase tracking-wide text-stone-900">
            {t('cv.skills')}
          </h2>
          <p>{skills.map((skill) => skill.name).join(' · ')}</p>
        </section>

        <section>
          <h2 className="mb-3 border-b border-stone-300 pb-1 text-base font-bold uppercase tracking-wide text-stone-900">
            {t('cv.experience')}
          </h2>
          <div className="space-y-5">
            {workItems.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-bold text-stone-900">{item.role}</h3>
                  <span className="text-xs font-medium text-stone-500">{item.period}</span>
                </div>
                <p className="text-sm font-medium text-stone-700">{item.company}</p>
                {item.description.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-700">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 border-b border-stone-300 pb-1 text-base font-bold uppercase tracking-wide text-stone-900">
            {t('cv.projects')}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-stone-900">
                {t('cv.highlight.membar.title')} —{' '}
                <CvDocumentLink href="https://membar.dk">membar.dk</CvDocumentLink>
              </h3>
              <p className="mt-1 text-stone-700">{t('cv.highlight.membar.desc')}</p>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">{t('cv.highlight.pos.title')}</h3>
              <p className="mt-1 text-stone-700">{t('cv.highlight.pos.desc')}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 border-b border-stone-300 pb-1 text-base font-bold uppercase tracking-wide text-stone-900">
            {t('cv.education')}
          </h2>
          <div className="space-y-4">
            {educationItems.map((item) => (
              <div key={item.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-bold text-stone-900">{item.company}</h3>
                  <span className="text-xs font-medium text-stone-500">{item.period}</span>
                </div>
                <p className="text-sm text-stone-700">{item.role}</p>
                {item.description.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-700">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 border-b border-stone-300 pb-1 text-base font-bold uppercase tracking-wide text-stone-900">
            {t('cv.languages')}
          </h2>
          <p>
            {languages.map((lang) => `${lang.name} (${lang.level})`).join(' · ')}
          </p>
        </section>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function FeaturedAppCard({
  title,
  role,
  description,
  stat,
  image,
  href,
  index,
}: {
  title: string;
  role: string;
  description: string;
  stat: string;
  image: string;
  href: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-pill/60 text-white"
    >
      <div className="absolute inset-0 opacity-20">
        <Image src={image} alt={title} fill className="object-cover" unoptimized />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-stretch">
        <div className="md:w-44 lg:w-52 shrink-0 p-4 md:p-5">
          <div className="relative aspect-[9/16] w-full max-w-[140px] mx-auto md:max-w-none rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <Image src={image} alt={title} fill className="object-cover object-top" unoptimized />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 md:py-7 md:pr-7 md:pl-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {role ? (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
                  {role}
                </span>
              ) : null}
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
                {stat}
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
            <p className="max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              {description}
            </p>
          </div>

          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover-blue mt-5 inline-flex items-center gap-2 self-start text-sm font-medium text-white/80"
          >
            {href.replace('https://', '')}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
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
      <div className="absolute left-[20px] z-10 mt-6 size-4 -translate-x-1/2 rounded-full border-4 border-background bg-white md:left-1/2" />

      {/* Content Side */}
      <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <div className={`relative rounded-3xl border border-border bg-pill/60 p-6 transition hover:border-foreground/20
          ${isEven ? 'md:mr-auto' : 'md:ml-auto'}
        `}>
          <div className={`hidden md:block absolute top-6 size-4 rotate-45 border-border bg-pill
            ${isEven 
              ? '-left-2.5 border-l border-b'
              : '-right-2.5 border-t border-r'
            }
          `} />

          <div className={`mb-2 flex items-center gap-2 text-sm font-medium text-foreground/70
            ${isEven ? 'md:flex-row-reverse' : ''}
          `}>
            <Calendar size={14} />
            {item.period}
          </div>

          <h3 className="mb-1 text-xl font-semibold">{item.role}</h3>
          
          <div className={`mb-4 flex items-center gap-2 text-foreground/70
            ${isEven ? 'md:flex-row-reverse' : ''}
          `}>
            {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
            <span className="font-medium">{item.company}</span>
          </div>

          {item.location && (
            <div className={`mb-4 flex items-center gap-2 text-xs text-muted-foreground
              ${isEven ? 'md:flex-row-reverse' : ''}
            `}>
              <MapPin size={12} />
              {item.location}
            </div>
          )}

          {item.description.length > 0 && (
            <ul className={`space-y-2 text-sm text-foreground/75
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
