'use client';

import { useState, useCallback } from 'react';
import styles from './search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFilteredTracks } from '@/store/fearures/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';

export default function Search({}) {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  const onSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value.toLowerCase();
      setSearchInput(searchTerm);

      if (!searchTerm) {
        dispatch(setFilteredTracks(allTracks));
        return;
      }

      const filtered = allTracks.filter((track: TrackType) => {
        const trackName = track.name.toLowerCase();
        const authorName = track.author.toLowerCase();
        return (
          trackName.includes(searchTerm) || authorName.includes(searchTerm)
        );
      });

      dispatch(setFilteredTracks(filtered));
    },
    [allTracks, dispatch],
  );

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/Image/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
