import App, { type AppProps } from './App';
import appData from './AppData';

const adminRoutes = {
  element: <App {...(appData as AppProps)} />,
  children: [
    {
      path: '/admin',
      element: <div>ADMIN</div>
    },
    {
      path: '/admin/*',
      element: <div>404 not found</div>
    }
  ]
};

export default adminRoutes;
