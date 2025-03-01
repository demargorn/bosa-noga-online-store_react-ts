import { createBrowserRouter } from 'react-router';
import Layout from '../layouts/Layout';
import Main from '../pages/Main/Main';
import Catalog from '../pages/Catalog/Catalog';
import Cart from '../pages/Cart/Cart';
import About from '../pages/About/About';
import Contacts from '../pages/Contacts/Contacts';
import NotFound from '../pages/NotFound/NotFound';

const router = createBrowserRouter([
   {
      path: '/',
      element: <Layout />,
      children: [
         {
            path: '/',
            element: <Main />,
         },
         {
            path: '/catalog',
            element: <Catalog />,
         },
         {
            path: '/cart',
            element: <Cart />,
         },
         {
            path: '/about',
            element: <About />,
         },
         {
            path: '/contacts',
            element: <Contacts />,
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
]);

export default router;
