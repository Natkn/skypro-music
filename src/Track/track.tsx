'use client';

import Link from 'next/link';
import styles from './track.module.css';
import { formatTimeTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/fearures/trackSlice';
import classNames from 'classnames';
import PartyIcon from './PartyIcon';

type trackTypeProp = {
  track: TrackType;
};

export default function Track({ track }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
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
          <div className="styles.track__time">
            <svg className={styles.track__timeSvg}>
              <use xlinkHref="/Image/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.track__timeText}>
              {formatTimeTime(track.duration_in_seconds)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
