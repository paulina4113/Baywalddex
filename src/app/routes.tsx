import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { Scanner } from './pages/Scanner';
import { SpeciesDetail } from './pages/SpeciesDetail';
import { Collection } from './pages/Collection';
import { Badges } from './pages/Badges';
import { Diploma } from './pages/Diploma';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/scanner',
    Component: Scanner,
  },
  {
    path: '/species/:id',
    Component: SpeciesDetail,
  },
  {
    path: '/collection',
    Component: Collection,
  },
  {
    path: '/badges',
    Component: Badges,
  },
  {
    path: '/diploma',
    Component: Diploma,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);