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
    const updateDimensions = () => {
      console.log('updateDimensions');
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return dimensions;
};
