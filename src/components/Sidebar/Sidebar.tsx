'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  username: string;
  signOut: () => Promise<void>;
}

export default function Sidebar({ username, signOut }: SidebarProps) {
  const router = useRouter();

  const handleImageClick = async () => {
    {
      await signOut();
      router.push('/auth/signin');
    }
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username}</p>
        <Link
          href="/auth/signin"
          className={styles.sidebar__icon}
          onClick={handleImageClick}
        >
          <svg>
            <use xlinkHref="/Image/icon/sprite.svg#logout"></use>
          </svg>
        </Link>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/1">
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
            <Link className={styles.sidebar__link} href="/music/category/2">
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
            <Link className={styles.sidebar__link} href="/music/category/3">
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
