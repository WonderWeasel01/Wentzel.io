'use client';

import { useEffect } from 'react';
import { shapes } from './shapes';

export default function GlobalLanguageManager() {
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
