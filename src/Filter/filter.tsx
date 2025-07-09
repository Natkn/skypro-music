'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './filter.module.css';
import classNames from 'classnames';
import FilterItem from '@/FilterItem/filterItem';
import {
  setFilterAuthors,
  setFilterGenres,
  setSortByYear,
} from '@/store/fearures/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

interface Track {
  author: string;
  genre?: string[] | string;
}

interface FilterProps {
  tracks: Track[];
}

export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const authorButtonRef = useRef<HTMLDivElement>(null!);
  const yearButtonRef = useRef<HTMLDivElement>(null!);
  const genreButtonRef = useRef<HTMLDivElement>(null!);
  const selectedAuthors = useAppSelector(
    (state) => state.tracks.filters.authors,
  );
  const selectedGenres = useAppSelector((state) => state.tracks.filters.genres);
  const selectedYear = useAppSelector((state) => state.tracks.filters.years);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      const uniqueAuthors: string[] = [
        ...new Set(tracks.map((track: Track) => track.author)),
      ];
      setAuthors(uniqueAuthors);

      const allGenres: string[] = [];
      tracks.forEach((track: Track) => {
        if (track.genre) {
          if (Array.isArray(track.genre)) {
            track.genre.forEach((genre: string) => allGenres.push(genre));
          } else {
            allGenres.push(track.genre);
          }
        }
      });
      const uniqueGenres: string[] = [...new Set(allGenres)];
      setGenres(uniqueGenres);
    }
  }, [tracks]);

  const handleFilterClick = (filterName: string) => {
    setActiveFilter((prevFilter) =>
      prevFilter === filterName ? null : filterName,
    );
  };

  const renderYearFilter = () => (
    <>
      <div
        className={classNames(styles.filter__item, {
          [styles.selected]: selectedYear === 'newest',
        })}
        onClick={() => onSelectYear('newest')}
      >
        Сначала новые
      </div>
      <div
        className={classNames(styles.filter__item, {
          [styles.selected]: selectedYear === 'oldest',
        })}
        onClick={() => onSelectYear('oldest')}
      >
        Сначала старые
      </div>
      <div
        className={classNames(styles.filter__item, {
          [styles.selected]: selectedYear === 'default',
        })}
        onClick={() => onSelectYear('default')}
      >
        По умолчанию
      </div>
    </>
  );

  const renderAuthorFilter = () =>
    authors.map((author) => (
      <div
        key={author}
        className={classNames(styles.filter__item, {
          [styles.selected]: selectedAuthors.includes(author),
        })}
        onClick={() => onSelectAuthor(author)}
      >
        {author}
      </div>
    ));

  const renderGenreFilter = () =>
    genres.map((genre) => (
      <div
        key={genre}
        className={classNames(styles.filter__item, {
          [styles.selected]: selectedGenres.includes(genre),
        })}
        onClick={() => onSelectGenre(genre)}
      >
        {genre}
      </div>
    ));

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectGenre = (genre: string) => {
    dispatch(setFilterGenres(genre));
  };

  const onSelectYear = (filterOption: string) => {
    dispatch(setSortByYear(filterOption));
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filter__list_container}>
        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'author',
          })}
          onClick={() => handleFilterClick('author')}
          ref={authorButtonRef}
        >
          исполнителю
        </div>

        <div
          className={classNames(styles.filter__list, {
            [styles['filter__list--hidden']]: activeFilter !== 'author',
            [styles['filter__list--author']]: activeFilter === 'author',
          })}
        >
          {activeFilter === 'author' && (
            <FilterItem
              isOpen={activeFilter === 'author'}
              onClose={() => setActiveFilter(null)}
              anchorRef={authorButtonRef}
              filterType="author"
              onSelect={onSelectAuthor}
            >
              {renderAuthorFilter()}
            </FilterItem>
          )}
        </div>
      </div>

      <div className={styles.filter__list_container}>
        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'year',
          })}
          onClick={() => handleFilterClick('year')}
          ref={yearButtonRef}
        >
          году выпуска
        </div>
        <div
          className={classNames(styles.filter__list, {
            [styles['filter__list--hidden']]: activeFilter !== 'year',
            [styles['filter__list--year']]: activeFilter === 'year',
          })}
        >
          {activeFilter === 'year' && (
            <FilterItem
              isOpen={activeFilter === 'year'}
              onClose={() => setActiveFilter(null)}
              anchorRef={yearButtonRef}
              filterType="year"
              onSelect={onSelectYear}
            >
              {renderYearFilter()}
            </FilterItem>
          )}
        </div>
      </div>

      <div className={styles.filter__list_container}>
        <div
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'genre',
          })}
          onClick={() => handleFilterClick('genre')}
          ref={genreButtonRef}
        >
          жанру
        </div>
        <div
          className={classNames(styles.filter__list, {
            [styles['filter__list--hidden']]: activeFilter !== 'genre',
            [styles['filter__list--genre']]: activeFilter === 'genre',
          })}
        >
          {activeFilter === 'genre' && (
            <FilterItem
              isOpen={activeFilter === 'genre'}
              onClose={() => setActiveFilter(null)}
              anchorRef={genreButtonRef}
              filterType="genre"
              onSelect={onSelectGenre}
            >
              {renderGenreFilter()}
            </FilterItem>
          )}
        </div>
      </div>
    </div>
  );
}
