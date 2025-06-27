'use client';
import '../../../app/page.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

export default function Home({}) {
  const { fetchError, fetchIsLoading, allTracks } = useAppSelector(
    (state) => state.tracks,
  );

  return (
    <>
      <Centerblock
        tracks={allTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
      />
    </>
  );
}
