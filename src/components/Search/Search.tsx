'use client';

import { useState } from 'react';
import styles from './search.module.css';

type SearchProps = {
  title: string;
};

export default function Search({ title }: SearchProps) {
  const [searchInput, setSearchInput] = useState('');
  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  console.log(title);
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
