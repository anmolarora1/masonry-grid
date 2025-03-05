import { useState, useCallback, useRef, useEffect } from 'react';
import { Photo } from '../types';
import { pexelsService } from '../services/pexelsApi';

const PHOTOS_PER_PAGE = 20;

export const usePhotos = (searchQuery: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const photoIdsRef = useRef<Set<number>>(new Set());
  const prevSearchQueryRef = useRef(searchQuery);

  const fetchPhotos = useCallback(async (pageNum: number, query: string) => {
    setLoading(true);

    try {
      const response = query
        ? await pexelsService.searchPhotos(query, pageNum)
        : await pexelsService.getPhotos(pageNum);

      setHasMore(pageNum * PHOTOS_PER_PAGE < response.total_results);

      if (pageNum === 1) {
        photoIdsRef.current.clear();
        setPhotos(response.photos);
        response.photos.forEach((photo) => photoIdsRef.current.add(photo.id));
      } else {
        const uniquePhotos = response.photos.filter(
          (photo) => !photoIdsRef.current.has(photo.id)
        );

        if (uniquePhotos.length > 0) {
          setPhotos((prev) => [...prev, ...uniquePhotos]);
          uniquePhotos.forEach((photo) => photoIdsRef.current.add(photo.id));
        }
      }
    } catch (error) {
      console.error('[usePhotos] Error fetching photos:', error);
      if (pageNum === 1) {
        setPhotos([]);
      }
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const shouldReset = searchQuery !== prevSearchQueryRef.current;

    if (shouldReset) {
      prevSearchQueryRef.current = searchQuery;
      photoIdsRef.current.clear();
      setPhotos([]);
      setPage(1);
      setHasMore(true);
    }

    fetchPhotos(page, searchQuery);
  }, [page, searchQuery, fetchPhotos]);
  return {
    photos,
    loading,
    page,
    hasMore,
    setPage,
  };
};
