'use client';
import Image from 'next/image';
import styles from './Navigation.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUserData } from '@/store/fearures/authSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const dispath = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { userData } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('userData changed:', userData);
  }, [userData]);

  const logout = () => {
    console.log('logout function called');
    dispath(clearUserData());
    router.push('/auth/signin');
  };
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href="/music/main">
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/Image/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div className={styles.nav__burger} onClick={toggleMenu}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div className={`${styles.nav__menu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="#" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          <li className={styles.menu__item}>
            <Link href="/music/favourite" className={styles.menu__link}>
              Мой плейлист
            </Link>
          </li>
          <li className={styles.menu__item}>
            {isAuthenticated ? (
              <p onClick={logout} className={styles.menu__link}>
                Выйти
              </p>
            ) : (
              <Link href="/auth/signin" className={styles.menu__link}>
                Войти
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
