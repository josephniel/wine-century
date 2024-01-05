import App from './App';
import appData from './AppData';
import Homepage from './pages/HomePage';

const adminRoutes = {
  element: <App {...appData} />,
  children: [
    {
      path: '/admin',
      element: <Homepage />
    },
    {
      path: '/admin/*',
      element: <div>404 not found</div>
    }
  ]
};

export default adminRoutes;
