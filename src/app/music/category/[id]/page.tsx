'use client';
import { useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
//import { AxiosError } from 'axios';
//import styles from '../../../../components/Centerblock/centerblock.module.css';
import { getSelectedTracks } from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';

interface PageProps {
  params: {
    categoryId?: string;
  };
}

export default function PlaylistPage({ params }: PageProps) {
  const { categoryId } = params;
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const playlistId = Number(categoryId);
  const fetchPlaylistTracks = async (): Promise<TrackType[]> => {
    if (!playlistId) {
      throw new Error('ID плейлиста не указан');
    }

    try {
      return await getSelectedTracks();
    } catch (error) {
      setErrorMessage('Произошла ошибка при загрузке треков.');

      throw error;
    }
  };
  return (
    <Centerblock
      fetchTracks={fetchPlaylistTracks}
      loading={loading}
      errorMessage={errorMessage}
      setLoading={setLoading}
    />
  );
}
