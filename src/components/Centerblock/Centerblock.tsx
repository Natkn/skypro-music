'use client';
import classnames from 'classnames';
import styles from './centerblock.module.css';
import Search from '../Search/Search';
import Filter from '@/Filter/filter';
import Track from '@/Track/track';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { setPagePlaylist } from '@/store/fearures/trackSlice';
import { useAppDispatch } from '@/store/store';

interface CenterblockProps {
  isLoading: boolean;
  errorRes: string | null;
  tracks: TrackType[];
  playlistName?: string;
  pagePlaylist: TrackType[];
}
export default function Centerblock({
  playlistName,
  errorRes,
  isLoading,
  tracks,
  pagePlaylist,
}: CenterblockProps) {
  const dispatch = useAppDispatch();
  const [headerTitle, setHeaderTitle] = useState('Треки');

  useEffect(() => {
    if (playlistName) {
      setHeaderTitle(playlistName);
    } else {
      setHeaderTitle('Треки');
    }
  }, [playlistName]);

  useEffect(() => {
    if (!isLoading && !errorRes) {
      dispatch(setPagePlaylist(pagePlaylist));
    }
  }, [isLoading, errorRes, dispatch, pagePlaylist]);

  return (
    <div className={styles.centerblock}>
      <Search title="" />
      <h2 className={styles.centerblock__h2}>{headerTitle}</h2>
      <Filter tracks={pagePlaylist} />
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
          {errorRes
            ? errorRes
            : isLoading
              ? 'Loading...'
              : tracks.map((track) => (
                  <Track
                    key={track._id}
                    track={track}
                    tracks={tracks}
                    playlist={tracks}
                  />
                ))}
        </div>
      </div>
    </div>
  );
}
