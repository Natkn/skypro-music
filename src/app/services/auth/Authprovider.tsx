import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getFavoriteTracks } from '../tracks/tracksApi';
import { useAppDispatch } from '@/store/store';
import { ApiResponse } from '@/app/music/favourite/page';
import { setFavoriteTrack } from '@/store/fearures/trackSlice';

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);

      const fetchData = async () => {
        try {
          const response: ApiResponse = await getFavoriteTracks(token);
          if (response && response.success && Array.isArray(response.data)) {
            console.log('Favorites from API:', response.data); // Log the data
            dispatch(setFavoriteTrack(response.data));
          } else {
            console.error('Ошибка при получении избранных треков:', response);
          }
        } catch (error) {
          console.error('Ошибка при получении избранных треков (API):', error);
        }
      };

      fetchData();
    }
    // Load favorite tracks from localStorage
    const loadFromLocalStorage = () => {
      const storedFavorites = localStorage.getItem('favoriteTracks');
      console.log('Favorites from localStorage:', storedFavorites); // Log the data
      if (storedFavorites) {
        try {
          const initialFavorites = JSON.parse(storedFavorites);
          console.log('Parsed favorites from localStorage:', initialFavorites); // Log the parsed data
          dispatch(setFavoriteTrack(initialFavorites));
        } catch (error) {
          console.error(
            'Ошибка при разборе избранных треков из localStorage:',
            error,
          );
        }
      }
    };

    loadFromLocalStorage(); // Load immediately
  }, [dispatch]);

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
