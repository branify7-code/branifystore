// Safe fetch property handler for iframe and strict mode environments
try {
  if (typeof window !== 'undefined') {
    const rawFetch = window.fetch ? window.fetch.bind(window) : undefined;
    if (rawFetch) {
      let activeFetch = rawFetch;
      Object.defineProperty(window, 'fetch', {
        get() {
          return activeFetch;
        },
        set(newFetch) {
          if (typeof newFetch === 'function') {
            activeFetch = newFetch;
          }
        },
        configurable: true,
        enumerable: true,
      });
    }
  }
} catch {
  // Ignore if already configured
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA if supported
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Ignored in restrictive sandboxes
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

