'use client';

import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-stone-100 text-stone-600 py-12 border-t border-stone-200 print:hidden relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold text-stone-900 mb-2">Alexander Wentzel</h3>
            <p className="text-sm max-w-xs">
              {t('cv.role.title')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-stone-900 mb-4">{t('footer.contact')}</h4>
            <a href="mailto:alexwentzel@live.dk" className="flex items-center gap-2 mb-2 hover:text-amber-600 transition-colors">
              <Mail size={16} />
              Alexwentzel@live.dk
            </a>
            <a href="tel:+4552391248" className="flex items-center gap-2 hover:text-amber-600 transition-colors">
              <Phone size={16} />
              +45 52 39 12 48
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-stone-900 mb-4">{t('footer.socials')}</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/WonderWeasel01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-stone-200 rounded-full hover:bg-amber-500 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/alexander-wentzel-621654196/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-stone-200 rounded-full hover:bg-amber-500 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {currentYear} Alexander Wentzel. {t('footer.rights')}</p>
          <p className="opacity-75">{t('footer.built_with')}</p>
        </div>
      </div>
    </footer>
  );
}

