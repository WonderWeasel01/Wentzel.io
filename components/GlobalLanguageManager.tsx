'use client';

import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { shapes } from './shapes';

export default function GlobalLanguageManager() {
  const { isLanguageSelectorOpen, setIsLanguageSelectorOpen } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Set random favicon
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (link) {
      link.href = randomShape;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = randomShape;
      document.head.appendChild(newLink);
    }
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {isLanguageSelectorOpen && (
        <LanguageSelector onComplete={() => setIsLanguageSelectorOpen(false)} />
      )}
    </>
  );
}


