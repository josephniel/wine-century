import { useEffect } from 'react';

import { useAuth } from '../../providers/AuthProvider';

const LogoutPage = (): React.ReactElement => {
  const { setToken } = useAuth();

  const handleLogout = (): void => {
    setToken(null);
  };

  useEffect(() => {
    handleLogout();
  });

  return <>Logout Page</>;
};

export default LogoutPage;
