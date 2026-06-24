'use client';

import Link from 'next/link';
import { ArrowUpRight, Calendar, ExternalLink, Layers, Package, User } from 'lucide-react';
import { Project } from '../data/projects';
import ProjectImage from './ProjectImage';
import PillButton from './PillButton';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
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
              onClick={(e) => e.stopPropagation()}
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
