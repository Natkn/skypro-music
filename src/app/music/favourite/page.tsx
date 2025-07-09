'use client';

import React, { useEffect, useState } from 'react';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { setFavoriteTrack } from '@/store/fearures/trackSlice';

export interface ApiResponse {
  success: boolean;
  data: TrackType[];
}

export default function FavoriteTracksPage() {
  const dispatch = useAppDispatch();
  const { access } = useAppSelector((state) => state.auth);
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (access) {
        try {
          const response: ApiResponse = await getFavoriteTracks(access);

          if (response && response.success && Array.isArray(response.data)) {
            dispatch(setFavoriteTrack(response.data));
          } else {
            console.error(
              'getFavoriteTracks не вернул массив в поле data:',
              response,
            );
            setErrorMessage(
              'Не удалось загрузить любимые треки (неверный формат данных).',
            );
          }
        } catch (error) {
          console.error('Ошибка при получении избранных треков:', error);
          setErrorMessage('Не удалось загрузить любимые треки.');
        } finally {
          setLoading(false);
        }
      } else {
        setErrorMessage(
          'Не удалось загрузить любимые треки: нет access token.',
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [access, dispatch]);

  return (
    <Centerblock
      tracks={favoriteTracks}
      pagePlaylist={favoriteTracks}
      isLoading={loading}
      errorRes={errorMessage}
      playlistName="Мои треки"
    />
  );
}
