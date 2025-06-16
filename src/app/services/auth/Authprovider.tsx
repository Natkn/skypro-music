import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextProps {
  user: { username: string } | null;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signOut: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ username: string } | null>(null); // Example
  const router = useRouter();

  const signOut = async () => {
    localStorage.removeItem('authToken');

    setUser(null);

    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }

    router.push('/auth/signin');
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
