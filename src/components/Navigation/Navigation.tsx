'use client';
import Image from 'next/image';
import styles from './Navigation.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/services/auth/Authprovider';

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { signOut } = useAuth();

  const logout = async () => {
    await signOut();
    router.push('/music/main');
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
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>
          {isAuthenticated ? (
            <li className={styles.menu__item}>
              <Link href="/music/favourite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          ) : null}
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
