'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { projects } from '../../data/projects';
import { useLanguage } from '../../contexts/LanguageContext';
import { PageShell } from '../../components/SiteChrome';
import FeaturedProjectCard from '../../components/FeaturedProjectCard';

const RECENT_PROJECT_ORDER: Record<string, number> = {
  sydfund: 7,
  'beauty-by-wentzel': 6,
  'ab-fyrreparken': 5,
  onezite: 4,
  membar: 3,
  'membar-app': 2,
  'city-biler': 1,
};

function parseDate(dateStr: string): number {
  if (dateStr === 'Beta udgivet') return 0;

  const months: Record<string, number> = {
    Januar: 1,
    Februar: 2,
    Marts: 3,
    April: 4,
    Maj: 5,
    Juni: 6,
    Juli: 7,
    August: 8,
    September: 9,
    Oktober: 10,
    November: 11,
    December: 12,
    January: 1,
    February: 2,
    March: 3,
    May: 5,
    June: 6,
    July: 7,
    October: 10,
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Okt: 10,
    Nov: 11,
    Dec: 12,
  };

  const parts = dateStr.trim().split(' ');
  if (parts.length >= 2) {
    const monthKey = Object.keys(months).find((m) => m.toLowerCase() === parts[0].toLowerCase());
    const month = monthKey ? months[monthKey] : 0;
    const year = parseInt(parts[1]);
    if (month > 0 && !isNaN(year)) return year * 100 + month;
  }
  return 0;
}

function ProjectsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const filteredProjects = (projects || [])
    .filter((project) => {
      if (category === 'client') return project.type === 'client';
      if (category === 'personal') return project.type === 'personal';
      return true;
    })
    .sort((a, b) => {
      if (!category) {
        if (a.id === 'boardgame-stats') return 1;
        if (b.id === 'boardgame-stats') return -1;
      }

      if (category === 'personal') {
        return parseDate(b.year) - parseDate(a.year);
      }

      const dateCompare = parseDate(t(`${b.translationKey}.date`)) - parseDate(t(`${a.translationKey}.date`));
      if (dateCompare !== 0) return dateCompare;

      const orderA = RECENT_PROJECT_ORDER[a.id] ?? 0;
      const orderB = RECENT_PROJECT_ORDER[b.id] ?? 0;
      if (orderA !== orderB) return orderB - orderA;

      return 0;
    });

  const getTitle = () => {
    if (category === 'client') return t('nav.clients');
    if (category === 'personal') return t('nav.personal');
    return t('projects.title');
  };

  const getSubtitle = () => {
    if (category === 'client') return t('projects.subtitle.clients');
    if (category === 'personal') return t('projects.subtitle.personal');
    return t('projects.subtitle');
  };

  return (
    <PageShell>
      <div className="relative z-10 px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight md:text-[56px]">{getTitle()}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">{getSubtitle()}</p>
        </div>

        <div className="mx-auto mt-16 grid w-full max-w-[1800px] grid-cols-1 gap-4 md:mt-20 md:gap-5 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <FeaturedProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <PageShell>
          <div className="px-6 pt-32 text-muted-foreground md:px-10">Loading...</div>
        </PageShell>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
