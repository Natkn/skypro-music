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
  items: number[];
  owner: number[];
  __v: number;
}

export interface PlaylistResponse {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
  __v: number;
}

export default function PlaylistPage({}: PageProps) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistData, setPlaylistData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistResponse =
          (await getSelectedTracks()) as PlaylistResponse;

        if (!playlistResponse) {
          throw new Error('Playlist not found!');
        }

        setPlaylistData(playlistResponse);

        const trackIds: number[] = playlistResponse.items;

        const trackDetails = await Promise.all(
          trackIds.map(async (trackId) => {
            const track = await getTrackById(trackId);
            if (!track) {
              console.warn(`Track with ID ${trackId} not found`);
              return null;
            }
            return track;
          }),
        );

        const validTracks = trackDetails.filter(
          (track: TrackType | null): track is TrackType => track !== null,
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
    return Promise.resolve(tracks);
  };
  return (
    <Centerblock
      tracks={tracks}
      loading={loading}
      errorMessage={errorMessage}
      setLoading={setLoading}
      fetchTracks={fetchTracks}
      playlistName={playlistData?.name}
    />
  );
}
