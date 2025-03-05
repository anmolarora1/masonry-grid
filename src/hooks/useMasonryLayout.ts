import { useMemo, useRef } from 'react';
import { MasonryItemPosition, VirtualizationConfig } from '../types';

interface Item {
  width: number;
  height: number;
}

const getItemHeight = <T extends Item>(
  item: T,
  targetWidth: number
): number => {
  if (!item.width || !item.height) return 0;
  const aspectRatio = item.height / item.width;
  return Math.max(50, targetWidth * aspectRatio);
};

export const useMasonryLayout = <T extends Item>(
  items: T[],
  config: VirtualizationConfig,
  scrollTop: number,
  viewportHeight: number
) => {
  const { containerWidth, itemWidth, gap } = config;
  const positionsRef = useRef<MasonryItemPosition[]>([]);
  const itemsLengthRef = useRef(0);
  const columnsRef = useRef(0);
  const columnHeightsRef = useRef<number[]>([]);
  const itemsRef = useRef<T[]>([]);

  // Calculate positions, preserving previous calculations
  const positions = useMemo(() => {
    if (containerWidth <= 0 || itemWidth <= 0) return [];

    // Calculate number of columns that fit in the container
    // First calculate how many complete item widths (including gaps) can fit
    const numColumns = Math.max(
      1,
      Math.floor((containerWidth - gap) / (itemWidth + gap))
    );

    // Reset layout if conditions changed or items array changed
    const shouldResetLayout =
      items !== itemsRef.current ||
      items.length < itemsLengthRef.current ||
      numColumns !== columnsRef.current;

    if (shouldResetLayout) {
      positionsRef.current = [];
      itemsLengthRef.current = 0;
      columnsRef.current = numColumns;
      columnHeightsRef.current = new Array(numColumns).fill(0);
      itemsRef.current = items;
    }

    // Initialize or get column heights
    const columnHeights = [...columnHeightsRef.current];
    const itemPositions = [...positionsRef.current];

    // Calculate positions for new items
    const calculateItemPosition = (item: T, index: number) => {
      const height = getItemHeight(item, itemWidth);
      if (!height) return;

      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      // Calculate position ensuring it stays within container bounds
      const left = shortestColumnIndex * (itemWidth + gap);

      // Skip if item would overflow container
      if (left + itemWidth > containerWidth) {
        return;
      }

      itemPositions[index] = {
        left,
        top: columnHeights[shortestColumnIndex],
        width: itemWidth,
        height,
      };

      // Update column height with gap
      columnHeights[shortestColumnIndex] += height + gap;
    };

    // Process only new items
    for (let i = itemsLengthRef.current; i < items.length; i++) {
      calculateItemPosition(items[i], i);
    }

    // Update refs for next calculation
    positionsRef.current = itemPositions;
    itemsLengthRef.current = items.length;
    columnsRef.current = numColumns;
    columnHeightsRef.current = columnHeights;
    itemsRef.current = items;

    return itemPositions;
  }, [items, containerWidth, itemWidth, gap]);

  // Calculate visible items
  const visibleItems = useMemo(() => {
    if (!positions.length) return [];

    const buffer = viewportHeight;
    const visibleStart = Math.max(0, scrollTop - buffer);
    const visibleEnd = scrollTop + viewportHeight + buffer;

    return positions.reduce<number[]>((acc, pos, index) => {
      if (!pos) return acc;
      if (pos.top + pos.height >= visibleStart && pos.top <= visibleEnd) {
        return [...acc, index];
      }
      return acc;
    }, []);
  }, [positions, scrollTop, viewportHeight]);

  const totalHeight = useMemo(() => {
    if (!positions.length) return 0;
    const lastPosition = positions[positions.length - 1];
    return lastPosition ? lastPosition.top + lastPosition.height + gap : 0;
  }, [positions, gap]);

  return { positions, visibleItems, totalHeight };
};
