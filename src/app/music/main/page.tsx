'use client';

import '../../../app/page.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect } from 'react';
import { getTracks } from '@/app/services/tracks/tracksApi';

export default function Home() {
  useEffect(() => {
    getTracks();
  }, []);
  return <Centerblock />;
}
