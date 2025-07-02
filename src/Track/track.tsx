'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { formatTimeTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlay,
} from '@/store/fearures/trackSlice';
import classNames from 'classnames';
import PartyIcon from './PartyIcon';
import { useLikeTrack } from '@/hooks/useLikeTracks';
import React from 'react';

type trackTypeProp = {
  track: TrackType;
  tracks: TrackType[];
  playlist: TrackType[];
};

function Track({ track, playlist }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const { toggleLike, isLike } = useLikeTrack(track);

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
    dispatch(setIsPlay(true));
  };

  const isActive = currentTrack?._id === track._id;

  return (
    <>
      <div
        className={styles.playlist__item}
        key={track._id}
        onClick={onClickTrack}
      >
        <div className={styles.playlist__track}>
          <div className={styles.track__title}>
            <div className={styles.track__titleImage}>
              {isActive && isPlay ? (
                <svg
                  className={classNames(
                    styles.waveAnimation,
                    styles.track__titleSvg,
                  )}
                >
                  <PartyIcon />
                </svg>
              ) : (
                <svg className={classNames(styles.track__titleSvg)}>
                  <use xlinkHref="/Image/icon/sprite.svg#icon-note" />
                </svg>
              )}
            </div>
            <div>
              <Link className={styles.track__titleLink} href="">
                {track.name}
                <span className={styles.track__titleSpan}></span>
              </Link>
            </div>
          </div>
          <div className={styles.track__author}>
            <Link className={styles.track__authorLink} href="">
              {track.author}
            </Link>
          </div>
          <div className={styles.track__album}>
            <Link className={styles.track__albumLink} href="">
              {track.album}
            </Link>
          </div>
          <div className={styles.track__time}>
            <div className={styles.track__like}>
              <svg
                onClick={toggleLike}
                className={`${styles.track__timeSvg} ${isLike ? styles.liked : ''}`}
              >
                <use
                  xlinkHref={`/Image/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
                ></use>
              </svg>
            </div>
            <span className={styles.track__timeText}>
              {formatTimeTime(track.duration_in_seconds)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default React.memo(Track);
