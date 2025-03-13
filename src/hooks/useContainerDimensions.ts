import { useEffect, useState, RefObject } from 'react';
import debounce from 'lodash/debounce';

interface Dimensions {
  width: number;
  height: number;
}

export const useContainerDimensions = (
  ref: RefObject<HTMLDivElement | null>
) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) return;
    const updateDimensions = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(ref.current);

    // listen for window resize as a fallback
    window.addEventListener('resize', debouncedUpdateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedUpdateDimensions);
      debouncedUpdateDimensions.cancel();
    };
  }, [ref]);

  return dimensions;
};
