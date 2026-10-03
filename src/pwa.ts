import { useEffect, useState } from 'react';

// Service Worker registration & PWA installation handling

let deferredInstallPrompt: any = null;

export const isStandalonePwa = (): boolean => {
  if (typeof window === 'undefined') return false;
  const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
  const isFullscreenMedia = window.matchMedia('(display-mode: fullscreen)').matches;
  const isMinimalUiMedia = window.matchMedia('(display-mode: minimal-ui)').matches;
  const isIosStandalone = (window.navigator as any).standalone === true;
  return isStandaloneMedia || isFullscreenMedia || isMinimalUiMedia || Boolean(isIosStandalone);
};

export const registerServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New PWA version available.');
              }
            });
          }
        });
      })
      .catch((err) => {
        console.warn('PWA Service Worker registration failed:', err);
      });
  });

  // Capture beforeinstallprompt event for custom install button
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    window.dispatchEvent(new Event('pwa-installable'));
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    window.dispatchEvent(new Event('pwa-installed'));
  });
};

export const canInstallPwa = (): boolean => {
  return Boolean(deferredInstallPrompt);
};

export const promptPwaInstall = async (): Promise<boolean> => {
  if (!deferredInstallPrompt) {
    return false;
  }
  try {
    deferredInstallPrompt.prompt();
    const choiceResult = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    return choiceResult.outcome === 'accepted';
  } catch (err) {
    console.error('PWA install prompt error:', err);
    return false;
  }
};

export const usePwaInstall = () => {
  const [isStandalone, setIsStandalone] = useState(isStandalonePwa());
  const [canPrompt, setCanPrompt] = useState(canInstallPwa());

  useEffect(() => {
    const checkStandalone = () => {
      setIsStandalone(isStandalonePwa());
    };

    const handleInstallable = () => setCanPrompt(true);
    const handleInstalled = () => {
      setCanPrompt(false);
      setIsStandalone(true);
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);

    const mql = window.matchMedia('(display-mode: standalone)');
    mql.addEventListener?.('change', checkStandalone);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      mql.removeEventListener?.('change', checkStandalone);
    };
  }, []);

  const installApp = async (): Promise<{ triggered: boolean; accepted: boolean }> => {
    if (isStandalone) {
      return { triggered: false, accepted: false };
    }
    if (deferredInstallPrompt) {
      const accepted = await promptPwaInstall();
      if (accepted) {
        setCanPrompt(false);
      }
      return { triggered: true, accepted };
    }
    return { triggered: false, accepted: false };
  };

  return {
    isStandalone,
    canPrompt,
    isInstallable: !isStandalone,
    shouldShowInstallButton: !isStandalone,
    installApp,
  };
};
