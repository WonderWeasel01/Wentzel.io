'use client';

import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';

export default function GlobalLanguageManager() {
  const [showSelector, setShowSelector] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenLanguagePopup');
    if (!hasSeenPopup) {
      setShowSelector(true);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <>
      {showSelector && (
        <LanguageSelector onComplete={() => setShowSelector(false)} />
      )}
    </>
  );
}


