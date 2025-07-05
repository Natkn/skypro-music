import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getFavoriteTracks } from '../tracks/tracksApi';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ApiResponse } from '@/app/music/favourite/page';
import { setFavoriteTrack } from '@/store/fearures/trackSlice';
import { refreshToken } from './authApi';

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
  const { favoriteTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const refresh = localStorage.getItem('refreshToken');

    if (token) {
      setAccessToken(token);
      setIsLoggedIn(true);
    }

    const refreshAccessToken = async () => {
      if (refresh) {
        try {
          const newAccessTokenResponse = await refreshToken(refresh);
          const newAccessToken = newAccessTokenResponse.access;

          setAccessToken(newAccessToken);
          localStorage.setItem('authToken', newAccessToken);
        } catch (error) {
          console.error('Ошибка при автоматическом обновлении токена:', error);
        }
      }
    };

    const isTokenExpired = () => {
      return false;
    };

    if (isTokenExpired() && refresh) {
      refreshAccessToken();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracks));
  }, [favoriteTracks]);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const response: ApiResponse = await getFavoriteTracks(accessToken);
          if (response && response.success && Array.isArray(response.data)) {
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
  }, [accessToken, dispatch]);

  const signOut = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
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
