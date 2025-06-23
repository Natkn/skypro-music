'use client';
import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '@/Filter/filter';
import Track from '@/Track/track';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';

interface CenterblockProps {
  fetchTracks: () => Promise<TrackType[]>;
  loading: boolean;
  errorMessage: string | null;
  setLoading: (loading: boolean) => void;
  tracks: TrackType[];
  playlistName?: string;
}
export default function Centerblock({
  fetchTracks,
  playlistName,
}: CenterblockProps) {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [headerTitle, setHeaderTitle] = useState('Треки');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedTracks = await fetchTracks();
        if (Array.isArray(fetchedTracks)) {
          setTracks(fetchedTracks);
        } else {
          setErrorMessage(
            'Ошибка: Данные о треках повреждены. Попробуйте позже.',
          );
        }
        setLoading(false);
      } catch {
        setErrorMessage(
          'Произошла ошибка при загрузке данных. Попробуйте позже.',
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchTracks]);

  useEffect(() => {
    // Обновляем заголовок при изменении playlistName
    if (playlistName) {
      setHeaderTitle(playlistName);
    } else {
      setHeaderTitle('Треки'); // Возвращаем к "Треки", если playlistName становится пустым
    }
  }, [playlistName]);

  return (
    <div className={styles.centerblock}>
      <Search title="" />
      <h2 className={styles.centerblock__h2}>{headerTitle}</h2>
      <Filter />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classnames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classnames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/Image/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {loading ? (
            <p className={styles.loadingText}>Загрузка...</p>
          ) : errorMessage ? (
            <p className={styles.errorText}>{errorMessage}</p>
          ) : (
            tracks.map((track) => (
              <Track
                key={track._id}
                track={track}
                playlist={tracks}
                tracks={track}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
