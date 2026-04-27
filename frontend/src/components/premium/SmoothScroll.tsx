import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const disableSmoothScroll = /^\/audit\/[^/]+\/results$/.test(location.pathname);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || disableSmoothScroll) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disableSmoothScroll]);

  useEffect(() => {
    if (!lenisRef.current || location.hash) {
      return;
    }

    lenisRef.current.scrollTo(0, { immediate: true });
  }, [location.hash, location.pathname]);

  return null;
}
