'use client';
import { ReactNode } from 'react';
import styles from './layout.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on category: ${category}`);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Navigation />
          {children}
          <Sidebar onCategoryClick={handleCategoryClick} />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
