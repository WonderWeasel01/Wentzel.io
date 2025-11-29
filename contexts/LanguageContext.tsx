'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { da } from '../locales/da';
import { en } from '../locales/en';

type Language = 'da' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  da,
  en,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('da');

  useEffect(() => {
    // Check if language is saved in localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const hasSeenPopup = localStorage.getItem('hasSeenLanguagePopup');

    if (savedLanguage && (savedLanguage === 'da' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    localStorage.setItem('hasSeenLanguagePopup', 'true');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['da']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

