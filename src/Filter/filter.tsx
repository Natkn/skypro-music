'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './filter.module.css';
import classNames from 'classnames';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';

interface FilterItemProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLDivElement>;
}

const FilterItem: React.FC<FilterItemProps> = ({
  children,
  isOpen,
  onClose,
  anchorRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  return (
    isOpen && (
      <div className={styles.filter__dropdown} ref={dropdownRef}>
        {children}
      </div>
    )
  );
};

interface FilterProps {
  data: TrackType[];
}

export default function Filter({}: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [authors, setAuthors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const authorButtonRef = useRef<HTMLDivElement>(null!);
  const genreButtonRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueAuthors = [...new Set(data.map((track) => track.author))];
      setAuthors(uniqueAuthors);

      const firstGenre = data[0].genre;
      setGenres(firstGenre);
    }
  }, []);

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
        <div className={styles.filter__list}>
          <FilterItem
            isOpen={activeFilter === 'author'}
            onClose={() => setActiveFilter(null)}
            anchorRef={authorButtonRef}
          >
            {renderAuthorFilter()}
          </FilterItem>
        </div>
      </div>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: activeFilter === 'year',
        })}
        onClick={() => handleFilterClick('year')}
      >
        году выпуска
      </div>
      <FilterItem
        isOpen={activeFilter === 'year'}
        onClose={() => setActiveFilter(null)}
        anchorRef={authorButtonRef}
      >
        {renderYearFilter()}
      </FilterItem>

      <div
        className={classNames(styles.filter__button, {
          [styles.active]: activeFilter === 'genre',
        })}
        onClick={() => handleFilterClick('genre')}
        ref={genreButtonRef}
      >
        жанру
      </div>
      <FilterItem
        isOpen={activeFilter === 'genre'}
        onClose={() => setActiveFilter(null)}
        anchorRef={genreButtonRef}
      >
        {renderGenreFilter()}
      </FilterItem>
    </div>
  );
}
