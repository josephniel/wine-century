import axios from 'axios';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  // useMemo,
  useState
} from 'react';

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
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem('token');
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): Context => {
  return useContext(AuthContext);
};

export default AuthProvider;
