'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles, Download, FileText } from 'lucide-react';
import NoiseFilter from '../../components/NoiseFilter';
import Navbar from '../../components/Navbar';
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
    <div className="flex min-h-screen bg-stone-100 text-stone-900 selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      <NoiseFilter />
      <Navbar />

      <main className="flex flex-col w-full min-h-screen ml-0 md:ml-64 relative">
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/grain-pattern.svg')] bg-repeat opacity-30" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="text-amber-600" size={28} />
                <h1 className="text-3xl md:text-4xl font-bold grainy-text">
                  {t('apply.title')}
                </h1>
              </div>
              <p className="text-stone-600 mb-10 max-w-2xl leading-relaxed">
                {t('apply.description')}
              </p>

              <div className="grid gap-8">
                <section className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-5">
                  <h2 className="text-lg font-bold">{t('apply.company_section')}</h2>

                  <div>
                    <label htmlFor="company-name" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('apply.company_name')}
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={t('apply.company_name_placeholder')}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="job-title" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('apply.job_title')}
                    </label>
                    <input
                      id="job-title"
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder={t('apply.job_title_placeholder')}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="company-info" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('apply.company_info')}
                    </label>
                    <textarea
                      id="company-info"
                      value={companyInfo}
                      onChange={(e) => setCompanyInfo(e.target.value)}
                      placeholder={t('apply.company_info_placeholder')}
                      rows={8}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-y min-h-[180px]"
                    />
                  </div>

                  <div>
                    <label htmlFor="extra" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('apply.extra_instructions')}
                    </label>
                    <textarea
                      id="extra"
                      value={extraInstructions}
                      onChange={(e) => setExtraInstructions(e.target.value)}
                      placeholder={t('apply.extra_instructions_placeholder')}
                      rows={3}
                      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-y"
                    />
                  </div>

                  <div>
                    <label htmlFor="output-lang" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('apply.output_language')}
                    </label>
                    <select
                      id="output-lang"
                      value={outputLanguage}
                      onChange={(e) => setOutputLanguage(e.target.value as ApplicationLanguage)}
                      className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      <option value="da">{t('apply.lang_da')}</option>
                      <option value="en">{t('apply.lang_en')}</option>
                    </select>
                  </div>
                </section>

                <section className="bg-stone-900 text-stone-100 p-6 md:p-8 rounded-2xl border border-stone-800 shadow-lg space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold">{t('apply.prompt_section')}</h2>
                      <p className="text-stone-400 text-sm mt-1">{t('apply.prompt_hint')}</p>
                    </div>
                    <button
                      onClick={() => copyText(fullPrompt, 'prompt')}
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 text-stone-900 px-5 py-3 rounded-xl font-medium hover:bg-amber-400 transition-colors shrink-0"
                    >
                      {copied === 'prompt' ? <Check size={18} /> : <Copy size={18} />}
                      {copied === 'prompt' ? t('apply.copied') : t('apply.copy_prompt')}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-stone-300 bg-stone-950/50 border border-stone-800 rounded-xl p-4 max-h-[420px] overflow-y-auto font-mono">
                    {fullPrompt}
                  </pre>
                </section>

                <section className="bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold">{t('apply.profile_section')}</h2>
                      <p className="text-stone-500 text-sm mt-1">{t('apply.profile_hint')}</p>
                    </div>
                    <button
                      onClick={() => copyText(profileContext, 'profile')}
                      className="inline-flex items-center justify-center gap-2 border border-stone-300 bg-white text-stone-900 px-5 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors shrink-0"
                    >
                      {copied === 'profile' ? <Check size={18} /> : <Copy size={18} />}
                      {copied === 'profile' ? t('apply.copied') : t('apply.copy_profile')}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700 bg-stone-50 border border-stone-200 rounded-xl p-4 max-h-[320px] overflow-y-auto font-mono">
                    {profileContext}
                  </pre>
                </section>

                <section className="bg-amber-50/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-amber-200 shadow-sm space-y-5">
                  <div className="flex items-start gap-3">
                    <FileText className="text-amber-700 shrink-0 mt-0.5" size={22} />
                    <div>
                      <h2 className="text-lg font-bold text-stone-900">{t('apply.pdf_section')}</h2>
                      <p className="text-stone-600 text-sm mt-1">{t('apply.pdf_hint')}</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="finished-text" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('apply.finished_text')}
                    </label>
                    <textarea
                      id="finished-text"
                      value={finishedText}
                      onChange={(e) => setFinishedText(e.target.value)}
                      placeholder={t('apply.finished_text_placeholder')}
                      rows={12}
                      className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-y min-h-[240px]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-stone-600">
                      <span className="font-medium text-stone-700">{t('apply.pdf_filename')}:</span>{' '}
                      <span className="font-mono text-stone-800">{pdfFilename}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => void triggerPdfDownload()}
                      disabled={isDownloading}
                      className="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Download size={18} />
                      {isDownloading ? t('apply.downloading_pdf') : t('apply.download_pdf')}
                    </button>
                  </div>

                  {pdfError && (
                    <p className="text-sm text-red-600">{pdfError}</p>
                  )}
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
