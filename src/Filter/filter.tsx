'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './filter.module.css';
import classNames from 'classnames';
import FilterItem from '@/FilterItem/filterItem';

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

  const handleYearFilterClick = (filterOption: string) => {
    console.log(`Selected year filter: ${filterOption}`);
    setActiveFilter(null);
  };

  const renderYearFilter = () => (
    <>
      <div
        className={styles.filter__item}
        onClick={() => handleYearFilterClick('newest')}
      >
        Сначала новые
      </div>
      <div
        className={styles.filter__item}
        onClick={() => handleYearFilterClick('oldest')}
      >
        Сначала старые
      </div>
      <div
        className={styles.filter__item}
        onClick={() => handleYearFilterClick('default')}
      >
        По умолчанию
      </div>
    </>
  );

  const renderAuthorFilter = () =>
    authors.map((author) => (
      <div key={author} className={styles.filter__item}>
        {author}
      </div>
    ));

  const renderGenreFilter = () =>
    genres.map((genre) => (
      <div key={genre} className={styles.filter__item}>
        {genre}
      </div>
    ));

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
            >
              {renderGenreFilter()}
            </FilterItem>
          )}
        </div>
      </div>
    </div>
  );
}
