import React, { useState, useCallback, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import { MasonryGrid } from './components/MasonryGrid';
import {
  AppContainer,
  SearchContainer,
  MainContent,
  SearchInput,
} from './components/App.styles';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
