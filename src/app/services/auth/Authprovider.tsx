'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { refreshToken } from './authApi';
import {
  clearUserData,
  setAccessToken,
  setRefreshToken,
  setUsername,
} from '@/store/fearures/authSlice';
import { clearFavoriteTracks } from '@/store/fearures/trackSlice';
import { getFavoriteTracks } from '../tracks/tracksApi';

interface AuthContextProps {
  user: { username: string } | null;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextProps>({
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useAppDispatch();
  const {
    access: accessToken,
    refresh,
  } = useAppSelector((state) => state.auth);

  const refreshAccessToken = async () => {
    if (!refresh) {
      console.error('No refresh token found');
      return;
    }

    try {
      const tokens = await refreshToken(refresh);
      if (tokens && tokens.access && tokens.refresh) {
        dispatch(setAccessToken(tokens.access));
        dispatch(setRefreshToken(tokens.refresh));

        localStorage.setItem('authToken', tokens.access);
        localStorage.setItem('refreshToken', tokens.refresh);
      } else {
        console.error('Failed to refresh token: Invalid response format');
        dispatch(clearUserData());
        signOut();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      dispatch(clearUserData());
      signOut();
    }
  };

  const isTokenExpired = () => {
    if (!accessToken) return true;
    try {
      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      const expiryTime = decodedToken.exp * 1000;
      return Date.now() >= expiryTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const refreshTokenFromStorage = localStorage.getItem('refreshToken');
    const usernameFromStorage = localStorage.getItem('username');

    if (token && refreshTokenFromStorage) {
      if (isTokenExpired()) {
        refreshAccessToken();
      } else {
        dispatch(setAccessToken(token));
        dispatch(setRefreshToken(refreshTokenFromStorage));
        if (usernameFromStorage) {
          dispatch(setUsername(usernameFromStorage));
        }
        setIsLoggedIn(true);
        if (accessToken) {
          getFavoriteTracks(accessToken)
            .then((favoriteTracksResponse) => {
              if (
                favoriteTracksResponse &&
                favoriteTracksResponse.success &&
                Array.isArray(favoriteTracksResponse.data)
              ) {
             
              } else {
                console.error(
                  'Ошибка при получении избранных треков после входа:',
                  favoriteTracksResponse,
                );
              }
            })
            .catch((error) => {
              console.error('Ошибка при загрузке избранных треков:', error);
            });
        }
      }
    }
  }, []);

  const signOut = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    dispatch(clearUserData());
    dispatch(clearFavoriteTracks());
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, signOut, isLoggedIn, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
