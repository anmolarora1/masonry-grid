import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';
import { MasonryGrid } from './components/MasonryGrid';
import { Search } from './components/Search';
import { AppContainer, MainContent } from './components/App.styles';

function Layout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  return (
    <AppContainer>
      <ScrollRestoration />
      <Search defaultValue={searchQuery} />
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
