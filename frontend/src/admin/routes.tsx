import { type RouteObject } from 'react-router-dom';
import App from './App';
import appData from './AppData';
import Homepage from './pages/HomePage';
import { LoginAction } from './actions/LoginAction';

const adminRoutes: RouteObject = {
  element: <App {...appData} />,
  children: [
    {
      path: '/admin',
      element: <Homepage />,
      action: LoginAction
    },
    {
      path: '/admin/*',
      element: <div>404 not found</div>
    }
  ]
};

export default adminRoutes;
