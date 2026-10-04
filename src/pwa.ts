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

export const refreshApp = async (): Promise<boolean> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return false;
  }
  try {
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        await registration.update();
      }
    }
  } catch (err) {
    console.warn('PWA refresh error:', err);
  } finally {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
  return true;
};

export const usePwaInstall = () => {
  const [isStandalone, setIsStandalone] = useState(isStandalonePwa());
  const [canPrompt, setCanPrompt] = useState(canInstallPwa());
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const checkStandalone = () => {
      setIsStandalone(isStandalonePwa());
    };

    const handleInstallable = () => setCanPrompt(true);
    const handleInstalled = () => {
      setCanPrompt(false);
      setIsStandalone(true);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const mql = window.matchMedia('(display-mode: standalone)');
    mql.addEventListener?.('change', checkStandalone);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
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
    isOnline,
    installApp,
    refreshApp,
  };
};
