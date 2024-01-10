import App from './App';
import appData from './AppData';
import { loader as HomePageLoader } from './loaders/HomePageLoader';
import ErrorNotFoundPage from './pages/ErrorNotFoundPage';
import Homepage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';

const customerRoutes = {
  element: <App {...appData} />,
  children: [
    {
      path: '/',
      element: <Homepage />,
      loader: HomePageLoader
    },
    {
      path: '/products?type=:productType',
      element: <ProductDetails name="product" />
    },
    {
      path: '/products/:productID',
      element: <ProductDetails name="product" />
    },
    {
      path: '*',
      element: <ErrorNotFoundPage />
    }
  ]
};

export default customerRoutes;
