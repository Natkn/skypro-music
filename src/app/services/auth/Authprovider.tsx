import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextProps {
  user: { username: string } | null;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: async () => {},
  isLoggedIn: false,
  accessToken: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  const signOut = async () => {
    localStorage.removeItem('authToken');
    setAccessToken(null);
    setIsLoggedIn(false);
    setUser(null);

    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }

    router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, signOut, isLoggedIn, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
