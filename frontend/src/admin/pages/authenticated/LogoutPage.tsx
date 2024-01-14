import { useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const LogoutPage = (): React.ReactElement => {
  const { setToken } = useAuth();
  // const navigate = useNavigate();

  const handleLogout = (): void => {
    setToken(null);
    // navigate('/', { replace: true });
  };

  useEffect(() => {
    handleLogout();
  });

  return <>Logout Page</>;
};

export default LogoutPage;
