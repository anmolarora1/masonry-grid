import { useEffect, useState, RefObject } from 'react';

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
    if (!ref?.current) return;

    // Log initial dimensions
    console.log('Initial container dimensions:', {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    });

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;
        // Only update if we have valid dimensions
        if (width > 0 && height > 0) {
          console.log('Resize observer fired:', { width, height });
          setDimensions({ width, height });
        } else {
          // If we get zero dimensions, use the previous valid dimensions
          console.log(
            'Ignoring zero dimensions, keeping previous:',
            dimensions
          );
        }
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return dimensions;
};
