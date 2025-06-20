'use client';
import classnames from 'classnames';
import styles from './centerblock.module.css';
import { data } from '@/data';
import Search from '../Search/Search';
import Filter from '@/Filter/filter';
import Track from '@/Track/track';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';

interface CenterblockProps {
  tracks: TrackType[];
  loading: boolean;
  errorMessage: string | null;
  setLoading: (loading: boolean) => void;
}
export default function Centerblock({ tracks }: CenterblockProps) {
  console.log('Centerblock received tracks:', tracks);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch {
        setErrorMessage(
          'Произошла ошибка при загрузке данных. Попробуйте позже.',
        );
        setLoading(false);
        setErrorMessage(null);
      }
    };

    fetchData();
  }, [tracks]);

  return (
    <div className={styles.centerblock}>
      <Search title="" />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter data={data} />
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
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
