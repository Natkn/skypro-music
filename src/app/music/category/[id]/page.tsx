'use client';
import React, { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import {
  getSelectedTracks,
  getTrackById,
} from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';

interface PageProps {
  params: Promise<{ id: string }>;
  setLoading: (loading: boolean) => void;
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

export default function PlaylistPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [playlistData, setPlaylistData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const playlistResponse = (await getSelectedTracks(
          id,
        )) as PlaylistResponse;

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
        setLoading(false);
        setTracks(validTracks);
        setErrorMessage(null);
        console.error('Error fetching data:');
        setErrorMessage(
          errorMessage || 'An error occurred while fetching data.',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [errorMessage, id]);

  const fetchTracks = async (): Promise<TrackType[]> => {
    return Promise.resolve(tracks);
  };
  return (
    <>
      <Centerblock
        tracks={tracks}
        loading={loading}
        errorMessage={errorMessage}
        setLoading={setLoading}
        fetchTracks={fetchTracks}
        playlistName={playlistData?.name}
      />
    </>
  );
}
