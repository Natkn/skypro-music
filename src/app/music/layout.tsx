'use client';
import { ReactNode } from 'react';
import styles from './layout.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';
import FetchingTracks from '@/components/FetchingTracks/FetchingTracks';
import { UseInitAuth } from '@/hooks/useInitAuth';
import { TrackType } from '@/sharedTypes/sharedTypes';

interface MainLayoutProps {
  children: ReactNode;
  track: TrackType;
}

export default function MainLayout({ children, track }: MainLayoutProps) {
  UseInitAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <FetchingTracks />

          <Navigation />
          {children}
          <Sidebar />
        </main>
        <Bar track={track} />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
