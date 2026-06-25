'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sun, Moon, Github, Linkedin, Mail, Calendar, ExternalLink, Layers, Package, User, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { projects as allProjects, type Project } from '../data/projects';
import { LiquidBottomBlur } from './LiquidBottomBlur';
import CompanyCarousel from './Testimonials';
import { SiteTopBar } from './SiteChrome';
import ProjectImage from './ProjectImage';
import LanguageModal from './LanguageModal';
import ContactCtaButton from './ContactCtaButton';
import PillButton from './PillButton';
import TechDock from './TechDock';

const GradientBackground = dynamic(
  () => import('./GradientBackground').then((m) => m.GradientBackground),
  { ssr: false }
);

function useLocalTime(tz = 'Europe/Copenhagen', locale = 'da-DK') {
  const [time, setTime] = useState('');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hour = Number(
        new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: tz }).format(now)
      );
      setIsNight(hour < 6 || hour >= 20);
      setTime(
        new Intl.DateTimeFormat(locale, {
          hour: '2-digit',
          minute: '2-digit',
          hour12: locale !== 'da-DK',
          timeZone: tz,
        })
          .format(now)
          .toUpperCase()
      );
    };

    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [tz, locale]);

  return { time, isNight };
}

function TimeIcon({ isNight }: { isNight: boolean }) {
  const Icon = isNight ? Moon : Sun;
  return <Icon className="size-4 animate-spin-slow opacity-70" />;
}

function FullWidthWordmark({
  children,
  className,
  mobileVh = 0.3,
}: {
  children: string;
  className?: string;
  mobileVh?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');

    const fitByHeight = (targetHeight: number) => {
      let low = 16;
      let high = 500;
      let best = low;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;
        if (text.getBoundingClientRect().height <= targetHeight) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.fontSize = `${best}px`;
    };

    const fit = () => {
      if (mobileQuery.matches) {
        const containerHeight = container.clientHeight;
        const targetHeight =
          containerHeight > 16 ? containerHeight : Math.round(window.innerHeight * mobileVh);
        fitByHeight(targetHeight);
        return;
      }

      const maxWidth = container.clientWidth;
      let low = 8;
      let high = 2000;
      let best = low;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;
        if (text.scrollWidth <= maxWidth) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      text.style.fontSize = `${best}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    mobileQuery.addEventListener('change', fit);
    window.addEventListener('resize', fit);
    return () => {
      observer.disconnect();
      mobileQuery.removeEventListener('change', fit);
      window.removeEventListener('resize', fit);
    };
  }, [children, mobileVh]);

  return (
    <div ref={containerRef} className="flex h-full w-full items-end justify-start overflow-hidden px-6 md:justify-center md:px-0">
      <h2 ref={textRef} className={className} style={{ fontSize: 16 }}>
        {children}
      </h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative bg-background text-foreground">
      <LiquidBottomBlur />
      <SiteTopBar />
      <div className="relative">
        <Hero />
        <About />
      </div>
      <Highlights />
      <Skills />
      <CompanyCarousel />
      <Footer />
    </main>
  );
}

function Hero() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const [cvLanguageModalOpen, setCvLanguageModalOpen] = useState(false);
  const locale = language === 'da' ? 'da-DK' : 'en-GB';
  const { time, isNight } = useLocalTime('Europe/Copenhagen', locale);
  const location = language === 'da' ? 'Næstved, Danmark' : 'Næstved, Denmark';

  const handleCvLanguageSelect = (lang: 'da' | 'en') => {
    setLanguage(lang);
    setCvLanguageModalOpen(false);
    router.push('/cv?download=1');
  };

  return (
    <section className="sticky top-0 z-0 h-screen min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.08, filter: 'blur(28px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <GradientBackground />
        <motion.div
          className="absolute inset-0 bg-black/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </motion.div>

      <motion.div
        className="relative z-10 px-6 pt-40 md:px-10 md:pt-48"
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ml-auto max-w-md text-right md:max-w-lg">
          <p className="text-balance text-base font-medium leading-relaxed tracking-tight text-white md:text-lg">
            {t('home.hero.intro')}
          </p>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <PillButton href="/projects">
              {t('home.hero.projects_cta')}
              <ArrowUpRight className="size-4" />
            </PillButton>
            <PillButton type="button" variant="outline" onClick={() => setCvLanguageModalOpen(true)}>
              <Download className="size-4" />
              {t('home.hero.cv_cta')}
            </PillButton>
          </div>
        </div>
      </motion.div>

      <LanguageModal
        open={cvLanguageModalOpen}
        onClose={() => setCvLanguageModalOpen(false)}
        onSelect={handleCvLanguageSelect}
      />

      <motion.div
        className="absolute inset-x-0 bottom-[34vh] z-10 flex items-center justify-between px-6 text-sm text-white/70 md:bottom-[36vh] md:px-10"
        initial={{ opacity: 0, filter: 'blur(6px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: 0.9, ease: 'easeOut' }}
      >
        <span className="group relative cursor-help">
          {t('home.hero.tagline')}
          <span className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-0 z-20 w-max max-w-[16rem] translate-y-1 rounded-lg bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            {t('home.hero.tagline_tooltip')}
          </span>
        </span>
        <span className="hidden items-center gap-2 md:inline-flex">
          <TimeIcon isNight={isNight} />
          {time} <span className="opacity-60">{location}</span>
        </span>
        <span className="inline-flex items-center gap-2">
          {t('home.hero.scroll')} <span className="opacity-70">{t('home.hero.scrollHint')}</span>
          <ArrowDown className="size-4" />
        </span>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[8] h-[32vh] w-full md:h-auto"
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <FullWidthWordmark
          mobileVh={0.32}
          className="select-none whitespace-nowrap text-left text-white font-extrabold leading-none tracking-[-0.04em] md:text-center"
        >
          WENTZEL
        </FullWidthWordmark>
      </motion.div>
    </section>
  );
}

function About() {
  const { t } = useLanguage();

  return (
    <section className="relative z-10 overflow-hidden rounded-t-3xl bg-background px-6 py-32 shadow-[0_-24px_80px_rgba(0,0,0,0.45)] md:px-10 md:py-48">
      <div className="relative mx-auto max-w-6xl">
        <div className="pointer-events-none absolute -right-4 top-0 z-20 md:-right-8 md:top-4 lg:right-0">
          <div className="relative size-36 rotate-3 overflow-hidden rounded-3xl border border-border bg-pill shadow-[0_20px_60px_rgba(0,0,0,0.45)] md:size-52 md:rotate-2 lg:size-64">
            <Image
              src="/images/alex.jpeg"
              alt="Alexander Wentzel"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 144px, (max-width: 1024px) 208px, 256px"
              priority
            />
          </div>
        </div>

        <h2 className="relative z-10 max-w-3xl pr-36 text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:pr-56 md:text-[56px] lg:max-w-4xl lg:pr-72">
          {t('home.about.headline')}
        </h2>

        <div className="relative z-10 mt-20 grid gap-12 md:grid-cols-12 md:gap-16">
          <p className="text-sm uppercase tracking-widest text-muted-foreground md:col-span-3">{t('home.about.title')}</p>
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90 md:col-span-9 md:text-xl">
            <p>{t('home.about.text')}</p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:alex@wentzel.io"
                className="link-hover-blue inline-flex items-center gap-2 text-base font-medium text-foreground"
              >
                <Mail className="size-4" />
                alex@wentzel.io
              </a>
              <a
                href="https://github.com/WonderWeasel01"
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover-blue inline-flex items-center gap-2 text-base font-medium text-foreground"
              >
                <Github className="size-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/wentzel01"
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover-blue inline-flex items-center gap-2 text-base font-medium text-foreground"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </a>
            </div>
            <Link href="/projects" className="link-hover-blue inline-flex items-center gap-2 pt-4 text-base font-medium text-foreground">
              <ArrowUpRight className="size-4" />
              {t('home.about.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURED_PROJECT_IDS = ['app-krudtraeven', 'eventlokalet', 'enterprise-pos', 'jump-and-run'];

function Highlights() {
  const { t } = useLanguage();
  const featured = FEATURED_PROJECT_IDS.map((id) => allProjects.find((p) => p.id === id)).filter(
    (p): p is (typeof allProjects)[number] => Boolean(p)
  );

  return (
    <section className="w-full pt-32 pb-10 md:pt-48 md:pb-14">
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-[56px]">
            {t('home.highlights.title')}
          </h2>

          <div className="mt-12 grid gap-12 md:grid-cols-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground md:col-span-3">{t('home.highlights.label')}</p>
            <div className="space-y-4 text-base leading-relaxed text-foreground/80 md:col-span-9">
              <p>{t('home.highlights.desc')}</p>
              <p className="text-foreground/60">{t('projects.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid w-full grid-cols-1 gap-4 px-4 md:gap-5 md:px-6 lg:grid-cols-2">
        {featured.map((p) => (
          <FeaturedProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  return (
    <article className="group relative min-h-[480px] overflow-hidden rounded-3xl border border-border bg-pill/40 lg:min-h-[560px]">
      <div className="absolute inset-0">
        <ProjectImage
          project={project}
          src={project.screenshot || project.image}
          alt={project.title}
          variant="card"
          imageClassName="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
      </div>

      <div className="relative z-10 flex h-full min-h-[480px] flex-col justify-between p-6 md:p-8 lg:min-h-[560px] lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {t(`${project.translationKey}.label`)}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
              {project.type === 'client' ? t('nav.clients') : t('nav.personal')}
            </span>
          </div>
          {project.website ? (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label={t('project.visit')}
            >
              <ExternalLink className="size-4" />
            </a>
          ) : null}
        </div>

        <div>
          <h3 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {t(`${project.translationKey}.description`)}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Calendar className="size-4 shrink-0 text-white/50" />
              <span>{t(`${project.translationKey}.date`)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <User className="size-4 shrink-0 text-white/50" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Layers className="size-4 shrink-0 text-white/50" />
              <span>{project.platform}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Package className="size-4 shrink-0 text-white/50" />
              <span>{project.package}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PillButton href={`/projects/${project.id}`}>
              {t('project.read_more')}
              <ArrowUpRight className="size-4" />
            </PillButton>
            {project.website ? (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="link-hover-blue inline-flex items-center gap-2 text-sm font-medium text-white/80"
              >
                {t('project.visit')}
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="w-full max-w-full overflow-x-clip pt-8 pb-24 md:pt-12 md:pb-32 lg:pb-40">
      <h2 className="sr-only">{t('home.skills.title')}</h2>
      <div className="grid w-full min-w-0 grid-rows-[auto_auto_auto] gap-y-4 px-4 md:gap-y-6 md:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 text-balance text-left text-3xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {t('home.skills.title_lead')}
        </motion.p>

        <div className="min-w-0 w-full max-w-full">
          <TechDock />
        </div>

        <motion.p
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 text-balance text-right text-3xl font-extrabold leading-[0.95] tracking-[-0.03em] sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {t('home.skills.title_trail')}
        </motion.p>
      </div>
    </section>
  );
}

function Footer() {
  const { t, language } = useLanguage();
  const locale = language === 'da' ? 'da-DK' : 'en-GB';
  const { time, isNight } = useLocalTime('Europe/Copenhagen', locale);
  const location = language === 'da' ? 'Næstved, Danmark' : 'Næstved, Denmark';
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-background pb-0 pt-20 md:pt-28">
      <div className="relative z-20 w-full px-4 md:px-5">
        <div className="text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <TimeIcon isNight={isNight} />
            {time} <span className="opacity-60">{location}</span>
          </span>
        </div>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:flex-row md:items-start md:justify-between md:gap-8">
          <div className="flex max-w-xl flex-col">
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-[48px] lg:text-[56px]">
              {t('home.cta.title')}
            </h2>
            <ContactCtaButton href="mailto:alex@wentzel.io" className="mt-8 w-fit" />
          </div>

          <div className="grid grid-cols-2 gap-10 md:gap-20 md:pr-1">
            <div className="md:text-right">
              <p className="mb-4 text-sm text-muted-foreground">{language === 'da' ? 'Udforsk' : 'Explore'}</p>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>
                  <Link href="/" className="link-hover-blue">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="link-hover-blue">
                    {t('nav.projects')}
                  </Link>
                </li>
                <li>
                  <Link href="/cv" className="link-hover-blue">
                    {t('nav.cv')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:text-right">
              <p className="mb-4 text-sm text-muted-foreground">{t('footer.socials')}</p>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>
                  <a href="mailto:alex@wentzel.io" className="link-hover-blue">
                    alex@wentzel.io
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/WonderWeasel01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover-blue"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/wentzel01"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover-blue"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-4 md:mt-24">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            © {currentYear} Alexander Wentzel. {t('footer.rights')}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t('footer.built_with')}
          </p>
        </div>
      </div>

      <div className="relative mt-6 h-[clamp(11rem,30vh,20rem)] w-full bg-background md:mt-8 md:h-[clamp(10rem,30vw,20rem)]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[55%] bg-gradient-to-b from-background from-10% via-background/90 via-35% to-transparent to-100%"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-full w-full overflow-hidden"
        >
          <div
            className="absolute inset-x-0 bottom-0 h-full translate-y-[34%] md:translate-y-[40%]"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 28%, black 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 12%, black 28%, black 100%)',
            }}
          >
            <FullWidthWordmark
              mobileVh={0.3}
              className="footer-wordmark select-none whitespace-nowrap text-left font-extrabold leading-none tracking-[-0.04em] md:text-center"
            >
              WENTZEL
            </FullWidthWordmark>
          </div>
        </div>
      </div>
    </footer>
  );
}
