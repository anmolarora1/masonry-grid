import React, { useRef, useState, useCallback } from 'react';
import { Photo } from '../types';
import { useMasonryLayout } from '../hooks/useMasonryLayout';
import { usePhotos } from '../hooks/usePhotos';
import { useContainerDimensions } from '../hooks/useContainerDimensions';
import { useNavigate, useLocation } from 'react-router-dom';
import { PhotoModal } from './PhotoModal';
import {
  GridContainer,
  GridItem,
  Image,
  LoadingContainer,
} from './MasonryGrid.styles';

interface MasonryGridProps {
  className?: string;
  style?: React.CSSProperties;
}

const MIN_COLUMN_WIDTH = 300;
const MAX_COLUMN_WIDTH = 400;
const GAP = 16;

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { photos, loading, page, hasMore, setPage } = usePhotos(searchQuery);
  const containerDimensions = useContainerDimensions(containerRef);

  // Calculate number of columns based on container width
  const containerWidth = containerDimensions.width || window.innerWidth - 32;
  const numColumns = Math.max(
    1,
    Math.floor((containerWidth - GAP) / (MIN_COLUMN_WIDTH + GAP))
  );
  const columnWidth = Math.min(
    MAX_COLUMN_WIDTH,
    (containerWidth - (numColumns + 1) * GAP) / numColumns
  );

  const config = {
    containerWidth,
    containerHeight: containerDimensions.height || window.innerHeight - 100,
    itemWidth: columnWidth,
    gap: GAP,
  };

  const { positions, visibleItems, totalHeight } = useMasonryLayout<Photo>(
    photos,
    config,
    scrollTop,
    containerDimensions.height
  );

  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      setSelectedPhoto(photo);
      navigate(`/photo/${photo.id}`, {
        state: { photo },
        replace: true,
      });
    },
    [navigate]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedPhoto(null);
    navigate('/', { replace: true });
  }, [navigate]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      setScrollTop(target.scrollTop);

      if (!loading && hasMore) {
        const threshold = target.clientHeight * 1.5;
        const remainingScroll = target.scrollHeight - target.scrollTop;

        if (remainingScroll <= threshold) {
          const nextPage = page + 1;
          setPage(nextPage);
        }
      }
    },
    [loading, hasMore, page, setPage]
  );

  if (!photos.length && loading) {
    return (
      <LoadingContainer>
        {searchQuery
          ? `Loading photos for ${searchQuery}...`
          : 'Loading photos...'}
      </LoadingContainer>
    );
  }

  return (
    <>
      <GridContainer
        ref={containerRef}
        onScroll={handleScroll}
        className={className}
        style={style}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map((index) => {
            const photo = photos[index];
            const position = positions[index];

            if (!photo || !position) return null;

            return (
              <GridItem
                key={photo.id}
                $pos={position}
                onClick={() => handlePhotoClick(photo)}
              >
                <Image
                  src={photo.src.medium}
                  alt={photo.alt || 'Photo'}
                  loading='lazy'
                />
              </GridItem>
            );
          })}
        </div>
        {loading && <LoadingContainer>Loading more photos...</LoadingContainer>}
        {!loading && !hasMore && photos.length > 0 && (
          <LoadingContainer>No more photos to load</LoadingContainer>
        )}
      </GridContainer>
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={handleCloseModal} />
      )}
    </>
  );
};
