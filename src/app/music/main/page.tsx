'use client';
import '../../../app/page.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';

export default function Home({}) {
  const { fetchError, fetchIsLoading, allTracks, filters, filteredTracks } =
    useAppSelector((state) => state.tracks);
  const [playlist, setPlaylist] = useState<TrackType[]>([]);

  useEffect(() => {
    const currentPlaylist =
      filters.authors.length || filters.genres.length
        ? filteredTracks
        : allTracks;
    setPlaylist(currentPlaylist);
  }, [
    filteredTracks,
    allTracks,
    filters.authors.length,
    filters.genres.length,
  ]);

  return (
    <>
      <Centerblock
        tracks={playlist}
        pagePlaylist={allTracks}
        isLoading={fetchIsLoading}
        errorRes={fetchError}
      />
    </>
  );
}
