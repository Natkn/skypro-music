'use client';

import React, { useEffect, useState } from 'react';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { access } = useAppSelector((state) => state.auth);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!access) {
      setErrorMessage('Нет избранных треков.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    getFavoriteTracks(access)
      .then((response: ApiResponse) => {
        if (response && response.success && Array.isArray(response.data)) {
          setTracks(response.data);
          dispatch(setFavoriteTrack(response.data));
        } else {
          console.error(
            'getFavoriteTracks не вернул массив в поле data:',
            response,
          );
          setTracks([]);
          setErrorMessage(
            'Не удалось загрузить любимые треки (неверный формат данных).',
          );
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении избранных треков:', error);
        setErrorMessage('Не удалось загрузить любимые треки.');
        setTracks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [access, dispatch, router]);

  return (
    <Centerblock
      tracks={tracks}
      isLoading={loading}
      errorRes={errorMessage}
      playlistName="Мои треки"
    />
  );
}
