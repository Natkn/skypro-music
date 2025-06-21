'use client';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
//import { AxiosError } from 'axios';
//import styles from '../../../../components/Centerblock/centerblock.module.css';
import {
  getSelectedTracks,
  getTrackById,
} from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';

interface PageProps {
  params: {
    categoryId?: string;
  };
}

interface ApiResponse {
  _id: number;
  name: string;
  items: number[]; // items содержит ID треков
  owner: number[];
  __v: number;
}

export default function PlaylistPage({}: PageProps) {
  // const { categoryId } = params;
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistResponse = await getSelectedTracks();
        if (!playlistResponse) {
          throw new Error('Network response was not ok');
        }

        const playlistData: ApiResponse = playlistResponse;
        const trackIds = playlistData.items;

        // Получаем детали каждого трека по его ID
        const trackDetails = await Promise.all(
          trackIds.map(async (trackId) => {
            const track = await getTrackById(trackId); // Предполагается, что у вас есть функция getTrackById
            if (!track) {
              console.warn(`Track with ID ${trackId} not found`);
              return null; // Или какой-то дефолтный трек
            }
            return track;
          }),
        );

        // Фильтруем null-значения, если какие-то треки не были найдены
        const validTracks = trackDetails.filter(
          (track): track is TrackType => track !== null,
        );

        setTracks(validTracks);
        setLoading(false);
      } catch {
        setErrorMessage('Error fetching data:');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchTracks = async (): Promise<TrackType[]> => {
    return tracks; // Возвращаем текущий массив треков
  };

  useEffect(() => {
    console.log('PlaylistPage - Tracks:', tracks);
    console.log('PlaylistPage - Loading:', loading);
    console.log('PlaylistPage - ErrorMessage:', errorMessage);
  }, [tracks, loading, errorMessage]);

  return (
    <Centerblock
      tracks={tracks}
      loading={loading}
      errorMessage={errorMessage}
      setLoading={setLoading}
      fetchTracks={fetchTracks}
    />
  );
}
