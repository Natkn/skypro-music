'use client';

import React, { useEffect, useState } from 'react';
import { getFavoriteTracks } from '@/app/services/tracks/tracksApi';
import { useRouter } from 'next/navigation';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/sharedTypes/sharedTypes';

export default function FavoriteTracksPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { access } = useAppSelector((state) => state.auth);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем наличие access токена
    if (!access) {
      // Если токена нет, возможно, стоит перенаправить на страницу логина или домашнюю
      // router.push('/login'); // Пример перенаправления
      console.warn('Нет access токена, не могу загрузить избранные треки.');
      setErrorMessage('Для просмотра избранных треков войдите в аккаунт.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    getFavoriteTracks(access)
      .then((data: TrackType[]) => {
        // Указываем тип данных для лучшей читаемости
        setTracks(data);
        // Исправлено: используем правильное действие setFavoriteTrack
        dispatch(getFavoriteTracks(access));
      })
      .catch((error) => {
        console.error('Ошибка при получении избранных треков:', error);
        setErrorMessage('Не удалось загрузить любимые треки.'); // Сообщение об ошибке
      })
      .finally(() => {
        setLoading(false);
      });
  }, [access, dispatch, router]); // router добавлен в зависимости, если используется для навигации

  return (
    <Centerblock
      tracks={tracks}
      isLoading={loading}
      errorRes={errorMessage}
      // Если playlistData удалено, передаем статическое название
      playlistName="Мои треки"
      // Или если setPlaylistData должно было использоваться для чего-то другого,
      // убедитесь, что оно передано правильно, но судя по всему, это не так.
      // playlistName={playlistData?.name}
    />
  );
}
