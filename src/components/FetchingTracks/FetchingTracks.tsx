'use client';
import { getTracks } from '@/app/services/tracks/tracksApi';
import {
  setAllTracks,
  setFetchError,
  setFetchLoading,
} from '@/store/fearures/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export default function FetchingTracks() {
  const dispatch = useAppDispatch();
  const { allTracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    if (allTracks.length) {
      dispatch(setAllTracks(allTracks));
    } else {
      dispatch(setFetchLoading(true));
      getTracks()
        .then((res) => {
          dispatch(setAllTracks(res));
        })
        .catch((error) => {
          if (error instanceof AxiosError)
            if (error.response) {
              dispatch(setFetchError(error.response.data));
            } else if (error.request) {
              dispatch(setFetchError('Произошла ошибка. Попробуйте позже.'));
            } else {
              dispatch(setFetchError('Unknown error'));
            }
        })
        .finally(() => {
          dispatch(setFetchLoading(false));
        });
    }
  }, [allTracks, dispatch]);
  return <></>;
}
