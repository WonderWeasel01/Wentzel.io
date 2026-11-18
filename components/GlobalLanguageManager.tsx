'use client';

import { useEffect } from 'react';
import { shapes } from './shapes';
import { useLanguage } from '../contexts/LanguageContext';

export default function GlobalLanguageManager() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
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

  return null;
}
