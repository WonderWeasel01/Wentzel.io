'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, Download, FileText } from 'lucide-react';
import { PageShell } from '../../components/SiteChrome';
import PillButton from '../../components/PillButton';
import {
  buildApplicationPrompt,
  buildProfileContext,
  type ApplicationLanguage,
} from '../../lib/application-prompt';
import {
  buildApplicationPdfFilename,
  downloadApplicationPdf,
} from '../../lib/application-pdf';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ApplyPage() {
  const { t } = useLanguage();
  const [companyName, setCompanyName] = useState('');
  const [companyInfo, setCompanyInfo] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [finishedText, setFinishedText] = useState('');
  const [outputLanguage, setOutputLanguage] = useState<ApplicationLanguage>('da');
  const [copied, setCopied] = useState<'prompt' | 'profile' | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const lastDownloadedTextRef = useRef('');

  const profileContext = useMemo(
    () => buildProfileContext(outputLanguage),
    [outputLanguage]
  );

  const fullPrompt = useMemo(
    () =>
      buildApplicationPrompt({
        companyName,
        companyInfo,
        jobTitle,
        outputLanguage,
        extraInstructions,
      }),
    [companyName, companyInfo, jobTitle, outputLanguage, extraInstructions]
  );

  const pdfFilename = useMemo(
    () => buildApplicationPdfFilename(companyName, outputLanguage),
    [companyName, outputLanguage]
  );

  const copyText = async (text: string, type: 'prompt' | 'profile') => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const triggerPdfDownload = useCallback(async () => {
    const text = finishedText.trim();
    if (!text) {
      setPdfError(t('apply.pdf_missing_text'));
      return;
    }
    if (!companyName.trim()) {
      setPdfError(t('apply.pdf_missing_company'));
      return;
    }
    if (text === lastDownloadedTextRef.current) {
      return;
    }

    setPdfError(null);
    setIsDownloading(true);
    try {
      await downloadApplicationPdf({
        companyName,
        jobTitle,
        finishedText: text,
        language: outputLanguage,
      });
      lastDownloadedTextRef.current = text;
    } catch {
      setPdfError(outputLanguage === 'da' ? 'Kunne ikke generere PDF' : 'Could not generate PDF');
    } finally {
      setIsDownloading(false);
    }
  }, [companyName, jobTitle, finishedText, outputLanguage, t]);

  useEffect(() => {
    const text = finishedText.trim();
    if (text.length < 80 || !companyName.trim() || text === lastDownloadedTextRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      void triggerPdfDownload();
    }, 1200);

    return () => clearTimeout(timer);
  }, [finishedText, companyName, triggerPdfDownload]);

  return (
    <PageShell>
      <div className="relative z-10 w-full px-6 pb-16 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-3 flex items-center gap-3">
              <Sparkles className="text-foreground/70" size={28} />
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('apply.title')}</h1>
            </div>
            <p className="mb-10 max-w-2xl leading-relaxed text-foreground/70">{t('apply.description')}</p>

            <div className="grid gap-8">
              <section className="space-y-5 rounded-3xl border border-border bg-pill/60 p-6 md:p-8">
                  <h2 className="text-lg font-semibold">{t('apply.company_section')}</h2>

                  <div>
                    <label htmlFor="company-name" className="mb-2 block text-sm font-medium text-foreground/80">
                      {t('apply.company_name')}
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={t('apply.company_name_placeholder')}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="job-title" className="mb-2 block text-sm font-medium text-foreground/80">
                      {t('apply.job_title')}
                    </label>
                    <input
                      id="job-title"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder={t('apply.job_title_placeholder')}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-info" className="mb-2 block text-sm font-medium text-foreground/80">
                      {t('apply.company_info')}
                    </label>
                    <textarea
                      id="company-info"
                      value={companyInfo}
                      onChange={(e) => setCompanyInfo(e.target.value)}
                      placeholder={t('apply.company_info_placeholder')}
                      rows={8}
                      className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[180px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="extra" className="mb-2 block text-sm font-medium text-foreground/80">
                      {t('apply.extra_instructions')}
                    </label>
                    <textarea
                      id="extra"
                      value={extraInstructions}
                      onChange={(e) => setExtraInstructions(e.target.value)}
                      placeholder={t('apply.extra_instructions_placeholder')}
                      rows={3}
                      className="w-full resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="output-lang" className="mb-2 block text-sm font-medium text-foreground/80">
                      {t('apply.output_language')}
                    </label>
                    <select
                      id="output-lang"
                      value={outputLanguage}
                      onChange={(e) => setOutputLanguage(e.target.value as ApplicationLanguage)}
                      className="rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option value="da">{t('apply.lang_da')}</option>
                      <option value="en">{t('apply.lang_en')}</option>
                    </select>
                  </div>
                </section>

              <section className="space-y-4 rounded-3xl border border-border bg-background/80 p-6 text-foreground md:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{t('apply.prompt_section')}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{t('apply.prompt_hint')}</p>
                    </div>
                    <PillButton type="button" size="md" onClick={() => copyText(fullPrompt, 'prompt')}>
                      {copied === 'prompt' ? <Check size={18} /> : <Copy size={18} />}
                      {copied === 'prompt' ? t('apply.copied') : t('apply.copy_prompt')}
                    </PillButton>
                  </div>
                  <pre className="max-h-[420px] overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-pill/60 p-4 font-mono text-sm leading-relaxed text-foreground/80">
                    {fullPrompt}
                  </pre>
                </section>

              <section className="space-y-4 rounded-3xl border border-border bg-pill/60 p-6 md:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{t('apply.profile_section')}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{t('apply.profile_hint')}</p>
                    </div>
                    <PillButton type="button" size="md" variant="outline" onClick={() => copyText(profileContext, 'profile')}>
                      {copied === 'profile' ? <Check size={18} /> : <Copy size={18} />}
                      {copied === 'profile' ? t('apply.copied') : t('apply.copy_profile')}
                    </PillButton>
                  </div>
                  <pre className="max-h-[320px] overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-background/40 p-4 font-mono text-sm leading-relaxed text-foreground/75">
                    {profileContext}
                  </pre>
                </section>

              <section className="space-y-5 rounded-3xl border border-border bg-pill/60 p-6 md:p-8">
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 shrink-0 text-foreground/70" size={22} />
                    <div>
                      <h2 className="text-lg font-semibold">{t('apply.pdf_section')}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{t('apply.pdf_hint')}</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="finished-text" className="mb-2 block text-sm font-medium text-foreground/80">
                      {t('apply.finished_text')}
                    </label>
                    <textarea
                      id="finished-text"
                      value={finishedText}
                      onChange={(e) => setFinishedText(e.target.value)}
                      placeholder={t('apply.finished_text_placeholder')}
                      rows={12}
                      className="w-full min-h-[240px] resize-y rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-foreground/70">
                      <span className="font-medium text-foreground">{t('apply.pdf_filename')}:</span>{' '}
                      <span className="font-mono">{pdfFilename}</span>
                    </div>
                    <PillButton
                      type="button"
                      size="md"
                      onClick={() => void triggerPdfDownload()}
                      disabled={isDownloading}
                      className="shrink-0"
                    >
                      <Download size={18} />
                      {isDownloading ? t('apply.downloading_pdf') : t('apply.download_pdf')}
                    </PillButton>
                  </div>

                  {pdfError && (
                    <p className="text-sm text-red-400">{pdfError}</p>
                  )}
                </section>
              </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
