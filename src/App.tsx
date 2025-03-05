import React, { useState, useCallback, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { MasonryGrid } from './components/MasonryGrid';
import { PhotoDetailRoute } from './components/PhotoDetailRoute';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  flex-shrink: 0;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0066cc;
  }
`;

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Create a debounced function to update URL
  const debouncedUpdateUrl = useCallback(
    debounce((query: string) => {
      const params = new URLSearchParams();
      if (query) {
        params.set('q', query);
      }
      navigate(`?${params.toString()}`, { replace: true });
    }, 500),
    [navigate]
  );

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchQuery(value);
      debouncedUpdateUrl(value);
    },
    [debouncedUpdateUrl]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateUrl.cancel();
    };
  }, [debouncedUpdateUrl]);

  return (
    <AppContainer>
      <ScrollRestoration />
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='Search photos...'
          value={searchQuery}
          onChange={handleSearch}
        />
      </SearchContainer>

      <MainContent>
        <Outlet />
      </MainContent>
    </AppContainer>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MasonryGrid />,
      },
      {
        path: 'photo/:id',
        element: <PhotoDetailRoute />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
