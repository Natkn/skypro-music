'use client';
import classnames from 'classnames';
import styles from './centerblock.module.css';
import { data } from '@/data';
import Search from '../Search/Search';
import { getUniqueValuesByKey } from '@/utils/helper';
import Filter from '@/Filter/filter';
import Track from '@/Track/track';

export default function Centerblock() {
  console.log(getUniqueValuesByKey(data, 'author'));
  return (
    <div className={styles.centerblock}>
      <Search title="Name" />
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
          {data.map((track) => (
            <Track key={track._id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
