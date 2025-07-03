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
    const storedFavorites = localStorage.getItem('favoriteTracks');
    const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

    const fetchData = async () => {
      if (access) {
        try {
          const response: ApiResponse = await getFavoriteTracks(access);

          if (response && response.success && Array.isArray(response.data)) {
            // Объединяем localStorage и данные с сервера
            const combinedTracks = [...initialFavorites, ...response.data];

            // Удаляем дубликаты (предполагается, что TrackType имеет уникальное поле id)
            const uniqueTracks = Array.from(
              new Map(
                combinedTracks.map((track) => [track.id, track]),
              ).values(),
            );

            dispatch(setFavoriteTrack(uniqueTracks));
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
        dispatch(setFavoriteTrack(initialFavorites));
        setLoading(false);
      }
    };

    fetchData();
  }, [access, dispatch]);

  // Запись в localStorage при изменении favoriteTracks в Redux
  useEffect(() => {
    localStorage.setItem('favoriteTracks', JSON.stringify(favoriteTracks));
  }, [favoriteTracks]);

  return (
    <Centerblock
      tracks={favoriteTracks}
      isLoading={loading}
      errorRes={errorMessage}
      playlistName="Мои треки"
    />
  );
}
