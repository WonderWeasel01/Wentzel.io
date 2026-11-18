'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'wentzel-chunk-reload';

export default function ChunkLoadRecovery() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const message = event.message ?? '';
      const isChunkError =
        message.includes('ChunkLoadError') ||
        message.includes('Loading chunk') ||
        message.includes('Failed to fetch dynamically imported module');

      if (!isChunkError) return;

      const alreadyReloaded = sessionStorage.getItem(RELOAD_KEY);
      if (alreadyReloaded) return;

      sessionStorage.setItem(RELOAD_KEY, '1');
      window.location.reload();
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return null;
}
