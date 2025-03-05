import { Photo } from '../types';

interface PhotoGridState {
  photos: Photo[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  loadedPages: Set<number>;
  totalResults: number;
  searchQuery: string;
}

type PhotoGridAction =
  | { type: 'SET_PHOTOS'; payload: { photos: Photo[]; page: number } }
  | { type: 'ADD_PHOTOS'; payload: { photos: Photo[]; page: number } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_TOTAL_RESULTS'; payload: number }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'RESET_STATE' };

const initialState: PhotoGridState = {
  photos: [],
  loading: false,
  page: 1,
  hasMore: true,
  loadedPages: new Set<number>(),
  totalResults: 0,
  searchQuery: '',
};

export const photoGridReducer = (
  state: PhotoGridState,
  action: PhotoGridAction
): PhotoGridState => {
  switch (action.type) {
    case 'SET_PHOTOS':
      return {
        ...state,
        photos: action.payload.photos,
        loadedPages: new Set([action.payload.page]),
        loading: false,
      };

    case 'ADD_PHOTOS':
      return {
        ...state,
        photos: [...state.photos, ...action.payload.photos],
        loadedPages: new Set([
          ...Array.from(state.loadedPages),
          action.payload.page,
        ]),
        loading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };

    case 'SET_HAS_MORE':
      return {
        ...state,
        hasMore: action.payload,
      };

    case 'SET_TOTAL_RESULTS':
      return {
        ...state,
        totalResults: action.payload,
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
};
