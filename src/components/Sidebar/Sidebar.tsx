'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SidebarProps {
  onCategoryClick: (category: string) => void;
}

export default function Sidebar({ onCategoryClick }: SidebarProps) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const handleClick = (category: string) => {
    onCategoryClick(category);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    router.push('/auth/signin');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username}</p>
        <Link
          href="/auth/signin"
          className={styles.sidebar__icon}
          onClick={handleLogout}
        >
          <svg>
            <use xlinkHref="/Image/icon/sprite.svg#logout"></use>
          </svg>
        </Link>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link
              className={styles.sidebar__link}
              onClick={() => handleClick('2')}
              href={`/music/category/2`}
            >
              <Image
                className={styles.sidebar__Image}
                src="/Image/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__Image}
                src="/Image/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__Image}
                src="/Image/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
