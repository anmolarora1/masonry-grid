import { Photo, PhotosResponse } from '../types';

// Define types for the Pexels API client and responses
interface PexelsClient {
  photos: {
    curated: (params: {
      page: number;
      per_page: number;
    }) => Promise<PexelsApiResponse>;
    search: (params: {
      query: string;
      page: number;
      per_page: number;
    }) => Promise<PexelsApiResponse>;
  };
}

interface PexelsApiResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
}

// Pexels API photo type
interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

const createPexelsClient = (apiKey: string): PexelsClient => {
  const headers = {
    Authorization: apiKey,
  };

  const baseUrl = 'https://api.pexels.com/v1';

  return {
    photos: {
      curated: async ({ page, per_page }) => {
        const response = await fetch(
          `${baseUrl}/curated?page=${page}&per_page=${per_page}`,
          { headers }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch curated photos');
        }
        return response.json();
      },
      search: async ({ query, page, per_page }) => {
        const response = await fetch(
          `${baseUrl}/search?query=${encodeURIComponent(
            query
          )}&page=${page}&per_page=${per_page}`,
          { headers }
        );
        if (!response.ok) {
          throw new Error('Failed to search photos');
        }
        return response.json();
      },
    },
  };
};

const client = createPexelsClient(process.env.REACT_APP_PEXELS_API_KEY || '');

export const pexelsService = {
  async getPhoto(id: string): Promise<Photo> {
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: process.env.REACT_APP_PEXELS_API_KEY || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch photo');
    }

    return response.json();
  },

  async getPhotos(
    page: number = 1,
    perPage: number = 20
  ): Promise<PhotosResponse> {
    try {
      const response = await client.photos.curated({
        page,
        per_page: perPage,
      });

      return {
        page,
        per_page: perPage,
        photos: response.photos as Photo[],
        total_results: response.total_results,
        next_page: response.next_page,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to fetch photos'
      );
    }
  },

  async searchPhotos(
    query: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<PhotosResponse> {
    try {
      const response = await client.photos.search({
        query,
        page,
        per_page: perPage,
      });

      return {
        page,
        per_page: perPage,
        photos: response.photos as Photo[],
        total_results: response.total_results,
        next_page: response.next_page,
      };
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to search photos'
      );
    }
  },
};
