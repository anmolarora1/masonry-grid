import { useRef, useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollRestoration = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  shouldRestore: boolean
) => {
  const location = useLocation();
  const hasRestoredScrollRef = useRef(false);
  const scrollAttemptsRef = useRef(0);
  const maxScrollAttempts = 3;

  // First attempt with useLayoutEffect
  useLayoutEffect(() => {
    const isReturningToGrid = location.pathname === '/';
    console.log(
      '[ScrollRestoration] Layout effect - isReturningToGrid:',
      isReturningToGrid
    );
    console.log(
      '[ScrollRestoration] Layout effect - shouldRestore:',
      shouldRestore
    );
    console.log(
      '[ScrollRestoration] Layout effect - containerRef:',
      containerRef.current
    );
    console.log(
      '[ScrollRestoration] Layout effect - hasRestoredScrollRef:',
      hasRestoredScrollRef.current
    );

    if (
      isReturningToGrid &&
      shouldRestore &&
      containerRef.current &&
      !hasRestoredScrollRef.current
    ) {
      const savedScroll = sessionStorage.getItem('gridScrollPosition');
      if (savedScroll) {
        const scrollPosition = parseInt(savedScroll);
        console.log(
          '[ScrollRestoration] Layout effect - Restoring scroll to:',
          scrollPosition
        );
        containerRef.current.scrollTop = scrollPosition;
        hasRestoredScrollRef.current = true;
        sessionStorage.removeItem('gridScrollPosition');
      }
    }
  }, [location.pathname, shouldRestore]);

  // Backup attempt with useEffect
  useEffect(() => {
    const isReturningToGrid = location.pathname === '/';
    console.log(
      '[ScrollRestoration] Effect - isReturningToGrid:',
      isReturningToGrid
    );
    console.log('[ScrollRestoration] Effect - shouldRestore:', shouldRestore);
    console.log(
      '[ScrollRestoration] Effect - containerRef:',
      containerRef.current
    );
    console.log(
      '[ScrollRestoration] Effect - hasRestoredScrollRef:',
      hasRestoredScrollRef.current
    );
    console.log(
      '[ScrollRestoration] Effect - scrollAttemptsRef:',
      scrollAttemptsRef.current
    );

    if (
      isReturningToGrid &&
      shouldRestore &&
      containerRef.current &&
      !hasRestoredScrollRef.current &&
      scrollAttemptsRef.current < maxScrollAttempts
    ) {
      const savedScroll = sessionStorage.getItem('gridScrollPosition');
      if (savedScroll) {
        const scrollPosition = parseInt(savedScroll);
        console.log(
          '[ScrollRestoration] Effect - Restoring scroll to:',
          scrollPosition
        );
        containerRef.current.scrollTop = scrollPosition;
        hasRestoredScrollRef.current = true;
        sessionStorage.removeItem('gridScrollPosition');
      }
      scrollAttemptsRef.current += 1;
    }
  }, [location.pathname, shouldRestore]);

  return {
    hasRestoredScrollRef,
  };
};
