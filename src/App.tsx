import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';
import { MasonryGrid } from './components/MasonryGrid';
import { Search } from './components/Search';
import { AppContainer, MainContent } from './components/App.styles';
import { PhotoDetailRoute } from './components/PhotoDetailRoute';

function Layout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';
  const photoId = searchParams.get('photo');

  return (
    <AppContainer>
      <ScrollRestoration />
      <Search defaultValue={searchQuery} />
      <MainContent>
        <MasonryGrid />
        {photoId && <PhotoDetailRoute />}
      </MainContent>
    </AppContainer>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
