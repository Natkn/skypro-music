'use client';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import styles from '../../../../components/Centerblock/centerblock.module.css';
import { getTracks } from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';

interface PageProps {
  params: {
    categoryId?: string;
  };
}

interface PlaylistType {
  _id: number;
  name: string;
  items: number[];
}

const playlists: PlaylistType[] = [
  {
    _id: 2,
    name: 'Плейлист дня',
    items: [35, 34, 12, 24, 25, 30, 11, 19, 13],
  },
];

export default function PlaylistPage({ params }: PageProps) {
  const { categoryId } = params;
  const [playlistTracks, setPlaylistTracks] = useState<TrackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) {
        setError('ID плейлиста не указан');
        setLoading(false);
        return;
      }

      const playlistId = Number.isInteger(Number(categoryId))
        ? Number(categoryId)
        : null;

      if (playlistId === null) {
        setError('Некорректный ID плейлиста');
        setErrorMessage(
          'Произошла ошибка при загрузке данных. Попробуйте позже.',
        );
        setLoading(false);
        return;
      }

      try {
        const allTracks = await getTracks(); // Загрузите ВСЕ треки
        const playlist = playlists.find((p) => p._id === playlistId);

        if (!playlist) {
          setError('Плейлист не найден');
          setLoading(false);
          return;
        }

        // Фильтруем треки на основе items из плейлиста
        const filteredTracks = allTracks.filter((track) =>
          playlist.items.includes(track._id),
        );

        setPlaylistTracks(filteredTracks);
        setLoading(false); //  Set loading to false after successful fetch
      } catch (error) {
        console.error('Error fetching and filtering tracks:', error); // Логируйте полную ошибку
        if (error instanceof AxiosError) {
          setError(`Ошибка API: ${error.message}`);
          console.error(
            'Axios error details:',
            error.response?.data,
            error.response?.status,
          );
        } else {
          setError('Неизвестная ошибка при загрузке данных.');
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return (
      <>
        <p className={styles.errorText}>{error}</p>
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
      </>
    );
  }
  console.log(playlistTracks);
  return (
    <Centerblock
      tracks={playlistTracks}
      loading={loading}
      errorMessage={errorMessage}
      setLoading={setLoading}
    />
  );
}
