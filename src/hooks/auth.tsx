import User from '@/@types/User';
import { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
// import { Mixpanel } from '../mixpanel';

export interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  socialNetworkSignIn(response: AuthState): void;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Heali:token');
    const user = localStorage.getItem('@Heali:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const storeUserInfo = (token: string, user: User): void => {
    localStorage.setItem('@Heali:token', token);
    localStorage.setItem('@Heali:user', JSON.stringify(user));

    setData({ token, user });
  };

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post<AuthState>('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    const { id, first_name, last_name, avatar_url, created_date } = user;

    // Mixpanel.people.set({
    //   $distinct_id: id,
    //   $first_name: first_name,
    //   $last_name: last_name,
    //   $avatar: avatar_url,
    //   $created: created_date,
    // });

    storeUserInfo(token, user);
  }, []);

  const socialNetworkSignIn = useCallback(({ user, token }: AuthState) => {
    const { id, first_name, last_name, avatar_url, created_date } = user;

    // Mixpanel.people.set({
    //   $distinct_id: id,
    //   $first_name: first_name,
    //   $last_name: last_name,
    //   $avatar: avatar_url,
    //   $created: created_date,
    // });

    storeUserInfo(token, user);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Heali:token');
    localStorage.removeItem('@Heali:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        socialNetworkSignIn,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an authProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
