import { jwtDecode } from 'jwt-decode';
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import type User from '../data/user';

interface Context {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<Context>({
  token: null,
  setToken: (): any => {}
});

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): Context => {
  return useContext(AuthContext);
};

export const getUserFromAuth = (): User | undefined => {
  const { token } = useAuth();

  const getUserFromToken = (token: string | null): User | undefined => {
    if (token === null) {
      return undefined;
    }

    const decoded: any = jwtDecode(token);
    return {
      id: decoded.data.id,
      firstName: decoded.data.firstName,
      lastName: decoded.data.lastName,
      email: decoded.data.email,
      permissions: decoded.data.permissions
    };
  };

  return getUserFromToken(token);
};

export default AuthProvider;
