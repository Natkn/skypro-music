'use client';
import styles from './../../../components/Centerblock/centerblock.module.css';
import '../../../app/page.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getTracks } from '@/app/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home({}) {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTracks()
      .then((res) => {
        if (
          Array.isArray(res) &&
          res.every((item) => typeof item === 'number')
        ) {
          setTracks(res);
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
            setError('Unknown error');
          }
        }
      });
  }, []);
  return (
    <>
      <p className={styles.errorText}>{error}</p>
      <Centerblock
        fetchTracks={getTracks}
        tracks={tracks}
        loading={loading}
        errorMessage={error}
        setLoading={setLoading}
      />
      {!loading && !error && (
        <ul>
          {tracks.map((track) => (
            <li key={track._id}>
              {track.name} - {track.author}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
