'use client';
import classnames from 'classnames';
import styles from '../../../../components/Centerblock/centerblock.module.css';
import Filter from '@/Filter/filter';
import Track from '@/Track/track';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import Search from '@/components/Search/Search';
import { data } from '@/data';
import { TrackType } from '@/sharedTypes/sharedTypes';
// import { data } from '@/data'; //  Удалено, т.к. данные получаются из API

interface CenterblockProps {
  categoryId: string; //  Определяем тип для categoryId
}

export default function Centerblock({ categoryId }: CenterblockProps) {
  // Добавлено categoryId в пропсы
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState<TrackType[]>([]); // Указываем тип для tracks: массив объектов Track
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const { categoryId } = useParams(); //  Удалено, т.к. categoryId уже передается как пропс
  //  Удаляем selectionId, так как он избыточен

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) {
        // Добавлена проверка на categoryId
        setErrorMessage('Нет идентификатора категории в URL.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setErrorMessage(null); // Reset error message
        const response = await fetch(`/api/catalog/selection/${categoryId}`); // Замените на ваш API endpoint

        if (!response.ok) {
          throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }

        const data: TrackType[] = await response.json(); // Указываем тип для data
        setTracks(data);
        setLoading(false);
      } catch {
        // Указываем тип для error
        setErrorMessage(
          `Произошла ошибка при загрузке данных: ${errorMessage}`, // Более информативное сообщение об ошибке
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, errorMessage]); //  Убрали selectionId из зависимости

  return (
    <div className={styles.centerblock}>
      <Search title="" />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter data={tracks} />
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
          ) : tracks.length === 0 ? ( // Отображаем сообщение, если треки не загружены
            <p className={styles.errorText}>Нет треков для этой категории.</p>
          ) : (
            data.map(
              (
                track, // Используем загруженные треки
              ) => <Track key={track._id} track={track} playlist={tracks} />,
            )
          )}
        </div>
      </div>
      <Link href="/music/category/2">Category 2 Tracks</Link>
    </div>
  );
}
