'use client';

import Link from 'next/link';
import classnames from 'classnames';
import styles from './bar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleLoop,
  toggleShuffle,
} from '@/store/fearures/trackSlice';
import ProgressBar from '../ProgressBar/ProgressBar';
import { formatTime } from '@/utils/helper';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoadedTrack, setIsLoadedrack] = useState(false);
  const [volume, setVolume] = useState(50);
  const [displayVolume, setDisplayVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const isLoopFromStore = useAppSelector((state) => state.tracks.isLoop);
  const [isLoop, setIsLoop] = useState(false);
  const [volumeVisible, setVolumeVisible] = useState(false);

  const { toggleLike, isLike } = useLikeTrack(currentTrack || null);

  useEffect(() => {
    if (audioRef.current && currentTrack?.track_file) {
      if (isPlay) {
        audioRef.current.play().catch(() => {
          dispatch(setIsPlay(false));
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack?.track_file, isPlay, dispatch]);

  useEffect(() => {
    setIsLoadedrack(false);
  }, [currentTrack]);

  if (!currentTrack) return <></>;

  const playTrack = () => {
    if (audioRef.current && currentTrack?.track_file) {
      audioRef.current
        .play()
        .then(() => {
          dispatch(setIsPlay(true));
        })
        .catch(() => {
          dispatch(setIsPlay(false));
        });
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const togglePlayPause = () => {
    if (isPlay) {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedrack(true);
      audioRef.current.volume = volume / 100;
    }
  };

  const onChangeProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
      setCurrentTime(inputTime);
    }
  };

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setDisplayVolume(newVolume);
    setVolumeVisible(true);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    setTimeout(() => {
      setVolumeVisible(false);
    }, 5000);
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
    setIsShuffle(!isShuffle);
  };

  const onToggleLoop = () => {
    dispatch(toggleLoop());
    setIsLoop(!isLoop);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.bar__content}>
        <audio
          ref={audioRef}
          src={currentTrack?.track_file}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={() => {
            if (isLoopFromStore) {
              audioRef.current?.play();
            } else {
              dispatch(setNextTrack());
            }
          }}
        />
        <div className={styles.progressBarContainer}>
          <ProgressBar
            max={audioRef.current?.duration || 0}
            step={0.1}
            readOnly={!isLoadedTrack}
            value={currentTime}
            onChange={onChangeProgress}
          />
          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span> /
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div className={styles.player__btnPrev} onClick={onPrevTrack}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/Image/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnPlay, styles.btn)}
                onClick={togglePlayPause}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={`/Image/icon/sprite.svg#icon-${
                      isPlay ? 'pause' : 'play'
                    }`}
                  ></use>
                </svg>
              </div>
              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/Image/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                className={classnames(styles.player__btnRepeat, styles.btnIcon)}
                onClick={onToggleLoop}
              >
                <svg
                  className={classnames(styles.player__btnRepeatSvg, {
                    [styles.player__btnLoopSvgActive]: isLoopFromStore,
                  })}
                >
                  <use xlinkHref="/Image/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                className={classnames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
                onClick={onToggleShuffle}
              >
                <svg
                  className={classnames(styles.player__btnShuffleSvg, {
                    [styles.player__btnShuffleSvgActive]: isShuffle,
                  })}
                >
                  <use xlinkHref="/Image/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/Image/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classnames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg
                    className={`${styles.trackPlay__likeSvg} ${isLike ? styles.liked : ''}`}
                    onClick={toggleLike}
                  >
                    <use
                      xlinkHref={`/Image/icon/sprite.svg#${
                        isLike ? 'icon-like' : 'icon-dislike'
                      }`}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/Image/icon/sprite.svg#icon-volume"></use>
                  {duration}{' '}
                </svg>
              </div>
              <div className={styles.volumeContainer}>
                <div
                  className={classnames(styles.volume__progress, styles.btn)}
                >
                  <input
                    className={classnames(
                      styles.volume__progressLine,
                      styles.btn,
                    )}
                    type="range"
                    name="range"
                    onChange={onChangeVolume}
                    value={volume}
                  />
                </div>
                <div
                  className={classnames(styles.volumeDisplay, {
                    [styles.volumeVisible]: volumeVisible,
                  })}
                >
                  <span> {displayVolume}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
