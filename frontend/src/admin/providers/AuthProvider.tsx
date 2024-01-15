import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

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

export default AuthProvider;
