'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getSelectedTracks } from '@/app/services/tracks/tracksApi';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

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
  const isFirstRender = useRef(true);
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    const fetchData = async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      try {
        setLoading(true);
        setErrorMessage(null);

        if (!allTracks || allTracks.length === 0) {
          throw new Error('No tracks found in Redux Store!');
        }

        const playlistResponse = await getSelectedTracks(id);

        if (!playlistResponse) {
          throw new Error('Playlist not found!');
        }

        setPlaylistData(playlistResponse);

        const trackIds: string[] = playlistResponse.items.map(String);
        const filteredTracks = allTracks.filter((track) =>
          trackIds.includes(track._id.toString()),
        );

        setTracks(filteredTracks);
        setErrorMessage(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage(
          errorMessage || 'An error occurred while fetching data.',
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, errorMessage, allTracks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!playlistData || tracks.length === 0) {
    return <div>No tracks found for this playlist.</div>;
  }

  return (
    <>
      <Centerblock
        tracks={tracks}
        isLoading={loading}
        errorRes={errorMessage}
        playlistName={playlistData?.name}
      />
    </>
  );
}
