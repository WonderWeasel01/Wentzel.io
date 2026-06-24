'use client';

import { motion } from 'framer-motion';
import {
  ExternalLink,
  Globe,
  Calendar,
  User,
  Code,
  CheckCircle,
  ArrowLeft,
  Layers,
  Package,
  Laptop,
} from 'lucide-react';
import { projects } from '../../../data/projects';
import { useParams } from 'next/navigation';
import ProjectImage from '../../../components/ProjectImage';
import Link from 'next/link';
import { useLanguage } from '../../../contexts/LanguageContext';
import { PageShell } from '../../../components/SiteChrome';
import FeaturedProjectCard from '../../../components/FeaturedProjectCard';

function DarkCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-border bg-pill/60 p-6 md:p-8 ${className}`}>{children}</div>
  );
}

export default function ProjectDetailPage() {
  const { t } = useLanguage();
  const params = useParams();
  const projectId = params?.id as string;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <PageShell>
        <div className="relative z-10 px-6 pb-24 pt-32 md:px-10 md:pt-40">
          <h1 className="text-4xl font-semibold tracking-tight">Projekt ikke fundet / Project not found</h1>
          <Link href="/projects" className="link-hover-blue mt-6 inline-flex items-center gap-2 text-foreground/80">
            <ArrowLeft className="size-4" />
            {t('project.back')}
          </Link>
        </div>
      </PageShell>
    );
  }

  const fullDescription = Array.from({ length: project.fullDescriptionCount }).map((_, i) =>
    t(`${project.translationKey}.fullDescription.${i}`)
  );

  const features = Array.from({ length: project.featuresCount }).map((_, i) =>
    t(`${project.translationKey}.features.${i}`)
  );

  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  return (
    <PageShell>
      <div className="relative z-10">
        <div className="relative h-[50vh] min-h-[360px] w-full md:h-[60vh]">
          <div className="absolute inset-0">
            {project.image ? (
              <ProjectImage
                project={project}
                src={project.image}
                alt={project.title}
                variant="hero"
                imageClassName="object-cover"
              />
            ) : null}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

          <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 md:px-10 md:pb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {t(`${project.translationKey}.label`)}
              </span>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">{project.title}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                {t(`${project.translationKey}.description`)}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <Link
            href="/projects"
            className="link-hover-blue mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <ArrowLeft className="size-4" />
            {t('project.back')}
          </Link>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <DarkCard>
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <Laptop className="size-6 text-foreground/70" />
                  {t('project.screenshots')}
                </h2>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-background/40">
                  {project.screenshot ? (
                    <ProjectImage
                      project={project}
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      variant="screenshot"
                      imageClassName="object-contain"
                    />
                  ) : null}
                </div>
              </DarkCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <DarkCard className="h-full">
                <h3 className="mb-6 border-b border-border pb-4 text-xl font-semibold">{t('project.details')}</h3>
                <div className="space-y-6">
                  <DetailRow icon={Calendar} label={t('project.date')} value={t(`${project.translationKey}.date`)} />
                  <DetailRow icon={User} label={t('project.client')} value={project.client} />
                  <DetailRow icon={Layers} label={t('project.platform')} value={project.platform} />
                  <DetailRow icon={Package} label={t('project.package')} value={project.package} />

                  <div className="border-t border-border pt-4">
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Globe className="size-4" />
                      {t('project.links')}
                    </div>
                    {project.website ? (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover-blue mb-2 flex items-center gap-2 font-medium"
                      >
                        {t('project.visit')}
                        <ExternalLink className="size-3" />
                      </a>
                    ) : null}
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-hover-blue flex items-center gap-2 font-medium"
                      >
                        GitHub Repo
                        <Code className="size-3" />
                      </a>
                    ) : null}
                    {!project.website && !project.github ? (
                      <span className="text-muted-foreground italic">{t('project.coming_soon')}</span>
                    ) : null}
                  </div>
                </div>
              </DarkCard>
            </motion.div>
          </div>

          <div className="mt-8 space-y-8">
            {(project.phoneMockup || project.phoneMockup2) && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <DarkCard>
                  <h2 className="mb-8 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                    <Globe className="size-6 text-foreground/70" />
                    {project.type === 'personal' ? t('project.screenshots') : t('project.mobile')}
                  </h2>
                  <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
                    {project.phoneMockup ? (
                      <div className="relative h-[400px] w-full max-w-[500px]">
                        <ProjectImage
                          project={project}
                          src={project.phoneMockup}
                          alt={`${project.title} Mobile 1`}
                          variant="phone"
                          imageClassName="object-contain"
                        />
                      </div>
                    ) : null}
                    {project.phoneMockup2 ? (
                      <div className="relative h-[400px] w-full max-w-[500px]">
                        <ProjectImage
                          project={project}
                          src={project.phoneMockup2}
                          alt={`${project.title} Mobile 2`}
                          variant="phone"
                          imageClassName="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                </DarkCard>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DarkCard>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t('project.about')}</h2>
                <div className="space-y-4">
                  {fullDescription.map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed text-foreground/80">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </DarkCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <DarkCard>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t('project.features')}</h2>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start rounded-2xl border border-border bg-background/40 p-4">
                      <div className="mr-3 mt-1 rounded-full bg-white/10 p-1 text-foreground">
                        <CheckCircle className="size-4" />
                      </div>
                      <span className="font-medium text-foreground/85">{feature}</span>
                    </li>
                  ))}
                </ul>
              </DarkCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DarkCard>
                <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t('project.technologies')}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background/40 px-4 py-2 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </DarkCard>
            </motion.section>
          </div>

          {relatedProjects.length > 0 && (
            <section className="mt-24 border-t border-border pt-16">
              <h2 className="mb-10 text-3xl font-semibold tracking-tight md:text-4xl">{t('project.other_projects')}</h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {relatedProjects.map((relatedProject) => (
                  <FeaturedProjectCard key={relatedProject.id} project={relatedProject} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-1 size-5 shrink-0 text-foreground/60" />
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
