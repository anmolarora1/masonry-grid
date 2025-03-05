import { useState, useCallback, useRef, useEffect } from 'react';
import { Photo } from '../types';
import { pexelsService } from '../services/pexelsApi';

const PHOTOS_PER_PAGE = 20;

export const usePhotos = (searchQuery: string) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const loadedPagesRef = useRef<Set<number>>(new Set());
  const photoIdsRef = useRef<Set<number>>(new Set());
  const prevSearchQueryRef = useRef(searchQuery);

  const fetchPhotos = useCallback(async (pageNum: number, query: string) => {
    if (loadedPagesRef.current.has(pageNum)) {
      return;
    }

    setLoading(true);

    try {
      const response = query
        ? await pexelsService.searchPhotos(query, pageNum)
        : await pexelsService.getPhotos(pageNum);

      setTotalResults(response.total_results);
      setHasMore(pageNum * PHOTOS_PER_PAGE < response.total_results);

      if (pageNum === 1) {
        loadedPagesRef.current.clear();
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
      loadedPagesRef.current.add(pageNum);
    } catch (error) {
      console.error('[usePhotos] Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPhotos = useCallback(() => {
    loadedPagesRef.current.clear();
    photoIdsRef.current.clear();
    setPhotos([]);
    setPage(1);
    setHasMore(true);
  }, []);

  const restoreState = useCallback(
    async (pageNum: number) => {
      await fetchPhotos(pageNum, searchQuery);
    },
    [fetchPhotos, searchQuery]
  );

  // Reset page when search query changes
  useEffect(() => {
    if (searchQuery !== prevSearchQueryRef.current) {
      prevSearchQueryRef.current = searchQuery;
      resetPhotos();
    }
  }, [searchQuery, resetPhotos]);

  // Fetch photos when page or search query changes
  useEffect(() => {
    fetchPhotos(page, searchQuery);
  }, [page, searchQuery, fetchPhotos]);

  return {
    photos,
    loading,
    page,
    hasMore,
    setPage,
    fetchPhotos,
    resetPhotos,
    restoreState,
    loadedPagesRef,
  };
};
