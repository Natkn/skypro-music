import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ playlist }) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleEnded = () => {
    // Проверяем, не является ли текущий трек последним в плейлисте
    if (currentTrackIndex < playlist.length - 1) {
      // Переход к следующему треку
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // Или начинаем плейлист с начала
      setCurrentTrackIndex(0);
    }
  };

  // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = playlist[currentTrackIndex].url;
    audio.addEventListener('ended', handleEnded);

    // Воспроизводим новый трек
    audio.play();

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, playlist]);

  return (
    <div>
      <audio ref={audioRef} controls />
      <div>Now playing: {playlist[currentTrackIndex].title}</div>
    </div>
  );
};
