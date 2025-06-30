import { addLike, removeLike } from '@/app/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/fearures/trackSlice';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReault';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: (event: React.MouseEvent<SVGSVGElement>) => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      event.stopPropagation();
      setIsLike(!isLike);
      if (!access) {
        setErrorMsg('Нет авторизации');
        return;
      }

      if (!track?._id) {
        setErrorMsg('Не удалось определить идентификатор трека.');
        return;
      }
      const trackId = track._id;

      const isCurrentlyLiked = favoriteTracks.some((t) => t._id === trackId);

      const actionApi = isCurrentlyLiked ? removeLike : addLike;
      const actionSlice = isCurrentlyLiked ? removeLikedTracks : addLikedTracks;

      setIsLoading(true);
      setErrorMsg(null);

      withReauth(
        (newToken) => actionApi(newToken || access, track._id),
        refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            setErrorMsg(
              error.response?.data?.message ||
                'Произошла ошибка при запросе к серверу.',
            );
          } else {
            setErrorMsg('Неизвестная ошибка.');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [access, dispatch, refresh, favoriteTracks, track, isLike],
  );

  return {
    isLike,
    toggleLike,
    isLoading,
    errorMsg,
  };
};
